"use client";

import { useState, createContext, useEffect, useContext } from 'react';

interface UserContext {
    name: string;
    regard: string;
    age: number;
    setName: (name: string) => void;
    setAge: (age: number) => void;
    setRegard: (regard: string) => void;
}

const UserContext = createContext<UserContext>({
    name: "",
    regard: "",
    age: 0,
    setName: () => {},
    setAge: () => {},
    setRegard: () => {}
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

    const contextValue = {
        name,
        setName,
        age,
        setAge,
        regard,
        setRegard
    };
    
    return <UserContext.Provider value={contextValue} {...props} />;        
};

export const useUser = () => useContext(UserContext);
export default UserProvider;

