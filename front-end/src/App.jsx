import Hero from './components/Hero';
import Demo from './components/Demo';

import { useMenuState } from './components/SideMenu';
import {useState, useEffect } from "react";
import axios from 'axios';
import './App.css';
import SideMenu from './components/SideMenu';

const App = () => {

  
  const [isOpen, setIsOpen] = useState(true);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };  
  return (
    <main className="overflow-y-scroll">

        <div className="main">
            <div className="gradient"/>
            
        </div>

        <div className={`app`}>
            
            
            <Hero />
            {/* <SideMenu isOpen={isOpen} toggleMenu={toggleMenu}/> */}
           
            <div className="content-wrapper"> 
              {/* <Hero /> */}
              
              <Demo />
            </div>
        </div>
    </main>
  )
}

export default App