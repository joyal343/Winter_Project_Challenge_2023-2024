"use client"
import React, { useState } from 'react';
import styles from "./DropDown.module.css"
const DropdownMenu = ({ title, options,handler }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(false);
  const [newTitle,setNewTitle] =useState("");
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const openMenu =()=>{
    setIsOpen(true);
  }
  const handleOptionClick = (option) => {
    setSelectedOption(true);
    setIsOpen(false);
    setNewTitle(option)
    handler(option);
  };


  return (
    <div className={styles.anchor}>
      <div className={isOpen ? styles.dropdown + " " + styles.active : styles.dropdown}>
        <button className={styles.dd_toggle} onClick={toggleMenu} onMouseOver={openMenu}>
          {selectedOption? newTitle:title}
          <div className="flex_center">
            <img src="" alt="" />
          </div>
        </button>
        {isOpen && (
          <ul className={styles.dd_Menu}>
            {options.map((option, index) => (
              <li className={styles.ddItem} key={index} onClick={() => handleOptionClick(option)}>
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DropdownMenu;