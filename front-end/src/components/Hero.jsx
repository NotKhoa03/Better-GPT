import React from 'react'
import { logo } from '../assets';
const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
        <nav className="flex justify-between items-center w-full pt-3">
            <img src={logo} alt="sumz_logo" className="w-28 object-contain"/>
            <button 
                type="button"
                onClick={() => window.open('https://github.com/NotKhoa03/Better-GPT')}
                className="black_btn"
            > 
                GitHub
            </button>
        </nav>

        <h1 className="head_text">
            Summarize Documents and Videos with
            <span className="blue_gradient"> OpenAI GPT-3</span>
        </h1>
        <h2 className="desc">
            Be able to use ChatGPT on Youtube videos, websites, and pdf articles to further stimulate your experience with AI
        </h2>

       
    </header>
  )
}

export default Hero