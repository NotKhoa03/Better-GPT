import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const rapidApiKey = import.meta.env.VITE_RAPID_API_ARTICLE_KEY;

const options = {
    method: 'POST',
    url: 'https://open-ai21.p.rapidapi.com/conversationgpt35',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': '676e570cf3msh6de3d2a1f7176fep1fcd7cjsn9cb864a03b53',
      'X-RapidAPI-Host': 'open-ai21.p.rapidapi.com'
    },
    data: {
      messages: [
        {
          role: 'user',
          content: 'hello'
        }
      ],
      web_access: false,
      system_prompt: '',
      temperature: 0.9,
      top_k: 5,
      top_p: 0.9,
      max_tokens: 256
    }
  };

  export const articleApi = createApi({
    reducerPath: 'articleApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://article-extractor-and-summarizer.p.rapidapi.com/',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', '676e570cf3msh6de3d2a1f7176fep1fcd7cjsn9cb864a03b53');
            headers.set('X-RapidAPI-Host', 'article-extractor-and-summarizer.p.rapidapi.com');

            return headers;
        }
    }),
    endpoints: (builder) => ({
        getSummary: builder.query({
            query: (params) => `/summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`
        })
    })
});

// export const articleApi = createApi({
//     reducerPath: 'articleApi',
//     baseQuery: fetchBaseQuery({
//         baseUrl: 'https://open-ai21.p.rapidapi.com/',
//         prepareHeaders: (headers) => {
//             headers.set('X-RapidAPI-Key', '676e570cf3msh6de3d2a1f7176fep1fcd7cjsn9cb864a03b53');
//             headers.set('X-RapidAPI-Host', 'open-ai21.p.rapidapi.com');
//             headers.set('Content-Type', 'application/json');
//             return headers;
//         }
//     }),
//     endpoints: (builder) => ({
//         getChatResponse: builder.mutation({
//             query: (chatData) => ({
//                 url: '/conversationgpt35',
//                 method: 'POST',
//                 body: chatData
//             }),
//         }),
//         // getSummary: builder.query({
//         //     query: (params) => `/summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`
//         // })
//     }),
// });

// export const { useGetChatResponseMutation } = openAIChatApi;
export const { useLazyGetSummaryQuery } = articleApi;