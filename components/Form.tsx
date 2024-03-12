"use client";
import { useState } from "react";
import { useUser } from "@/context/userContext";

const Form = () => {
    const [username, setUsername] = useState('')
    const [userAge, setUserAge] = useState(0)

    const { setName, setAge } = useUser();
    // Set data on submit
    const handleSubmit = (e: any) => {
        e.preventDefault()
        setName(username)
        setAge(userAge)
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-2">
                <label>Enter name:</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                <label>Enter age:</label>
                <input type="number" value={userAge} onChange={(e) => setUserAge(parseInt(e.target.value))} />
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default Form;