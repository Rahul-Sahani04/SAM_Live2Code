import React, { useEffect, useRef, useState } from "react";
import ml5 from "ml5";
import useInterval from "@use-it/interval";
import { useSpeechSynthesis } from "react-speech-kit";
import Camera from "../components/Camera";
let classifier;

function Main() {
  const videoRef = useRef();
  const { speak, speaking } = useSpeechSynthesis();

  const [start, setStart] = useState(false);
  const [result, setResult] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [labelString, setLabelString] = useState("");
  const [sentence, setSentence] = useState("");
  const [delay, setDelay] = useState(0);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  const LABEL_THRESHOLD_TIME = 3000; // 3 seconds (in milliseconds)
  const [currentLetter, setCurrentLetter] = useState(""); // Current letter
  const [letterStartTime, setLetterStartTime] = useState(null); // Start time for the current letter

  useEffect(() => {

    classifier = ml5.imageClassifier("https://raw.githubusercontent.com/Rahul-Sahani04/SAM_Live2Code/main/frontend/public/model/modelV1.json", () => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((stream) => {
          videoRef.current.srcObject = stream;
          videoRef.current.addEventListener("loadedmetadata", () => {
            videoRef.current.play();
            setLoaded(true);
          });
        });
    });

    // Add an event listener for the 'voiceschanged' event
    window.speechSynthesis.addEventListener("voiceschanged", () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      setSelectedVoice(availableVoices[0]);
    });

    // Ensure initial voices are available
    const availableVoices = window.speechSynthesis.getVoices();
    setVoices(availableVoices);
    setSelectedVoice(availableVoices[0]);
  }, []);

  const handleSpeak = () => {
    if (sentence) {
      if (selectedVoice) {
        speak({ text: sentence, voice: selectedVoice });
      } else {
        speak({ text: sentence });
      }
    }
  };

  useInterval(() => {
    if (classifier && start) {
      classifier.classify(videoRef.current, (error, results) => {
        if (error) {
          console.error(error);
          return;
        }

        // Check if the first label remains the same for LABEL_THRESHOLD_TIME
        const firstLabel = results[0]?.label || "";
        if (firstLabel !== result[0]?.label) {
          setLabelString(firstLabel);
          setCurrentLetter(""); // Reset the current letter when the label changes
          setLetterStartTime(null); // Reset the start time when the label changes
        } else if (result[0]?.label && labelString === firstLabel) {
          setDelay((preb) => preb + 0.5)
          const currentTime = Date.now();
          if (!letterStartTime) {
            // Set the start time for the current letter
            setDelay(0)
            setLetterStartTime(currentTime);
            setCurrentLetter(firstLabel);
          } else if (currentTime - letterStartTime >= LABEL_THRESHOLD_TIME) {
            // If the current letter has remained the same for 3 seconds, append it to the sentence
            setSentence((prevSentence) => prevSentence + firstLabel);
            setLetterStartTime(0)
            setDelay(0)
          }
        }

        setResult(results);
      });
    }
  }, 500);


  const toggle = () => {
    setStart(!start);
    setResult([]);
    setLabelString(""); // Reset the label string when toggling
    setCurrentLetter(""); // Reset the current letter when toggling
    setLetterStartTime(null); // Reset the start time when toggling
    setSentence(""); // Reset the sentence when toggling
  };

  return (
    <div className="container">
      <div className="upper w-full mt-6 flex justify-center">
        <div className="capture">
          <Camera
            videoRef={videoRef}
            width={"500"}
            height={"250"}
          />
          <p className="sentence text-2xl">
            Wait: {delay % 1 ? "" : delay}
          </p>
          {sentence && (
            <p className="sentence text-3xl">
              Sentence: {sentence}
            </p>
          )}
          {result && result.slice(0, 1).map((key, index) => (
            <p className="pred text-2xl" key={index}>
              Prediction: {key["label"] + " " + key["confidence"]}
            </p>
          ))}
 
          {loaded && (
            <button
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded m-4"
              onClick={() => toggle()}>
              {start ? "Stop" : "Start"}
            </button>
          )}

          {speaking && <p>Speaking...</p>}
          <button
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            value={"Click"} onClick={handleSpeak}>Play</button>
        </div>

        {/* Voice Selection Dropdown */}

        {/* <div>
          <label>Select Voice: </label>
          <select
            onChange={(e) => {
              const selectedVoiceId = e.target.value;
              const selected = voices.find(
                (voice) => voice.voiceId === selectedVoiceId
              );
              setSelectedVoice(selected);
            }}
          >
            {voices.map((voice) => (
              <option key={voice.voiceId} value={voice.voiceId}>
                {voice.name} ({voice.lang})
              </option>
            ))}
          </select>
        </div> */}
      </div>
    </div>
  );
}

export default Main;