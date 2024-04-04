import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const options = {
//     method: 'POST',
//     url: 'https://open-ai21.p.rapidapi.com/conversationgpt35',
//     headers: {
//       'content-type': 'application/json',
//       'X-RapidAPI-Key': '676e570cf3msh6de3d2a1f7176fep1fcd7cjsn9cb864a03b53',
//       'X-RapidAPI-Host': 'open-ai21.p.rapidapi.com'
//     },
//     data: {
//       messages: [
//         {
//           role: 'user',
//           content: 'hello'
//         }
//       ],
//       web_access: false,
//       system_prompt: '',
//       temperature: 0.9,
//       top_k: 5,
//       top_p: 0.9,
//       max_tokens: 256
//     }
//   };

  export const chatAPI = createApi({
        reducerPath: 'chatAPI',
        baseQuery: fetchBaseQuery({
            baseUrl: 'https://open-ai21.p.rapidapi.com/',
            prepareHeaders: (headers) => {
                headers.set('X-RapidAPI-Key', '676e570cf3msh6de3d2a1f7176fep1fcd7cjsn9cb864a03b53');
                headers.set('X-RapidAPI-Host', 'open-ai21.p.rapidapi.com');
                headers.set('content-type', 'application/json');
                return headers;
            }
        }),
        endpoints: (builder) => ({
            getChatResponse: builder.mutation({
                query: (chatData, temperature, max_tokens, top_k, top_p, web_access, system_prompt) => ({
                    url: '/conversationgpt35',
                    method: 'POST',
                    body: {...chatData, temperature,
                      max_tokens, top_k, top_p, web_access, system_prompt
                    }
                }),
            }),
            // getSummary: builder.query({
            //     query: (params) => `/summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`
            // })
        }),
    });
    
    export const { useGetChatResponseMutation } = chatAPI;