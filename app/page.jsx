"use client"

import "@styles/mobileHorizontal.css"
import React, { useState, useRef, useEffect } from "react";
import styled from 'styled-components';
import { ChevronDown } from "lucide-react";
import { set } from "mongoose";

const tabs = [
  { name: "Home", dropdown: ["Overview", "Updates", "Stats"] },
  { name: "Services", dropdown: ["Web Development", "SEO", "Marketing"] },
  { name: "Pricing", dropdown: ["Plans", "Discounts", "Offers"] },
  { name: "About", dropdown: ["Our Team", "Mission", "Careers"] },
  { name: "Contact", dropdown: ["Support", "Feedback", "Locations"] },
  { name: "Blog", dropdown: ["Latest Posts", "Categories", "Archives"] },
  { name: "Portfolio", dropdown: ["Designs", "Projects", "Testimonials"] },
];




function ScrollableTabBar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const tabRef = useRef(null);

  const toggleDropdown = (index) => setOpenDropdown(openDropdown === index ? null : index)

  return (
    <div className="relative w-full ">
      {/* Scrollable Tabs */}
      <div
        ref={tabRef}
        className="flex space-x-4 overflow-x-auto px-4 py-2  text-white"
      >
        {tabs.map((tab, index) => (
          <div key={index} className="relative">
            <button
              className="bg-gray-900 flex items-center px-4 py-2 rounded-lg hover:bg-gray-700 transition"
              onClick={() => toggleDropdown(index)}
            >
              {tab.name}
              <ChevronDown className="ml-2 w-4 h-4" />
            </button>
            {/* Dropdown Menu */}
            {openDropdown === index && (
              <div className="relative block">

                <div className="absolute left-0 top-5 mt-2 w-40 bg-white shadow-lg rounded-lg">
                  {tab.dropdown.map((item, i) => (
                    <a key={i}
                      href="#"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    >
                      {item}
                    </a>))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ScrollableTabBarV2() {
  return (
    <div className="containerV2">
      <div className="dropdownV2">
        <button className="btn rounded-md">button 1(dropdown)</button>
        <ul>
          <li>option 1</li>
          <li>option 2</li>
          <li>option 3</li>
        </ul>
      </div>
      <div className="dropdownV2">
        <button className="btn rounded-md">button 2(dropdown)</button>
        <ul>
          <li>option 1</li>
          <li>option 2</li>
          <li>option 3</li>
        </ul>
      </div>
      <div className="dropdownV2">
        <button className="btn rounded-md">button 3(dropdown)</button>
        <ul>
          <li>option 1</li>
          <li>option 2</li>
          <li>option 3</li>
        </ul>
      </div>
      <div className="dropdownV2">
        <button className="btn rounded-md">button 3(dropdown)</button>
        <ul>
          <li>option 1</li>
          <li>option 2</li>
          <li>option 3</li>
        </ul>
      </div>
      <div className="dropdownV2">
        <button className="btn rounded-md">button 3(dropdown)</button>
        <ul>
          <li>option 1</li>
          <li>option 2</li>
          <li>option 3</li>
        </ul>
      </div>

    </div>
  )
}

function ScrollableTabBarV3() {
  const headings = [
    {
      name: "date",
      data: []
    },
    {
      name: "type",
      data: []
    },
    {
      name: "department",
      data: []
    }
  ]
  useEffect(() => {
    // Select all menu items that have a submenu
    console.log("Triggered")
    // Got the basic Idea need to convert to react cause it may be easier
    document.querySelectorAll("li.parent").forEach(function (menuItem) {
      menuItem.addEventListener("mouseover", function () {
        var submenuWrapper = menuItem.querySelector(".wrapper");
        console.log("Mouse Over")
        if (submenuWrapper) {
          // Get the position of the menu item relative to its parent
          var menuItemRect = menuItem.getBoundingClientRect();

          console.log(menuItem, menuItem.offsetTop, menuItemRect.x, menuItemRect)
          submenuWrapper.style.top = (menuItem.offsetTop + menuItemRect.height) + "px";
          submenuWrapper.style.left = menuItem.offsetLeft + "px";
          // Math.round(menuItemRect.offsetWidth * 0.75) +
        }
      });
    });
  }, []);

  return (
    <div className="wrapper">
      <ul className="menu flex">
        {headings.map((item, index) => {
          return (
            <li key={index} className="parent">{item.name}
              <div className="wrapper">
                <ul >
                  <li>Abc</li>
                  <li>Def</li>
                  <li>Ghi</li>
                  <li>Jkl</li>
                  <li>Pqr</li>
                  <li>Stu</li>
                  <li>Vw</li>
                  <li>Xyz</li>
                </ul>
              </div>
            </li>
          )
        })}
        <li>Hello</li>
      </ul>
    </div>
  )
}

//  V4 Scrollable Tab Bar

// Scroll into view works - can we give a callabck
const MenuItem = ({ label, state, index, handleClick, children }) => {
  const menuItemRef = useRef(null);
  const submenuRef = useRef(null);

  useEffect(()=>{
    const applyChange = async () => {

      const menuItem = menuItemRef.current;
      const submenu = submenuRef.current;
      
      if (state === index){
        var rect = menuItem.getBoundingClientRect();
        console.log(rect)
        await menuItem.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
        rect = menuItem.getBoundingClientRect();
        console.log(rect)
        // submenu.style.position = "absolute";
        // submenu.style.top = `${rect.top + rect.height}px`;
        
        // submenu.style.left = `${rect.left}px`;
        // submenu.style.left = `${0}px`;
        submenu.style.top = `${menuItem.offsetTop + rect.height}px`;
        submenu.style.left = `${menuItem.offsetLeft}px`;
        submenu.style.display = "block";
      } else {
        submenu.style.display = "none";
      }
    } 
    applyChange()
  },[state])
  return (
    <li 
      className="parent relative" 
      onClick={handleClick}
      ref={menuItemRef}
    >
      {label}
      {children && (
        <ul 
          className="wrapper bg-white shadow-lg p-2 rounded-md hidden" 
          ref={submenuRef}
        >
          {children}
        </ul>
      )}
    </li>
  );
};

const Menu = () => {
  const scrollContainerRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const handleItemClick = (index) => {
    console.log("Handle Click Triggered")
    
    setDropdownOpen( prevState =>{
      const newState = (prevState === index ? null : index);
      return newState
    })
    
  };
  
  const items = [
    { name: "date", data: ["hello", "a", "b"] },
    { name: "type", data: ["hello", "a", "b"] },
    { name: "department", data: ["hello", "a", "b"] },
    { name: "department", data: ["hello", "a", "b"] },
    { name: "department", data: ["hello", "a", "c"] },
    { name: "department", data: ["hello", "a", "b"] },
    { name: "department", data: ["hello", "a", "b"] },
    { name: "department", data: ["hello", "a", "b"] },
  ]
  return (
    <ul
      className="menu overflow-x-auto overflow-y-hidden flex bg-gray-200 p-4 w-full justify-around"
      ref={scrollContainerRef}
      onClick={()=> {
        if (dropdownOpen !== null) setDropdownOpen(null)}}
    >
      {items.map((item, index) => (
        <MenuItem
          key={index}
          label={item.name}
          index = {index}
          state = {dropdownOpen}
          handleClick={() => handleItemClick(index)}
        >
          {item.data.map((dropdownItem, di) => (
            <p key={di}>{dropdownItem}</p>
          ))}

        </MenuItem>
      ))}

    </ul>
  );
};

// V5 Mobile Scrollbar


const HorizontalScrollContainer = styled.div`
  overflow-x: auto;
  -webkit-overflow-scrolling: touch; /* For smooth scrolling on iOS */
  scroll-behavior: smooth; /* For smooth scrolling with buttons */
  padding: 10px; /* Add some padding around the bar */
  white-space: nowrap; /* Prevent items from wrapping */
`;

const BarItem = styled.div`
  display: inline-block; /* Make items sit side by side */
  margin-right: 10px;  /* Space between items */
  padding: 8px 12px;
  border: 1px solid #ccc; /* Example styling */
  border-radius: 5px;
  cursor: pointer; /* Indicate it's clickable */
  position: relative; /* For positioning the dropdown */
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%; /* Position below the bar item */
  left: 0;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
  z-index: 1; /* Ensure it's on top */
  min-width: 100px; /* Adjust as needed */
  box-shadow: 2px 2px 5px rgba(0,0,0,0.2); /* Add a subtle shadow */

  /* Optional: Add some animation for the dropdown */
  transition: opacity 0.2s ease, transform 0.2s ease;
  opacity: 0;
  transform: translateY(-5px); /* Start slightly above */
  pointer-events: none; /* Prevent interaction while hidden */

  &.show {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto; /* Allow interaction when shown */
  }
`;


const HorizontalBar = ({ items }) => {
  const scrollContainerRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(null); // Store index of open dropdown

  const handleItemClick = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index); // Toggle dropdown
  };

  const scrollLeft = () => {
    scrollContainerRef.current.scrollLeft -= 100; // Adjust scroll amount
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollLeft += 100; // Adjust scroll amount
  };

  // Optional: Scroll to the selected item on mount (if needed)
  useEffect(() => {
    if (dropdownOpen !== null && scrollContainerRef.current) {
      const selectedItem = scrollContainerRef.current.children[dropdownOpen];
      // console.log(selectedItem)
      if (selectedItem) {
        selectedItem.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [dropdownOpen]);


  return (
    <div>
      <button onClick={scrollLeft}>Left</button>
      <HorizontalScrollContainer ref={scrollContainerRef}>
        {items.map((item, index) => (
          <BarItem key={index} onClick={() => handleItemClick(index)}>
            {item.label}
            {dropdownOpen === index && (
              <Dropdown className={dropdownOpen === index ? 'show' : ''}>
                {/* Dropdown content for this item */}
                {item.dropdownItems.map((dropdownItem, di) => (
                  <div key={di}>{dropdownItem}</div>
                ))}
              </Dropdown>
            )}
          </BarItem>
        ))}
      </HorizontalScrollContainer>
      <button onClick={scrollRight}>Right</button>
    </div>
  );
};



// V5 Scrollbar End 
const page = () => {
  const barItems = [
    { label: 'Item 1', dropdownItems: ['Action 1', 'Action 2'] },
    { label: 'Item 2', dropdownItems: ['Option A', 'Option B', 'Option C'] },
    { label: 'Item 3', dropdownItems: ['Do Something'] },
    // ... more items
    { label: 'Item 4', dropdownItems: ['One', 'Two'] },
    { label: 'Item 5', dropdownItems: ['Alpha', 'Beta', 'Gamma'] },
    { label: 'Item 6', dropdownItems: ['First', 'Second'] },
    { label: 'Item 7', dropdownItems: ['A', 'B', 'C'] },
    { label: 'Item 8', dropdownItems: ['X', 'Y', 'Z'] },
  ];
  return <div className="h-full w-full">
    {/* Scroll bar disappears on mobile */}
    {/* <ScrollableTabBar></ScrollableTabBar> */}
    {/* <ScrollableTabBarV2 /> */}
    {/* <ScrollableTabBarV3 /> */}
    {/* V4 works without the other one */}
    <Menu />
    {/* <div><HorizontalBar items={barItems} /></div> */}
  </div>
}

export default page