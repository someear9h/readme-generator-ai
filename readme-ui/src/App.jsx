import React, { useState } from "react";
import Form from "./components/Form";
import Result from "./components/Result";

export default function App() {
  const [readme, setReadme] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-8">📝 README Generator</h1>
      <Form setReadme={setReadme} />
      {readme && <Result readme={readme} />}
    </div>
  );
}
