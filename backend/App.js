import React, { useEffect, useRef, useState } from "react";
import ml5 from "ml5";
import useInterval from "@use-it/interval";
import { useSpeechSynthesis } from "react-speech-kit";

import "./App.css";

let classifier;

function App() {
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
    classifier = ml5.imageClassifier("./model/model.json", () => {
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
      <div className="upper">
        <div className="capture">
          <video
            ref={videoRef}
            style={{ transform: "scale(-1, 1)" }}
            width="300"
            height="150"
          />
          {loaded && (
            <button onClick={() => toggle()}>
              {start ? "Stop" : "Start"}
            </button>
          )}
          <p className="sentence">
            Wait: {delay % 1 ? "" : delay}
          </p>
          {sentence && (
            <p className="sentence">
              Sentence: {sentence}
            </p>
          )}
          {result && result.slice(0, 1).map((key, index) => (
            <p className="pred" key={index}>
              {key["label"] + " " + key["confidence"]}
            </p>
          ))}
          {speaking && <p>Speaking...</p>}
        </div>
        <button value={"Click"} onClick={handleSpeak}>Play</button>

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

export default App;