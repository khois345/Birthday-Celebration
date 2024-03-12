import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useMicrophone = () => {
  const [microphoneVolume, setmicrophoneVolume] = useState<number>(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleMicrophone = () => {
    setIsEnabled((prev) => !prev);  // prev is the previous state of isEnabled (useState hook)
  };

  useEffect(() => {
    let cleanupFunction: (() => void) | null = null;

    const setupMicrophone = async () => {
      if (!isEnabled) {
        console.log('Microphone access not enabled');
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
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
            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            analyser.getByteFrequencyData(dataArray);

            // Calculate average volume from microphone input
            const averageVolume = dataArray.reduce((acc, val) => acc + val, 0) / bufferLength;

            // Map the average volume to blow out candles
            const loudness = (averageVolume / 255) * 100; // Normalize volume to 0-100

            setmicrophoneVolume(loudness);

            // Repeat processing
            requestAnimationFrame(processMicrophoneData);
        };

        processMicrophoneData();

        cleanupFunction = () => {
          // Clean up audio context when component unmounts
          if (audioContextRef.current) {
            audioContextRef.current.close();
            audioContextRef.current = null;
          }
        };
      } catch (error) {
        console.error('Error accessing microphone:', error);
        toast.error("Please allow microphone access for the full experience");
        setTimeout(() => {
          setupMicrophone();
        }, 60000); // Retry after one minute (60000ms)
      }
    };

    setupMicrophone();

    return () => {
      if (cleanupFunction) {
        cleanupFunction();
      }
    };
  }, [isEnabled]);

  return { microphoneVolume, toggleMicrophone};
};

export default useMicrophone;
