import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FiCopy } from 'react-icons/fi';

export default function Result({ readme }) {
  const downloadFile = () => {
    const blob = new Blob([readme], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    a.click();
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-900 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">📄 Generated README:</h2>
      <pre className="bg-gray-800 p-4 rounded text-sm overflow-x-auto max-h-96">{readme}</pre>
      <div className="flex gap-4 mt-4">
        <CopyToClipboard text={readme}>
          <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded">
            <FiCopy /> Copy
          </button>
        </CopyToClipboard>
        <button
          onClick={downloadFile}
          className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded"
        >
          Download .md
        </button>
      </div>
    </div>
  );
}
