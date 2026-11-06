
import { useState } from "react";
import "./App.css";

function App() {
  const [inputLanguage, setInputLanguage] = useState("English");
  const [outputLanguage, setOutputLanguage] = useState("German");
  const [textInput, setTextInput] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const languages = [
    "English",
    "Malay",
    "German",
    "Chinese",
    "Japanese",
    "Korean",
    "Arabic",
    "French",
    "Spanish"
  ];

  async function handleTranslate() {
    if (!textInput.trim()) {
      setError("Please enter text to translate.");
      return;
    }

    setLoading(true);
    setError("");
    setTranslatedText("");

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/translate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            input_language: inputLanguage,
            output_language: outputLanguage,
            text_input: textInput
          })
        }
      );

      if (!response.ok) {
        throw new Error("Translation failed");
      }

      const data = await response.json();
      setTranslatedText(data.translated_text);

    } catch (err) {
      setError("Translation failed. Please check your backend.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <div className="translator-card">
        <h1>Text Translator</h1>
        <p className="subtitle">
          AI-powered language translation
        </p>

        <div className="language-grid">
          <div className="field">
            <label>Input Language</label>
            <select
              value={inputLanguage}
              onChange={(e) => setInputLanguage(e.target.value)}
            >
              {languages.map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>

          <div className="field">
            <label>Output Language</label>
            <select
              value={outputLanguage}
              onChange={(e) => setOutputLanguage(e.target.value)}
            >
              {languages.map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="text-grid">
          <div className="field">
            <label>Enter text to translate</label>
            <textarea
              placeholder="Type your text here..."
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
            />
          </div>

          <div className="field">
            <label>Translation</label>
            <textarea
              placeholder="Your translation will appear here..."
              value={translatedText}
              readOnly
            />
          </div>
        </div>

        {error && <p className="error">{error}</p>}

        <button
          onClick={handleTranslate}
          disabled={loading}
        >
          {loading ? "TRANSLATING..." : "TRANSLATE"}
        </button>
      </div>
    </div>
  );
}

export default App;
