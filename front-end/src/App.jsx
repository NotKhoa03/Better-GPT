import Hero from './components/Hero';
import Demo from './components/Demo';

import {useState, useEffect } from "react";
import axios from 'axios';
import './App.css';
import SideMenu from './components/SideMenu';

const App = () => {
  




  return (
    <main className="overflow-y-scroll">

        <div className="main">
            <div className="gradient"/>
            
        </div>

        <div className="app">
            <Hero />
            <SideMenu />
            <div className="content-wrapper"> 
              
              <Demo />
            </div>
        </div>
    </main>
  )
}

export default App