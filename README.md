## Description

Sports site with online matches and statistics of more than [1000 Leagues & Cups](https://www.api-football.com/coverage).

## Preparation

- Get a FootBall API key from [rapidapi](https://rapidapi.com/api-sports/api/api-football/pricing) or from the football api [dashboard](https://dashboard.api-football.com/register)

The accounts on RapidAPI and on Dashboard are dissociated. Each of these registration methods has its own URL and API-KEY.

- RAPIDAPI : https://api-football-v1.p.rapidapi.com/v3/
- API-SPORTS : https://v3.football.api-sports.io/

!!This repo uses the Dashboard method. More details can be found [here](https://www.api-football.com/documentation-v3#section/Authentication).

## Installation

Copy `.env.local.example` and rename it to `.env.local` in the root folder. Also, fill in all variables.

Please note that the free plan has a limit of 100 requests per day. You can [increase the limits](https://www.api-football.com/pricing) or switch to mock data (for this you need to change the flag in the configuration file to `USE_FAKE_DATA=true`)

## Running the app

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
