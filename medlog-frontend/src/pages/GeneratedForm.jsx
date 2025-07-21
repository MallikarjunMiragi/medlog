import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../reducers/categoryReducer";
import DynamicCategoryForm from "../Components/DynamicCategoryForm";

const GeneratedForm = () => {
  const { category } = useParams();
  const dispatch = useDispatch();

  const [isListening, setIsListening] = useState(false);
  const [formValues, setFormValues] = useState({});
  const recognitionRef = useRef(null);

  const userEmail = useSelector((state) => state.auth?.user?.email);
  const categories = useSelector((state) => state.category.categories);
  const loading = useSelector((state) => state.category.loading);
  const error = useSelector((state) => state.category.error);

  const selectedCategory = categories.find((cat) => cat.name === category);

  // Fetch categories on load
  useEffect(() => {
    if (categories.length === 0 && userEmail) {
      dispatch(fetchCategories(userEmail));
    }
  }, [dispatch, categories.length, userEmail]);

  // Initialize Speech Recognition
  useEffect(() => {
  if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false; // or true if you want to keep listening
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = async (event) => {
      const voiceInput = event.results[0][0].transcript;
      setIsListening(false);
      await handleVoiceToGemini(voiceInput);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
      if (event.error === "no-speech") {
        alert("No speech detected. Please try again.");
      }
    };

    recognitionRef.current = recognition;
  } else {
    alert("Speech Recognition not supported in this browser.");
  }
}, []);


  const handleMicClick = () => {
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const handleVoiceToGemini = async (text) => {
    try {
      const response = await fetch("/api/ai/parse-form-fields", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transcript: text,
          fieldNames: selectedCategory?.fields || [],
        }),
      });

      const data = await response.json();
      console.log("Gemini Response:", data);
      // If backend returns { fields: {...} }, use that for form values
      if (data && data.fields) {
        setFormValues(data.fields);
      } else {
        setFormValues({});
      }
    } catch (err) {
      console.error("Error calling Gemini API:", err);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.micWrapper}>
        <button
          type="button"
          style={{
            ...styles.micButton,
            background: isListening ? "#f87171" : "linear-gradient(45deg, #8abff4, #7ab8f5)",
          }}
          onClick={handleMicClick}
          title="Voice Input"
        >
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" style={{ color: "#1e293b" }}>
            <path d="M12 15c1.66 0 3-1.34 3-3V6c0-1.66-1.34-3-3-3s-3 1.34-3 3v6c0 1.66 1.34 3 3 3zm5-3c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V22h2v-2.08c3.39-.49 6-3.39 6-6.92h-2z" />
          </svg>
        </button>
      </div>

      {loading ? (
        <p>Loading form fields...</p>
      ) : error ? (
        <p>Error loading categories: {error}</p>
      ) : !selectedCategory ? (
        <p>Category not found.</p>
      ) : (
        <DynamicCategoryForm categoryName={category} formValues={formValues} />
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "30px",
    maxWidth: "1200px",
    margin: "40px auto",
    width: "100%",
    borderRadius: "30px",
    color: "black",
    background: "linear-gradient(0deg, rgb(255, 255, 255) 0%, rgb(219, 239, 245) 100%)",
    border: "5px solid rgb(255, 255, 255)",
    boxShadow: "rgba(133, 189, 215, 0.88) 0px 30px 30px -20px",
  },
  micWrapper: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 20,
  },
  micButton: {
    border: "none",
    borderRadius: "50%",
    width: 48,
    height: 48,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 12px rgba(122, 184, 245, 0.2)",
    cursor: "pointer",
    outline: "none",
    marginRight: 8,
  },
};
export default GeneratedForm;
