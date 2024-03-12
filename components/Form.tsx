"use client";
import { useState } from "react";
import { useUser } from "@/context/userContext";

const Form = () => {
    const { setName, setAge, regard, setRegard } = useUser();

    const [username, setUsername] = useState<string>('')
    const [userAge, setUserAge] = useState<number>(0)
    const [userRegard, setUserRegard] = useState<string>('')
    // Set data on submit
    const handleSubmit = (e: any) => {
        e.preventDefault()
        setName(username)
        setAge(userAge)
        if (userRegard != "") {
            setRegard(userRegard)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-2 text-gray-400">
                <label>Enter name <span style={{ color: 'red' }}>*</span></label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                <label>Enter age <span style={{ color: 'red' }}>*</span></label>
                <input type="number" value={userAge} onChange={(e) => setUserAge(parseInt(e.target.value))} />
                <label>Enter birthday regard</label>
                <input type="text" value={userRegard} onChange={(e) => setUserRegard(e.target.value)} />
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default Form;