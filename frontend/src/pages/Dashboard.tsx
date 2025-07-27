import { useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";


export default function Dashboard() {
  const [form, setForm] = useState({
    project_name: "",
    tech_stack: "",
    languages: "",
    description: "",
  });
  const [readme, setReadme] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generate = async () => {
    const res = await axios.post(`${API}/jobs/create`, form);
    const jobId = res.data.job_id;

    const interval = setInterval(async () => {
      const jobStatus = await axios.get(`${API}/jobs/${jobId}`);
      if (jobStatus.data.status === "completed") {
        setReadme(jobStatus.data.prompt);
        clearInterval(interval);
      }
    }, 2000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(readme);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow rounded-xl space-y-6">
      <h1 className="text-2xl font-bold">Generate Your Project README</h1>
      <input className="input" name="project_name" placeholder="Project Name" onChange={handleChange} />
      <input className="input" name="tech_stack" placeholder="Tech Stack" onChange={handleChange} />
      <input className="input" name="languages" placeholder="Languages" onChange={handleChange} />
      <textarea className="input h-24" name="description" placeholder="Project Description" onChange={handleChange}></textarea>
      <button className="btn" onClick={generate}>Generate README</button>

      {readme && (
        <div className="space-y-2 mt-6">
          <button className="btn" onClick={copyToClipboard}>📋 Copy to Clipboard</button>
          <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap">{readme}</pre>
        </div>
      )}
    </div>
  );
}
