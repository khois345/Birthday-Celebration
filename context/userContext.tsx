"use client";

import { useState, createContext, useEffect, useContext } from 'react';

interface UserContext {
    name: string;
    regard: string;
    age: number;
    setName: (name: string) => void;
    setAge: (age: number) => void;
    setRegard: (regard: string) => void;
    saveUserData: (userData: {
        name: string;
        age: number;
        regard: string;
    }) => Promise<string | null>;
    loadUserData: (sessionId: string) => Promise<void>;
}

const UserContext = createContext<UserContext>({
    name: "",
    regard: "",
    age: 0,
    setName: () => {},
    setAge: () => {},
    setRegard: () => {},
    saveUserData: async () => null,
    loadUserData: async () => {},
});

const UserProvider = (props: any) => {
    const [name, setName] = useState("");
    const [age, setAge] = useState(0);
    const [regard, setRegard] = useState<string>("Wish you a wonderful birthday!");

    useEffect(() => {
        const savedRegard = localStorage.getItem("regard");
        if (savedRegard) {
            setRegard(savedRegard);
        }
    }, []);

    const saveUserData = async (userData: { name: string; age: number; regard: string }) => {
        try {
            const response = await fetch("/api/birthday-session", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: userData.name,
                    age: userData.age,
                    regard: userData.regard,
                }),
            });

            if (!response.ok) {
                console.error("Failed to save user data:", response.statusText);
                return null;
            }

            const result = await response.json();
            return result.user.sessionId;
        } catch (error) {
            console.error("Error saving user data:", error);
            return null;
        }
    };

    const loadUserData = async (sessionId: string) => {
        try {
            const response = await fetch(`/api/birthday-session?sessionId=${sessionId}`);
            const data = await response.json();

            if (data.user) {
                setName(data.user.name);
                setAge(data.user.age);
                setRegard(data.user.regard);
                console.log("User data loaded from session:", data.user);
            } else {
                console.log("No user data found for this session");
            }
        } catch (error) {
            console.error("Error loading user data:", error);
        }
    };

    // Check URL params on mount and load data if sessionId exists
    useEffect(() => {
        const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
        const sessionIdParam = params.get("sessionId");

        if (sessionIdParam) {
            loadUserData(sessionIdParam);
        }
    }, []);

    const contextValue = {
        name,
        setName,
        age,
        setAge,
        regard,
        setRegard,
        saveUserData,
        loadUserData
    };
    
    return <UserContext.Provider value={contextValue} {...props} />;        
};

export const useUser = () => useContext(UserContext);
export default UserProvider;

