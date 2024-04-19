import React, { useState } from 'react';
 // Import your CSS

const SideMenu = ({ isOpen, toggleMenu }) => {
  // const [isOpen, setIsOpen] = useState(true);

  // const toggleMenu = () => {
  //   setIsOpen(!isOpen);
  // };

  return (
    <div className={`side-menu ${isOpen ? 'open' : ''}`}>
      <div className="top_section">
        <h1 className="blue_gradient"> BetterGPT </h1>
        <button className="menu-toggle" onClick={toggleMenu}>
        </button>
      </div>
      {isOpen && ( 
            <nav className="menu-links">
            <a href="#">Home</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
            </nav> 
        )}
    </div>
  );
};

export default SideMenu;

export const useMenuState = () => {
  return [isOpen, setIsOpen];
};