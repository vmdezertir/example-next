export interface BaseFootballApiResponse {
  get: string;
  parameters: object;
  errors: {
    requests: string;
  };
  results: number;
  paging: {
    current: number;
    total: number;
  };
}

export interface CommonIdName {
  id: number | null;
  name: string | null;
}
