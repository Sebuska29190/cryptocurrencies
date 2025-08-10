import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsHeaders = {
  'X-RapidAPI-Host': 'crypto-news16.p.rapidapi.com',
};

const baseUrl = '/.netlify/functions/news-proxy';

const createRequest = (url: string) => ({ url, headers: cryptoNewsHeaders });

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: () => createRequest(''),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
