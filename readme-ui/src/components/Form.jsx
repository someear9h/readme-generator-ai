import React, { useState, useRef } from 'react';
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
  const [jobStatus, setJobStatus] = useState(null);  // {job_id, status, ...}
  const pollTimerRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setReadme("");          // clear old result
    setJobStatus(null);     // reset status

    const payload = {
      project_name: form.projectName,
      tech_stack: form.techStack,
      languages: form.languages,
      description: form.description,
    };

    try {
      const res = await axios.post(`${API_BASE}/jobs/create`, payload);
      console.log("Job created:", res.data);
      setJobStatus(res.data);

      // start polling for job completion
      startPolling(res.data.job_id);
    } catch (err) {
      console.error("Error creating job:", err);
      alert("Failed to start README generation. See console.");
      setLoading(false);
    }
  };

  const startPolling = (jobId) => {
    // clear old timer if any
    if (pollTimerRef.current) clearInterval(pollTimerRef.current);

    pollTimerRef.current = setInterval(async () => {
      try {
        const res = await axios.get(`${API_BASE}/jobs/${jobId}`);
        console.log("Job poll:", res.data);
        setJobStatus(res.data);

        if (res.data.status === "completed") {
          clearInterval(pollTimerRef.current);
          pollTimerRef.current = null;
          setLoading(false);
          // backend stores generated markdown in `prompt`
          setReadme(res.data.prompt || "");
        } else if (res.data.status === "failed") {
          clearInterval(pollTimerRef.current);
          pollTimerRef.current = null;
          setLoading(false);
          alert("README generation failed: " + (res.data.error || "Unknown error"));
        }
      } catch (err) {
        console.error("Polling error:", err);
        // don't kill immediately; could be transient
      }
    }, 2000); // poll every 2s
  };

  // cleanup on unmount
  React.useEffect(() => {
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

      {jobStatus && (
        <div className="mt-4 text-sm text-gray-300">
          <div><strong>Job:</strong> {jobStatus.job_id}</div>
          <div><strong>Status:</strong> {jobStatus.status}</div>
          {jobStatus.error && (
            <div className="text-red-400 mt-1">Error: {jobStatus.error}</div>
          )}
        </div>
      )}
    </div>
  );
}
