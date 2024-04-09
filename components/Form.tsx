"use client";
import { useState } from "react";
import { useUser } from "@/context/userContext";

const Form = () => {
  const { setName, setAge, regard, setRegard } = useUser();
  const [username, setUsername] = useState<string>("");
  const [userAge, setUserAge] = useState<number>(0);
  const [userRegard, setUserRegard] = useState<string>("");

  const handleUserAge = (age: number) => {
    if (age < 0) {
      setUserAge(0);
    } else {
      setUserAge(age);
    }
  };

  // Set data on submit
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setName(username);
    setAge(userAge);
    if (userRegard != "") {
      setRegard(userRegard);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-xs"> {/* Goes with the form */}
        <form
          onSubmit={handleSubmit}
          className="text-neutral-300 pl-5 pr-5 pt-8 pb-8 mb-4 rounded shadow-md bg-neutral-700"
        >
          <div className="mb-2">
            <label className="block text-md font-bold mb-2 text-center">
              Enter name
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="shadow appearance-none rounded w-full py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-2">
            <label className="block text-md font-bold mb-2 text-center">
              Enter age
            </label>
            <div className="relative flex items-center ">
              <button
                type="button"
                id="decrease-button"
                onClick={() => handleUserAge(userAge - 1)}
                className="bg-gray-600 hover:bg-gray-500 border rounded-l-lg p-3 h-9 focus:ring-gray-100"
              >
                <svg
                  className="w-3 h-3 text-gray-900 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 2"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h16"
                  />
                </svg>
              </button>
              <input
                type="number"
                value={userAge}
                onChange={(e) => handleUserAge(parseInt(e.target.value))}
                className="shadow appearance-none w-full py-2 text-gray-700 text-center leading-tight focus:outline-none focus:shadow-outline"
                nputMode="numeric"  // This will hide the arrows on the input fieldi
              />
              <button
                type="button"
                id="increase-button"
                onClick={() => handleUserAge(userAge + 1)}
                className="bg-gray-600 hover:bg-gray-500 border rounded-e-lg p-3 h-9 focus:ring-gray-100"
              >
                <svg
                  className="w-3 h-3 text-gray-900 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="mb-2">
            <label className="block text-md font-bold mb-2 text-center">
              Enter birthday regard
            </label>
            <input
              type="text"
              value={userRegard}
              onChange={(e) => setUserRegard(e.target.value)}
              className="shadow appearance-none rounded w-full py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default Form;
