import { ApiError } from 'next/dist/server/api-utils';

import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, Method } from 'axios';

const { FOOTBALL_API_HOST, FOOTBALL_API_KEY } = process.env;
class FootballApi {
  protected api: AxiosInstance;

  protected xHeaders = {
    'x-rapidapi-host': FOOTBALL_API_HOST || '',
    'x-rapidapi-key': FOOTBALL_API_KEY || '',
  };

  constructor() {
    this.api = axios.create({
      method: 'GET',
      headers: this.xHeaders,
      baseURL: FootballApi.apiHostUrl,
    });
  }

  static get apiHostUrl() {
    const hostUrl = FOOTBALL_API_HOST;
    if (!hostUrl) {
      throw new Error(`FOOTBALL_API_HOST environment is not defined`);
    }

    return `https://${hostUrl}`;
  }

  async get(path: string, params?: URLSearchParams): Promise<any> {
    params && this.validateParams(params);
    return this.call(this.getRequestData('GET', path, params));
  }

  protected validateParams(params: URLSearchParams) {
    for (let [key, value] of params) {
      if (!key || !value) {
        this.onError(400, 'Empty URL parameter');
      }
    }
  }

  protected getRequestData(method: Method, path: string, params?: URLSearchParams): AxiosRequestConfig {
    return {
      method,
      url: this.getBackendUrl(path),
      params,
    };
  }

  protected getBackendUrl(path: string): string {
    if (path.startsWith('/')) {
      path = path.slice(1);
    }

    if (path.endsWith('/')) {
      path = path.slice(0, -1);
    }

    return `/${path}`;
  }

  protected async call(req: AxiosRequestConfig): Promise<any> {
    let resp;
    try {
      console.log('-------------- call request -----------');
      console.log('req', req);
      resp = await this.api(req);
    } catch (err) {
      const e = err as AxiosError;
      const data = e.response?.data as { statusCode?: number; message?: string } | undefined;

      if (data && data.statusCode && data.message) {
        this.onError(data.statusCode, data.message);
      } else {
        this.onError(e.response?.status || 500, e?.code || 'API_ERROR');
      }
      return;
    }

    if (resp.status >= 400) {
      this.onError(resp.status, resp.data.message);
    }

    const { data } = resp;

    // @ts-ignore
    if (Object.keys(data.errors).length) {
      if (data.errors.token) {
        this.onError(400, 'API_WRONG_TOKEN');
      }

      // @ts-ignore
      const errMsg = Object.entries(data.errors).reduce((acc, [key, value]) => `${acc}${key}:${value};`, '');
      this.onError(400, errMsg);
    }

    return data;
  }

  protected onError(code: number, message: string) {
    console.error('Api error happened:', message);
    throw new ApiError(code, message);
  }
}

export const FootballApiService = new FootballApi();
