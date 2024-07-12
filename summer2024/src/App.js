"use client";
import "./App.css";
import React, { useState } from "react";
import { send } from "./azurefileprocessor";

function App() {
  const [subject, setSubject] = useState("");
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleFilechange = async (event) => {
    setFile(event.target.files[0]);
  };

  const UploadHandler = async (event) => {
    event.preventDefault();
    if (!subject || !file) {
      alert("Please enter a subject and select a file first.");
      return;
    }

    setIsLoading(true);

    const reader = new FileReader();

    reader.onload = async (e) => {
      const fileContent = e.target.result;

      try {
        const res = await send(fileContent, subject);

        setResponse(res);
      } catch (error) {
        console.error("Error:", error);
        console.log(error, error);
        setResponse("Error processing the request.");
      } finally {
        setIsLoading(false);
      }
    };
    reader.readAsText(file);
  };

  return (
    <>
      <div className="App">
        <h1>LiveLearn</h1>
        <form onSubmit={UploadHandler}>
          <div>
            <label htmlFor="subject">Subject: </label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={handleSubjectChange}
              placeholder="Enter the file's subject"
            />
          </div>
          <div>
            <label htmlFor="file">File: </label>
            <input
              type="file"
              id="file"
              onChange={handleFilechange}
              accept=".txt"
            />
          </div>
          <button type="submit" disabled={isLoading || !file || !subject}>
            {isLoading ? "Processing..." : "Upload and Process"}
          </button>
        </form>
        {response && (
          <div>
            <h3>Lesson Plan:</h3>
            <p>{response}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
