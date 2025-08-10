import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const rapidApiKey = process.env.NEXT_PUBLIC_RAPIDAPI_KEY;

const cryptoNewsHeaders = {
  'X-RapidAPI-Key': rapidApiKey,
  'X-RapidAPI-Host': 'crypto-news16.p.rapidapi.com', // Poprawny Host z Twojego zrzutu ekranu
};

const baseUrl = 'https://crypto-news16.p.rapidapi.com'; // Poprawny bazowy URL

const createRequest = (url: string) => ({ url, headers: cryptoNewsHeaders });

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      // Endpoint dla tego konkretnego API to po prostu /news
      query: () => createRequest(`/news`),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
