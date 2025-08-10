const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const { query } = event.queryStringParameters;
  const rapidApiKey = process.env.RAPIDAPI_KEY; // Pobierz klucz z Netlify!
  const baseUrl = 'https://crypto-news16.p.rapidapi.com';

  if (!rapidApiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'API key is missing' }),
    };
  }

  try {
    const response = await fetch(`${baseUrl}/news/`, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': rapidApiKey,
        'x-rapidapi-host': 'crypto-news16.p.rapidapi.com',
      },
    });

    if (!response.ok) {
      throw new Error(`RapidAPI responded with status: ${response.status}`);
    }

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error('Error fetching news:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to fetch news from API.' }),
    };
  }
};
