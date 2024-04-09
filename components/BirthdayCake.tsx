"use client";

import React from "react";
import "../app/birthday-cake.scss";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useMicrophone from "./useMicrophone";
import { isMobile } from "react-device-detect";
import { useUser } from "@/context/userContext";
import { randomNumberInRange, normalRandom } from "@/utils/utilFunctions";

const DEBUG = true;

interface CandlePosition {
  x: number;
  y: number;
  isLit: boolean;
}

const BirthdayCake = () => {
  const [candlePositions, setCandlePositions] = useState<CandlePosition[]>([]);
  const { microphoneVolume, stopMicrophone } = useMicrophone();

  // Get the age from the user context
  const { age } = useUser();

  // Function to blow out a single candle
  const blowOutCandle = (candle: { x: number; y: number; isLit: boolean }) => {
    // Set the isLit property of the candle in the candlePositions useState to false
    setCandlePositions((prevPositions) =>
      prevPositions.map((position) =>
        position.x === candle.x && position.y === candle.y
          ? { ...position, isLit: false }
          : position
      )
    );
  };

  // Function to blow out many candles at once (use for microphone input)
  const blowOutCandles = async () => {
    // Filter the candles that are currently lit
    const litCandles = candlePositions.filter((candle) => candle.isLit);

    // Iterate through each lit candle and blow it out
    for (const candle of litCandles) {
      // We use random percentage chance to blow out the candle to simulate realistic blowing
      // If no microphone input, we use Math.random() to simulate blowing
      // The louder the microphone input, the higher the success rate
      // const successRate = microphoneVolume  === 0 ? Math.random() * 100 : microphoneVolume;
      const successRate = normalRandom() * 100;
      if (DEBUG) {
        console.log("Success rate:", successRate);
      }

      await new Promise<void>((resolve) => {
        // Call blowOutCandle function after a short delay
        setTimeout(() => {
          // If the success rate is higher than 60%, blow out the candle
          if (successRate > 50) {
            blowOutCandle(candle); // Pass the candle object to the blowOutCandle function
          }
          resolve();
        }, Math.max(0, 100 - Number(microphoneVolume))); // Convert microphoneVolume to number before performing arithmetic operation
        /* The delay for animation speed (in milliseconds) 
            the louder the microphone input, the faster the animation */
      });
    }

    // If there is no more candles to blow out, stop the microphone
    if (candlePositions.filter((candle) => candle.isLit).length === 0) {
      stopMicrophone();
      console.log("Microphone stopped");
    }
  };

  // TODO: * Use vibration to also blow out candles or add animation where candle light flickers when moving the phone

  useEffect(() => {
    const cakeWidth = (document.querySelector(".cake") as HTMLElement).offsetWidth;
    const icingHeight = (document.querySelector(".icing") as HTMLElement).offsetHeight;
    const numberOfCandles = age; // Number of candles you want to place on the cake

    // Generate random x and y coordinates for each candle
    const positions = Array.from({ length: numberOfCandles }, () => {
      // Random x coordinate between 12% and 88% of the cake width
      const randomX = Math.floor(Math.random() * (cakeWidth * 0.76) + cakeWidth * 0.12);
      // Random y coordinate between the icing height - 115 and icing height - 75
      const randomY = Math.floor(randomNumberInRange(icingHeight - 115, icingHeight - 75));

      return { x: randomX, y: randomY, isLit: true };
    });

    // Sort the positions based on y-coordinate in descending order
    positions.sort((a, b) => b.y - a.y);

    setCandlePositions(positions);
  }, []);

  useEffect(() => {
    if (DEBUG) {
      console.log("Microphone volume:", microphoneVolume);
      console.log("Device is mobile:", isMobile)
    }

    if (isMobile && microphoneVolume >= 15) {
      blowOutCandles();
    } else if (!isMobile && microphoneVolume >= 30) {
      blowOutCandles();
    }
  }, [microphoneVolume]);

  return (
    // Display the cake and candles on the screen using CSS classes
    <>
      <div className="flex justify-center">
        <div className="cake">
          <div className="plate"></div>
          <div className="layer layer-bottom"></div>
          <div className="layer layer-middle"></div>
          <div className="layer layer-top"></div>
          <div className="icing"></div>
          <div className="drip drip1"></div>
          <div className="drip drip2"></div>
          <div className="drip drip3"></div>

          {/* Add candles to the cake
                  Note: we want to use slide() to create a temporary copy and reverse its order
                  This way, the candles are rendered from the top to bottom
                  Making the bottom candles cover the top ones, avoiding overlapping*/}
          {candlePositions
            .slice()
            .reverse()
            .map((candlePosition, index) => (
              <motion.div   // We use Framer Motion to animate the candle dropping from the top animation
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                // delay based on the index of the candle to prevent stagger effects
                transition={{ delay: 0.5 + index * 0.1 }}
                // Candle properties
                key={index}
                className="candle"
                style={{
                  left: `${candlePosition.x}px`,
                  top: `${candlePosition.y}px`,
                }}
              >
                {candlePosition.isLit && (
                  <motion.div  // We use Framer Motion to animate the flame going out
                    className="flame"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                  />
                )}

                <div className="candle-wick"></div>
              </motion.div>
            ))}
        </div>
      </div>

      <div className="flex justify-center mt-30">
          <button
          type="button"
          onClick={() => blowOutCandles()}
          className="bg-neutral-400 hover:bg-neutral-200 text-black font-bold py-2 px-6 rounded-full"
        >
          Click to Blow Candles
        </button>
      </div>
    </>
  );
}

export default BirthdayCake;
