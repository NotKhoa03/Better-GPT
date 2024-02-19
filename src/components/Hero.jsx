import React from 'react'
import { logo } from '../assets';
const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
        <nav className="flex justify-between items-center w-full mb-10 pt-3">
            <img src={logo} alt="sumz_logo" className="w-28 object-contain"/>
            <button 
                type="button"
                onClick={() => window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley')}
                className="black_btn"
            > 
                GitHub
            </button>
        </nav>

        <h1 className="head_text">
            Summarize Articles with <br className="max-md:hidden" />
            <span className="orange_gradient">OpenAI GPT-3</span>
        </h1>
        <h2 className="desc">
            Be able to use ChatGPT on Youtube videos, websites, and pdf articles to further stimulate your experience with AI
        </h2>

       
    </header>
  )
}

export default Hero