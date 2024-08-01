import React, { useState } from 'react';

const TextSummarizer = () => {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');

  const getSummary = async (text) => {
    try {
      const response = await fetch('/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text })
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      setSummary(data.summary);  // Assuming setSummary is a function to update your UI
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-4">Text Summarizer</h1>
        <textarea
          className="w-full p-2 border border-gray-300 rounded mb-4"
          rows="10"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to summarize..."
        ></textarea>
        <button
          onClick={getSummary}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Summarize
        </button>
        <h2 className="text-xl font-semibold mt-6">Summary:</h2>
        <p id="output" className="mt-2 p-4 bg-gray-200 rounded">{summary}</p>
      </div>
    </div>
  );
};

export default TextSummarizer;
