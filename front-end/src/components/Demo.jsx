import { useState, useEffect, useRef } from 'react';
import {  linkIcon  } from '../assets';
import Loader from './Loader';

import { useGetChatResponseMutation } from '../services/chatgpt';
import axios from 'axios';

const Demo = () => {
  const [loading, setLoading] = useState(false);
  
  const [chat, setArticle] = useState({
    message: '',
    summary: '',
  });

  const [chatHistory, setChatHistory] = useState([]);


  const [conversationHistory, setConversationHistory] = useState([]);
  const [file, setFile] = useState()

  const [getchatResponse, {isLoading}] = useGetChatResponseMutation();

  useEffect(() => { 
    const articlesFromLocalStorage = JSON.parse(localStorage.getItem('articles'))
    const conversationFromLocalStorage = JSON.parse(localStorage.getItem('history'))

    if(articlesFromLocalStorage){
      setChatHistory(articlesFromLocalStorage)
    }

    if(conversationFromLocalStorage){
      setConversationHistory(conversationFromLocalStorage)
    }

  }, []);

  useEffect(() => {
    console.log(conversationHistory); // This will log after the state update
  }, [conversationHistory]);

 

  const handleFileChange = async(e) => {
    setFile(e.target.files[0])
  }

  const handleSubmit2 = async(e) => {
    e.preventDefault();
    console.log(file)
    const formData = new FormData();
    formData.append('pdf_file', file);

    try {
        setLoading(true);
        const response = await axios.post('/PDF', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        setLoading(false);

        let pdfContent = {role: 'user', content: response.data.text};
        let summary = {role: 'assistant', content: response.data.summary};
        
        let update = [...conversationHistory, pdfContent, summary];

        setConversationHistory(update)

        const newArticle1 = { message: "PDF submitted", summary: response.data.summary};
        const updatedAllArticles1 = [newArticle1, ...chatHistory];

        setChatHistory(updatedAllArticles1)

        localStorage.setItem('articles', JSON.stringify(updatedAllArticles1));
        localStorage.setItem('history', JSON.stringify(conversationHistory));

        console.log(response.data); // Server response
    } catch (error) {
        console.error('Error uploading file:', error);
    }
    
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
  
    let newMessage = {role: 'user', content: chat.message};
    let updatedConversationHistory = [...conversationHistory, newMessage];
   
    setConversationHistory(updatedConversationHistory);
  
    const { data } = await getchatResponse({ 
      messages: updatedConversationHistory,
      temperature: 0.9,
      max_tokens: 128,
      top_k: 5,
      top_p: 0.9,
      web_access: true,
      system_prompt: "",
    });

    // The data of .summary is resulted from the JSON that is returned from getSummary.
    // I want to use this to get the data from an API and use it in my backend.
    if(data?.result) {
      // console.log(data.result)
      newMessage = {role: 'assistant', content: data.result};
      updatedConversationHistory = [...updatedConversationHistory, newMessage];
    
      setConversationHistory(updatedConversationHistory);
     
      

      // console.log(conversationHistory)
      const newArticle = { message: chat.message, summary: data.result};
      const updatedAllArticles = [newArticle, ...chatHistory];
     
      

      setArticle(newArticle);
      setChatHistory(updatedAllArticles);

      

      localStorage.setItem('articles', JSON.stringify(updatedAllArticles));
      localStorage.setItem('history', JSON.stringify(conversationHistory));
      // console.log(updatedAllArticles);

    }
   
  };

  const handleReset = () => {
    setChatHistory([]); // Clear the state
    localStorage.removeItem('articles'); // Clear local storage
  };


  return (
    
    <section className="demo overflow-y-auto">

        {/* side menu */}
        
        {/* Search */}
      
          <form className="relative flex justify-center items-center" onSubmit={handleSubmit}>
            <img src={linkIcon} alt ="link_icon" className="absolute left-0 my-2 ml-3 w-5"/>
            <input 
              type="text" 
              placeholder="Enter a URL" 
              value={chat.message} 
              onChange={(e) => setArticle({chat, message: e.target.value })}
              required
              className="url_input peer"
            />
            <input 
              type="file"
              accept=".pdf"
              id="file"
              name="file"
              onChange={handleFileChange}
            />
            <button
              type="submit"
              className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700">
                Enter
            </button>
          </form>

          <div className='flex justify-center gap-5 my-5'>
            <button onClick={handleSubmit2} class="button-34">Submit PDF</button>
            
            <button onClick={handleReset} class="button-34">New Chat</button>
          </div>


        {isLoading || loading ? (
          <div className="flex justify-center items-center mb-10 mt-4">
            <Loader />
          </div>
        ) : null}
        {/* Display Results */}
      
        {chatHistory.map((message, index) => (
          <MessageDisplay
            key={index}
            chat={message}
        
          />
        ))}
    </section>
  )
}

//create a component that takes in a message

const MessageDisplay = ({ chat }) => {
  
  return (
    <div className="my-2 max-w-full flex flex-col">
      <div className="link_card gap-1m max-h-60 overflow-y-auto mb-2">{chat.message}</div>
      {chat.summary ? ( // Check if summary exists
        <div className="flex flex-col gap-3">
          <div className="summary_box">
            <p className="font-inter font-medium text-sm text-gray-700">
              {chat.summary}
            </p>
          </div>
        </div>
      ) : null} {/* Or render an appropriate message if no summary */}
    </div>
  );
};


export default Demo