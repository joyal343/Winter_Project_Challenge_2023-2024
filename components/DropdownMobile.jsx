"use client"

import { useState, useEffect } from "react";
import styles from "./DropdownMobile.module.css";
import Image from 'next/image'; 

const DropdownMobile = ({ filterOptions, handleSearch }) => {
  const [text, setText] = useState('');

  const [searchObj, setSearchObj] = useState({
    pDate: new Array(5).fill(false),
    type: new Array(6).fill(false),
    dept: new Array(5).fill(false),
  });

  const handleChange = (e) => setText(e.target.value)

  const handleSelection = (label, index) => {
    setSearchObj((prevSearchObj) => {
      const newSearchObj = { ...prevSearchObj };
      console.log("Start ",newSearchObj)  
      if (label === "Date") {
        for (let i = 0; i < newSearchObj.pDate.length; i++) {
          newSearchObj.pDate[i] = false;
        }
        newSearchObj.pDate[index] = true;
      } else if (label === "Category"){
        console.log("Category ",newSearchObj.type[index])
        newSearchObj.type[index] = !(newSearchObj.type[index]);
        console.log("Category ",newSearchObj.type[index])
      } else if (label === "Department") {
        newSearchObj.dept[index] = !(newSearchObj.dept[index]);
      }
      console.log("New Object ",newSearchObj)
      
      return newSearchObj;
      });
  }

  const convertNameToKey = (name) => {
    if (name === "Date") return "pDate";
    if (name === "Category") return "type";
    if (name === "Department") return "dept";
  }

  useEffect(() => {

    const handleDropdownClick = (event) => {
      const rect = event.target.getBoundingClientRect();
      const dropdownContent = event.target.nextElementSibling;
      dropdownContent.style.display =
        dropdownContent.style.display === "block" ? "none" : "block";
      dropdownContent.style.left = `${rect.x}px`;
      dropdownContent.style.top = `${rect.y + 30}px`;
      dropdownContent.style.width = `${rect.width}px`;

      // Close other dropdowns
      document.querySelectorAll(`.${styles.dropdownContent}`).forEach(content => {
        if (content !== dropdownContent) content.style.display = "none";
      });

      event.stopPropagation();
    };

    const closeDropdowns = (event) => {
      document.querySelectorAll(`.${styles.dropdownContent}`).forEach(content => {
        content.style.display = "none";
      });
    };

    document.addEventListener("click", closeDropdowns);
    document.querySelectorAll(`.${styles.dropbtn}`).forEach(button => 
      button.addEventListener("click", handleDropdownClick)
    )
    document.querySelectorAll(`.${styles.scrollContainer}`).forEach( container => 
      container.addEventListener("scroll", closeDropdowns)
    )

    return () => {
      document.removeEventListener("click", closeDropdowns)
      document.querySelectorAll(`.${styles.dropbtn}`).forEach( button => 
        button.removeEventListener("click", handleDropdownClick)
      )
      document.querySelectorAll(`.${styles.scrollContainer}`).forEach( container => 
        container.removeEventListener("scroll", closeDropdowns)
      )
    };
  }, []);

  return (
    <div className="w-[100%]">
      <div className={"bg-white border border-[var(--search-border)] rounded-[5px] flex p-2 w-[100%] opacity-90"}>
        <div className="inline min-w-[30px] margin-auto">
          <button
            onClick={() => { handleSearch(text, searchObj.pDate, searchObj.type, searchObj.dept) }}
            className="w-[20px] h-[20px]"
          >
            <Image
              src="\assets\icons\search.svg"
              alt="search button"
              className="filter_grey"
              width={16}
              height={16}
            />
          </button>
        </div>
        <div className="grow">
          <input
            type="text"
            placeholder="Search"
            value={text}
            onChange={handleChange}
            className="w-[100%]"
          />
        </div>
      </div>
      <div className={styles.container}>
        <div 
          className={styles.scrollContainer}
        >
          {Object.keys(filterOptions).map((label, index) => (
            <div key={index} className={styles.dropdown}>
              <button
                className={styles.dropbtn+" "+"border border-sky-700 rounded-lg"}
                onClick={() => toggleDropdown(index)}
                data-index={index}
              >
                {label}
              </button>
              <div
                className={styles.dropdownContent}
                data-index={index}
              >
                {filterOptions[label].map((option, idx) => (
                  <a
                    key={idx}
                    href="#"
                    onClick={() => { handleSelection(label, idx); }}
                    className={searchObj[convertNameToKey(label)][idx] ? "" : ""}
                  >
                    {option}
                    {searchObj[convertNameToKey(label)][idx] && (
                      <span className={""}>✔</span>
                    )}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DropdownMobile;