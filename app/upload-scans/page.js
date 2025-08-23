"use client";
import { useState } from "react";
import Link from 'next/link';
import FileUpload from "../Component/FileUpload"; // Adjust path if needed
import { BrainCircuit, AlertTriangle, CheckCircle2, Loader, ArrowLeft } from 'lucide-react';

export default function UploadPage() {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

 const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0) {
      alert("Please upload at least one MRI scan.");
      return;
    }
    setIsLoading(true);
    setResult(null);

    // 1. Create a FormData object to hold the files
    const formData = new FormData();

    // 2. Add each file to the FormData object.
    // The key 'scans' is what your backend will use to find the files.
    files.forEach(file => {
      formData.append('scans', file);
    });

    try {
      // 3. Make the actual API call to your backend endpoint
      const response = await fetch('/api/upload', { // Use your actual API route
        method: 'POST',
        body: formData,
        // Note: You don't need to set the 'Content-Type' header.
        // The browser does it automatically for FormData.
      });

      // 4. Check if the request was successful
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      // 5. Get the JSON result from the server and update the state
      const data = await response.json();
      setResult(data);

    } catch (error) {
      // 6. Handle any errors during the upload
      console.error("Failed to upload files:", error);
      setResult({ 
        prediction: "Error", 
        details: "Failed to get a result. Please try again." 
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleReset = () => {
    setFiles([]);
    setResult(null);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8">
            <ArrowLeft size={16} />
            Back to Home
        </Link>

        <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div className="text-center mb-10">
            <h1 className="text-4xl sm:text-5xl font-extrabold">
              Upload Scans for Analysis
            </h1>
            <p className="text-gray-400 mt-2">Our AI will process the images and provide a preliminary analysis.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column: Form */}
            <div className="p-6 bg-gray-800/40 rounded-lg border border-gray-700">
              <form onSubmit={handleSubmit}>
                <FileUpload files={files} setFiles={setFiles} />
                <button
                  type="submit"
                  disabled={isLoading || files.length === 0}
                  className="w-full mt-8 py-3 px-6 rounded-lg font-semibold text-white transition-all duration-300 flex items-center justify-center
                             bg-green-800 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
                >
                  {isLoading ? <><Loader className="animate-spin mr-2"/> Analyzing...</> : "Run Analysis"}
                </button>
              </form>
            </div>

            {/* Right Column: Results */}
            <div className="p-6 bg-gray-800/40 rounded-lg border border-gray-700 flex flex-col items-center justify-center min-h-[400px]">
              <h2 className="text-2xl font-bold mb-6 flex items-center self-start text-gray-300"><BrainCircuit className="mr-3 text-green-400"/> Analysis Result</h2>
              
              {isLoading && (
                  <div className="text-center">
                      <Loader className="w-16 h-16 text-green-400 animate-spin mb-4 mx-auto"/>
                      <p className="text-lg font-semibold">Processing Scans...</p>
                      <p className="text-gray-400">This may take a moment.</p>
                  </div>
              )}

              {!isLoading && !result && (
                  <div className="text-center text-gray-500">
                      <BrainCircuit className="w-20 h-20 mx-auto mb-4 opacity-50"/>
                      <p>Your analysis results will appear here.</p>
                  </div>
              )}

              {result && (
                <div className={`w-full p-6 rounded-lg text-white ${result.prediction === 'Tumor Detected' ? 'bg-red-900/50 border-red-500' : 'bg-green-900/50 border-green-500'} border`}>
                  <div className="flex items-center text-2xl font-bold mb-4">
                    {result.prediction === 'Tumor Detected' ? <AlertTriangle className="mr-3 text-red-400"/> : <CheckCircle2 className="mr-3 text-green-400"/>}
                    {result.prediction}
                  </div>
                  <div className="space-y-3 text-sm">
                    <p><span className="font-semibold text-gray-300">Confidence Score:</span> { (result.confidence * 100).toFixed(2) }%</p>
                    <p><span className="font-semibold text-gray-300">Seriousness:</span> {result.seriousness}</p>
                    <p className="pt-3 border-t border-white/10 mt-3"><span className="font-semibold text-gray-300">Details:</span> {result.details}</p>
                  </div>
                  <button
                      onClick={handleReset}
                      className="mt-6 bg-gray-600 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg w-full transition-colors"
                  >
                      Analyze New Scans
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
