"use client";
import { useState } from "react";
import { useUser } from "@/context/userContext";

const Form = () => {
  const {setName, setAge, regard, setRegard} = useUser();
  const [username, setUsername] = useState<string>("");
  const [userAge, setUserAge] = useState<number>(0);
  const [userRegard, setUserRegard] = useState<string>("");
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  // Age validation
  const handleUserAgeChange = (newAge: number) => {
    if (newAge < 0) {
      return 0;
    } else if (newAge > 150) {
      return 150;
    } else {
      return newAge;
    }
  };

  // Adjust age when the increase/decrease button is clicked and held
  const decreaseAge = () => {
    setUserAge((prevAge) => handleUserAgeChange(prevAge - 1));
  };

  const increaseAge = () => {
    setUserAge((prevAge) => handleUserAgeChange(prevAge + 1));
  };

  // We trigger setInterval to trigger decreaseAge/decreaseAge multiple times when the button is clicked and held
  const handleMouseDown = (increment: boolean) => {
    const id = setInterval(() => {
      if (increment) {
        increaseAge();
      } else {
        decreaseAge();
      }
    }, 120); // Adjust the interval (the lower the faster) (milliseconds)

    setIntervalId(id);
  };

  const handleMouseUp = () => {
    if (intervalId !== null) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  // Set data on submit
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setName(username);
    setAge(userAge);
    if (userRegard !== "") {
      setRegard(userRegard);
    }
  };

  return (
    <div className="flex justify-center pt-8">
      <div className="w-full max-w-xs"> {/* Goes with the form */}
        <form
          onSubmit={handleSubmit}
          className="text-neutral-300 pl-5 pr-5 pt-8 pb-8 mb-4 rounded-lg shadow-full bg-neutral-700"
        >
          <h2 className="text-lg font-bold mb-2 text-center">Enter the details of the birthday person</h2>
          
          {/* Name session */}
          <div className="mb-2">
            <label className="block text-md font-bold mb-2">
              Enter name
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              maxLength={20}
              className="shadow appearance-none rounded w-full py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          {/* Age session */}
          <div className="mb-2">
            <label className="block text-md font-bold mb-2">
              Enter age
            </label>
            <div className="relative flex items-center ">
              <button
                type="button"
                id="decrease-button"
                onMouseDown={() => handleMouseDown(false)}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
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
                onChange={(e) => setUserAge(handleUserAgeChange(parseInt(e.target.value)))}
                className="shadow appearance-none w-full py-2 text-gray-700 text-center leading-tight focus:outline-none focus:shadow-outline"
              />
              <button
                type="button"
                id="increase-button"
                onMouseDown={() => handleMouseDown(true)}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
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

          {/* Regards session */}
          <div className="mb-2">
            <label className="block text-md font-bold mb-2">
              Enter birthday regard
            </label>
            <textarea
              value={userRegard}
              onChange={(e) => setUserRegard(e.target.value)}
              maxLength={100}
              placeholder="Max 100 characters"
              rows={3}
              className="shadow appearance-none rounded w-full py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex justify-center mt-5"> {/* Centering the submit button */}
            <button type="submit" className="bg-neutral-800 hover:bg-orange-800 text-white font-bold py-2 px-10 rounded-full">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
