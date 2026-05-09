import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const useMicrophone = () => {
  const [microphoneVolume, setMicrophoneVolume] = useState<number>(0);
  const [averageVolume, setAverageVolume] = useState<number>(0);
  const [isBlowing, setIsBlowing] = useState<boolean>(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const volumeHistoryRef = useRef<number[]>([]);

  const setupMicrophone = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const audioContext = new AudioContext();
      const microphone = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      microphone.connect(analyser);

      audioContextRef.current = audioContext;

      const processMicrophoneData = () => {
        if (!streamRef.current || !streamRef.current.active) {
          return;
        }

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyser.getByteFrequencyData(dataArray);

        const currentVolume = (dataArray.reduce((acc, val) => acc + val, 0) / bufferLength / 255) * 100;

        // Track volume history (keep last 30 readings)
        volumeHistoryRef.current.push(currentVolume);
        if (volumeHistoryRef.current.length > 30) {
          volumeHistoryRef.current.shift();
        }

        const runningAverage = volumeHistoryRef.current.length > 0
          ? volumeHistoryRef.current.reduce((a, b) => a + b, 0) / volumeHistoryRef.current.length
          : 0;

        // Detect blow when volume spikes above 3x the average
        const detected = runningAverage > 0 && currentVolume > runningAverage * 3;

        setMicrophoneVolume(currentVolume);
        setAverageVolume(runningAverage);
        setIsBlowing(detected);

        requestAnimationFrame(processMicrophoneData);
      };

      processMicrophoneData();
    } catch (error) {
      console.error("Error accessing microphone:", error);
      toast.error("Please allow microphone access for the full experience");
    }
  };

  useEffect(() => {
    setupMicrophone();

    return () => {
      stopMicrophone();
    };
  }, []);

  const stopMicrophone = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    setMicrophoneVolume(0);
    setAverageVolume(0);
    setIsBlowing(false);
    volumeHistoryRef.current = [];

    console.log("Microphone stopped");
  };

  return {
    microphoneVolume,
    averageVolume,
    isBlowing,
    stopMicrophone,
  };
};

export default useMicrophone;