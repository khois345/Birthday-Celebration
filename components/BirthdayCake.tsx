"use client";

import React from "react";
import "../app/birthday-cake.scss";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useMicrophone from "./useMicrophone";
import { isMobile } from "react-device-detect";

const DEBUG = true;

interface CandlePosition {
  x: number;
  y: number;
  isLit: boolean;
}

export default function BirthdayCake() {
  const [candlePositions, setCandlePositions] = useState<CandlePosition[]>([]);
  const { microphoneVolume } = useMicrophone();

  // Simple utility functions ------------------------
  const randomNumberInRange = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  /* Function to generate a random number 
      with a normal distribution (Gaussian distribution) between 0 and 1
      for success percentage */
  const normalRandom = () => {
    let val = 0;
    for (let i = 0; i < 6; i++) {
      val += Math.random();
    }
    return val / 6;
  };
  //--------------------------------------------------

  // Function to blow out a single candle
  const blowOutCandle = (candle: { x: number; y: number; isLit: boolean }) => {
    // Update the state to indicate the candle have been blown out
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

      await new Promise<void>((resolve) => {
        // Call blowOutCandle function after a short delay
        setTimeout(() => {
          // If the success rate is higher than 60%, blow out the candle
          if (successRate > 50) {
            blowOutCandle(candle); // Pass the candle object to the blowOutCandle function

            if (DEBUG) {
              //console.log("successRate:", successRate);
            }
          }
          resolve();
        }, Math.max(0, 100 - Number(microphoneVolume))); // Convert microphoneVolume to number before performing arithmetic operation
        /* The delay for animation speed (in milliseconds) 
            the louder the microphone input, the faster the animation */
      });

      // If there is no more candles to blow out, stop the microphone
      //  if (candlePositions.filter((candle) => candle.isLit).length === 0) {
      //    // Do something
      //  }
    }
  };

  // TODO: * Use vibration to also blow out candles or add animation where candle light flickers when moving the phone

  useEffect(() => {
    const cakeWidth = (document.querySelector(".cake") as HTMLElement).offsetWidth;
    const icingHeight = (document.querySelector(".icing") as HTMLElement).offsetHeight;
    //  const numberOfCandles = randomNumberInRange(1, 100); // Number of candles you want to place on the cake
    const numberOfCandles = 30; // Number of candles you want to place on the cake

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
    // Different microphoneVolume threshold for mobile and desktop    
    if (isMobile) {
      // Only blow out the candle if the microphoneVolume is above 55
      if (microphoneVolume >= 15) {
        if (DEBUG) {
          console.log("microphoneVolume:", microphoneVolume);
        }
        blowOutCandles();
      }
    } else {
      // Only blow out the candle if the microphoneVolume is above 55
      if (microphoneVolume >= 30) {
        if (DEBUG) {
          console.log("microphoneVolume:", microphoneVolume);
        }
        blowOutCandles();
      }
    }
  }, [microphoneVolume]);

  return (
    <div className="flex flex-col">
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
            <motion.div
              // Framer Motion properties
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
                <motion.div
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
      <button
        type="button"
        onClick={() => blowOutCandles()}
        className="bg-neutral-400 hover:bg-neutral-200 text-black font-bold py-2 px-4 rounded"
      >
        Click to Blow Candles
      </button>
    </div>
  );
}
