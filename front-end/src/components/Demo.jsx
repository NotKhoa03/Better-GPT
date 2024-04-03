import { useState, useEffect, useRef } from 'react';
import { copy, linkIcon, loader, tick } from '../assets';
import { useLazyGetSummaryQuery } from '../services/article';
import { useGetChatResponseMutation } from '../services/chatgpt';


const Demo = () => {
  const [article, setArticle] = useState({
    url: '',
    summary: '',
  });

  const [allArticles, setAllArticles] = useState([]);
  const [file, setFile] = useState()

  // const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();
  const [getchatResponse, { error, isFetching }] = useGetChatResponseMutation();

  useEffect(() => { 
    const articlesFromLocalStorage = JSON.parse(localStorage.getItem('articles'))

    if(articlesFromLocalStorage){
      setAllArticles(articlesFromLocalStorage)
    }

  }, []);
  const handleFileChange = async(e) => {
    setFile(e.target.files[0])
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(article.url);
    console.log(file)
    const { data } = await getchatResponse({ 
      messages: [{ role: 'user', content: article.url }]
    });
    

  
    // The data of .summary is resulted from the JSON that is returned from getSummary.
    // I want to use this to get the data from an API and use it in my backend.
    if(data?.result) {
      console.log(data.result)
      const newArticle = { ...article, summary: data.result};
      const updatedAllArticles = [newArticle, ...allArticles];

      setArticle(newArticle);
      setAllArticles(updatedAllArticles);

      console.log(newArticle);
      console.log(allArticles);

      localStorage.setItem('articles', JSON.stringify(updatedAllArticles));
      console.log(updatedAllArticles);

    }
   
  };

  const handleReset = () => {
    setAllArticles([]); // Clear the state
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
              value={article.url} 
              onChange={(e) => setArticle({article, url: e.target.value })}
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
          
          <button onClick={handleReset} class="reset_box w-full">Reset Results</button>

          {/* Browse URL History */}
        {/* <div className="flex flex-col gap-1m max-h-60 overflow-y-auto">
          {allArticles.map((item, index) => (
            <div key ={`link-${index}`} onClick={() => setArticle(item)} className="link_card">
                <div>
                  <img src={copy} alt="copy_icon" className="w-[100%] h =[100%] object-contain"/>
                </div>
                <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">{item.url}</p>
 
            </div>
          ))}

        </div> */}
       
       
        {/* Display Results */}
        {allArticles.map((message, index) => (
          <MessageDisplay
            key={index}
            article={message}
            isFetching={isFetching}
            loader={loader}
          />
        ))}
    </section>
  )
}

//create a component that takes in a message

const MessageDisplay = ({ article, isFetching, loader }) => {
  return (
    <div className="my-2 max-w-full flex flex-col">
      <div className="link_card gap-1m max-h-60 overflow-y-auto mb-2">{article.url}</div>
      {isFetching ? (
        <img src={loader} alt="loader" className="w-10 h-10 object-contain" />
      ) : article.summary ? ( // Check if summary exists
        <div className="flex flex-col gap-3">
          <div className="summary_box">
            <p className="font-inter font-medium text-sm text-gray-700">
              {article.summary}
            </p>
          </div>
        </div>
      ) : null} {/* Or render an appropriate message if no summary */}
    </div>
  );
};


export default Demo