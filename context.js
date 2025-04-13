"use client"

import { createContext, useState, useEffect } from "react";

export const MyContext = createContext();

export const MyProvider = ({ children }) => {

    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
        
        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const getCookie = (name) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            // pop removes last elt, shift removes first elt
            if (parts.length === 2) return parts.pop().split(';').shift();
        };

        const sessionCookie = getCookie('session_active');
        if (sessionCookie) {
            console.log('Session cookie exists:', sessionCookie);
            setIsLoggedIn(true)
        } else {
            console.log('Session cookie does not exist');
            setIsLoggedIn(false)
        }
    }, []);

    return (
        <MyContext.Provider value={{ windowSize, setWindowSize, isLoggedIn, setIsLoggedIn }}>
            {children}
        </MyContext.Provider>
    );
};
