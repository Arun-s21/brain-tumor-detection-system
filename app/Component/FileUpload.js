"use client";

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, X, FileText } from 'lucide-react';

const FileUpload = ({ files, setFiles }) => {
  const onDrop = useCallback((acceptedFiles) => {
    const newFiles = acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    }));
    setFiles(prevFiles => [...prevFiles, ...newFiles].slice(0, 5)); // Limit to 5 files
  }, [setFiles]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/dicom': ['.dcm'],
    },
    maxFiles: 5,
  });

  const removeFile = (fileToRemove, e) => {
    e.stopPropagation();
    setFiles(files.filter(file => file !== fileToRemove));
    URL.revokeObjectURL(fileToRemove.preview);
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={` p-6 border-2 border-dashed rounded-xl cursor-pointer transition-colors duration-300 text-center
        ${isDragActive ? 'border-green-600 bg-green-50' : 'border-gray-300 hover:border-green-500 bg-white'}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center">
          <UploadCloud className="w-12 h-12 text-gray-400 mb-3" />
          <p className="text-gray-700 font-semibold">
            Drag & drop files here, or <span className="text-green-600">browse</span>
          </p>
          <p className="text-xs text-gray-500 mt-1">Supports: PNG, JPG, DICOM (Max 5)</p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file) => (
            <div key={file.path} className="flex items-center justify-between bg-white p-2 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3 overflow-hidden">
                <img src={file.preview} alt="preview" className="w-10 h-10 rounded-md object-cover flex-shrink-0" />
                <span className="text-sm text-gray-700 truncate">{file.name}</span>
              </div>
              <button
                onClick={(e) => removeFile(file, e)}
                className="p-1.5 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors flex-shrink-0"
              >
                <X size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
