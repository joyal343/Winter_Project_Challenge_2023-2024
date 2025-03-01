"use client"

import { createContext, useState, useEffect } from "react";

export const MyContext = createContext();

export const MyProvider = ({ children }) => {

    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        
        // Is width permanetly attached to window object?   
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        // Add event listener
        window.addEventListener("resize", handleResize);

        handleResize();

        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    console.log("width px?:", windowSize.width);
    return (
        <MyContext.Provider value={{ windowSize, setWindowSize }}>
            {children}
        </MyContext.Provider>
    );
};
