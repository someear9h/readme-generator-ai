import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const API_BASE = "http://localhost:8000/api";

export default function Form({ setReadme }) {
  const [form, setForm] = useState({
    projectName: '',
    techStack: '',
    languages: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const pollTimerRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setReadme(""); // Clear previous README

    const payload = {
      project_name: form.projectName,
      tech_stack: form.techStack,
      languages: form.languages,
      description: form.description,
    };

    try {
      const res = await axios.post(`${API_BASE}/jobs/create`, payload);
      const jobId = res.data.job_id;
      if (jobId) {
        startPolling(jobId);
      } else {
        throw new Error("No job ID returned");
      }
    } catch (err) {
      console.error("Error creating job:", err);
      alert("Failed to start README generation.");
      setLoading(false);
    }
  };

  const startPolling = (jobId) => {
    if (pollTimerRef.current) clearInterval(pollTimerRef.current);

    pollTimerRef.current = setInterval(async () => {
      try {
        const res = await axios.get(`${API_BASE}/jobs/${jobId}`);
        const { status, prompt, error } = res.data;

        if (status === "completed") {
          clearInterval(pollTimerRef.current);
          pollTimerRef.current = null;
          setLoading(false);
          setReadme(prompt || "");
        } else if (status === "failed") {
          clearInterval(pollTimerRef.current);
          pollTimerRef.current = null;
          setLoading(false);
          alert("README generation failed: " + (error || "Unknown error"));
        }
      } catch (err) {
        console.error("Polling error:", err);
        // Do not stop immediately on polling error
      }
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (pollTimerRef.current) clearInterval(pollTimerRef.current);
    };
  }, []);

  return (
    <div className="max-w-3xl mx-auto bg-gray-900 p-6 rounded-lg shadow-lg">
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="projectName"
          placeholder="Project Name"
          className="p-3 rounded bg-gray-800 w-full text-white"
          value={form.projectName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="techStack"
          placeholder="Tech Stack (e.g., MERN, LAMP)"
          className="p-3 rounded bg-gray-800 w-full text-white"
          value={form.techStack}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="languages"
          placeholder="Languages Used (e.g., JavaScript, Python)"
          className="p-3 rounded bg-gray-800 w-full text-white"
          value={form.languages}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Project Description"
          className="p-3 rounded bg-gray-800 w-full h-40 text-white"
          value={form.description}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold"
        >
          {loading ? "Generating..." : "Generate README"}
        </button>
      </form>
    </div>
  );
}
