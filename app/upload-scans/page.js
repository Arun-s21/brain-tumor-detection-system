"use client";
import { useState } from "react";
import Link from 'next/link';
import FileUpload from "../Component/FileUpload"; // Adjust path if needed
import { BrainCircuit, AlertTriangle, CheckCircle2, Loader, ArrowLeft } from 'lucide-react';

export default function UploadPage() {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  // --- YOUR API CALL LOGIC IS PRESERVED HERE ---
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
        let errorMessage = `Server error: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          // ignore JSON parse error
        }
        throw new Error(errorMessage);
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
    // Set the background color on the main wrapper
    <div className="min-h-screen w-full bg-black text-white p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>

        {/* Main content card with corrected styling */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div className="text-center mb-10">
            <h1 className="text-4xl sm:text-5xl font-bold text-white">
              Upload Scans for Analysis
            </h1>
            <p className="text-gray-400 mt-2">Our AI will process the images and provide a preliminary analysis.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {/* Left Column: Form */}
            <div className="md:col-span-2 bg-gray-900/70 p-6 rounded-xl border border-gray-700">
              <form onSubmit={handleSubmit}>
                <FileUpload files={files} setFiles={setFiles} />
                <button
                  type="submit"
                  disabled={isLoading || files.length === 0}
                  className="w-full mt-8 py-3 px-6 rounded-lg font-semibold text-white transition-colors flex items-center justify-center
                             bg-green-800 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
                >
                  {isLoading ? <><Loader className="animate-spin mr-2" /> Analyzing...</> : "Run Analysis"}
                </button>
              </form>
            </div>

            {/* Right Column: Results */}
            <div className="md:col-span-3 bg-gray-900/70 p-6 rounded-xl border border-gray-700 flex flex-col min-h-[400px]">
              <h2 className="text-2xl font-bold mb-6 flex items-center self-start text-gray-300"><BrainCircuit className="mr-3 text-green-400" /> Analysis Result</h2>

              <div className="flex-grow flex flex-col items-center justify-center">
                {isLoading && (
                  <div className="text-center">
                    <Loader className="w-16 h-16 text-green-400 animate-spin mb-4 mx-auto" />
                    <p className="text-lg font-semibold">Processing Scans...</p>
                  </div>
                )}

                {!isLoading && !result && (
                  <div className="text-center text-gray-500">
                    <BrainCircuit className="w-20 h-20 mx-auto mb-4 opacity-50" />
                    <p>Your analysis results will appear here.</p>
                  </div>
                )}
              </div>

              {result && (
                <div className={` p-6 rounded-lg ${result.prediction === 'Tumor Detected' ? 'bg-red-900/50 border-red-500' : 'bg-green-900/50 border-green-500'} border`}>
                  <div className="flex items-center text-2xl font-bold mb-4">
                    {result.prediction === 'Tumor Detected' ? <AlertTriangle className="mr-3 text-red-400" /> : <CheckCircle2 className="mr-3 text-green-400" />}
                    {result.prediction}
                  </div>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-semibold text-gray-300">Confidence Score:</span> {result.confidence ? (result.confidence * 100).toFixed(2) + '%' : 'N/A'}</p>
                    <p><span className="font-semibold text-gray-300">Seriousness:</span> {result.seriousness || 'N/A'}</p>
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
