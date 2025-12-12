import React, { useState } from "react";
import axios from "axios";

function Conversation({ onComplete }) {
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/conversation", {
        audioText: inputText,
      });
      onComplete(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="mt-4">
      <h3>Simulated Voice Conversation</h3>
      <input
        type="text"
        className="form-control"
        placeholder="Say something (simulate voice input)..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button
        className="btn btn-success mt-3"
        onClick={handleSend}
        disabled={loading}
      >
        {loading ? "Processing..." : "Send"}
      </button>
    </div>
  );
}

export default Conversation;
