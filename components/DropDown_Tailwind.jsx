"use client"

import React, { useState } from 'react';
import styles from "./DropDown_Tailwind.module.css"

const DropdownMenu_Tailwind = ({ title, options, handler }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(false);
    const [newTitle, setNewTitle] = useState("");

    const toggleMenu = () => setIsOpen(!isOpen)
    
    const handleOptionClick = (option) => {
        setSelectedOption(true);
        setIsOpen(false);
        setNewTitle(option)
        handler(option);
    };
    return (
        // <div className="absolute top-1 left-4 inline-block text-left min-w-32" 
        <div className="relative inline-block text-left min-w-32" >
            <div>
                <button type="button" 
                    className={"inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 hover:bg-gray-400 "} 
                    id="menu-button" 
                    aria-expanded="true" 
                    aria-haspopup="true"
                    onClick={toggleMenu}
                    // onMouseOver={openMenu}
                >
                    {selectedOption ? newTitle : title}
                    <svg className="-mr-1 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                        <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
            <div
                className={"absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none" + (isOpen ? `  ${styles.dropdown_open}` : ` ${styles.dropdown_close}`)}
                role="menu" 
                aria-orientation="vertical" 
                aria-labelledby="menu-button" 
                tabIndex="-1"
                // onMouseLeave={closeMenu}
            >
                <div className="py-1" role="none">
                    {options.map((option, index) => (
                        <div 
                            className="block px-4 py-2 text-sm text-gray-700"
                            key={"menu"+index}
                            onClick={() => handleOptionClick(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default DropdownMenu_Tailwind;