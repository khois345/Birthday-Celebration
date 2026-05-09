"use client";

import React from "react";
import "../app/birthday-cake.scss";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useMicrophone from "./useMicrophone";
import { useUser } from "@/context/userContext";
import { randomNumberInRange } from "@/utils/utilFunctions";

const DEBUG = true;

interface CandlePosition {
  x: number;
  y: number;
  isLit: boolean;
}

const BirthdayCake = () => {
  const [candlePositions, setCandlePositions] = useState<CandlePosition[]>([]);
  const { microphoneVolume, averageVolume, isBlowing, stopMicrophone } = useMicrophone();
  const [renderedCandlesCount, setRenderedCandlesCount] = useState<number>(0);

  // Get the age from the user context
  const { age } = useUser();

  if (DEBUG) {
    console.log("Volume:", microphoneVolume.toFixed(2), "Average:", averageVolume.toFixed(2), "Blowing:", isBlowing);
  }

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
    if (renderedCandlesCount != candlePositions.length) {
      return;
    }

    // Filter the candles that are currently lit
    const litCandles = candlePositions.filter((candle) => candle.isLit);

    // Iterate through each lit candle and blow it out
    for (const candle of litCandles) {
      // 98% success rate when blowing
      if (Math.random() > 0.02) {
        blowOutCandle(candle);
      }
      
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 25);
      });
    }

    // If there is no more candles to blow out, stop the microphone
    if (candlePositions.filter((candle) => candle.isLit).length === 0) {
      stopMicrophone();
    }
  };

  // Function to blow out all candles immediately (use for button click)
  const blowOutAllCandles = async () => {
    // Repeatedly call blowOutCandles until all are blown
    while (candlePositions.filter((candle) => candle.isLit).length > 0) {
      await blowOutCandles();
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
  }, []); // Render the candles only once when the component mounts

  useEffect(() => {
    if (isBlowing) {
      blowOutCandles();
    }
  }, [isBlowing]); // Trigger the effect when isBlowing changes

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
              Making the bottom candles cover the top ones, avoiding overlapping*/
          /* Due to the limited hardward of smartphones, we need to set different framer motion
              render speed to reduce stagger effect */}

          {candlePositions
            .slice()
            .reverse()
            .map((candlePosition, index) => (
              <motion.div   // We use Framer Motion to animate the candle dropping from the top animation
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.03 }}
                // Candle properties
                key={index}
                className="candle"
                style={{
                  left: `${candlePosition.x}px`,
                  top: `${candlePosition.y}px`,
                }}
                // Keep track of rendered candles to prevent blowing candles during rendering
                onAnimationComplete={() => setRenderedCandlesCount((prevCount) => prevCount + 1)}
              >
                {candlePosition.isLit && (
                  <motion.div  // We use Framer Motion to animate the flame going out
                    className="flame"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    // Flame fade duration scales with age: younger = faster, older = slower
                    transition={{ duration: Math.max(0.15, Math.min(0.8, 0.15 + age * 0.01)) }}
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
          onClick={() => blowOutAllCandles()}
          className="bg-neutral-400 hover:bg-neutral-200 text-black font-bold py-2 px-6 rounded-full"
        >
          Click to Blow Candles
        </button>
      </div>
    </>
  );
}

export default BirthdayCake;
