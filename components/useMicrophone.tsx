import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useMicrophone = () => {
  const [microphoneVolume, setMicrophoneVolume] = useState<number>(0);
  const [isEnable, setIsEnable] = useState<boolean>(true);
  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const setupMicrophone = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const audioContext = new AudioContext();
      const microphone = audioContext.createMediaStreamSource(stream);
  
      // Create an analyser node to get microphone input data
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      microphone.connect(analyser);
  
      // Start audio processing
      audioContextRef.current = audioContext;
  
      // Continuously process microphone data
      const processMicrophoneData = () => {
        if (streamRef.current && !streamRef.current.active) {
          // If stream is no longer active, stop processing microphone data
          return;
        }
  
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyser.getByteFrequencyData(dataArray);
  
        // Calculate average volume from microphone input
        const averageVolume =
          dataArray.reduce((acc, val) => acc + val, 0) / bufferLength;
  
        // Map the average volume to blow out candles
        const loudness = (averageVolume / 255) * 100; // Normalize volume to 0-100
  
        setMicrophoneVolume(loudness);
  
        // Repeat processing
        requestAnimationFrame(processMicrophoneData);
      };
  
      processMicrophoneData();
  
    } catch (error) {
      console.error("Error accessing microphone:", error);
      toast.error("Please allow microphone access for the full experience");
      setIsEnable(false);
    }
  };  

  useEffect(() => {
    setupMicrophone();

    return () => {
      if (isEnable) {
        toast.info("Please blow to the microphone to blow out the candles");
      }
    };
  }, []);

  // Note: We can only stop sound being recorded from microphone
  // In Javascript, it is not possible to close active microphone input
  // Ref: https://qr.ae/psnNXs
  const stopMicrophone = () => {
    if (streamRef.current) {
      // Lambda function to stop all tracks
      streamRef.current.getTracks().forEach((track) => track.stop());
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }  
    }
  };

  return { microphoneVolume, stopMicrophone };
};

export default useMicrophone;
