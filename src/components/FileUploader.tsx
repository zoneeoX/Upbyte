import React, { useRef, useState } from "react";
import { IoCloudDownloadOutline } from "react-icons/io5";

const FileUploader = ({ setFile }: any) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      const fileArray = Array.from(files);
      setFile((prev: File[]) => [...prev, ...fileArray]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    const files = event.dataTransfer.files;

    if (files) {
      const fileArray = Array.from(files);
      setFile((prev: File[]) => [...prev, ...fileArray]);
    }
  };

  return (
    <div
      className={`w-full h-[300px] ${
        isDragging ? "bg-blue-100 border-blue-500" : "bg-gray-50"
      } outline-dashed rounded-2xl text-center flex justify-center items-center cursor-pointer transition-all`}
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <h1 className="text-xl opacity-50 flex justify-center items-center flex-col">
        <i className="text-6xl">
          <IoCloudDownloadOutline />
        </i>
        {isDragging
          ? "Drop files here"
          : "Click to upload. You can also drag and drop"}
        <span className="text-sm">Maximum file size: 5 GB.</span>
      </h1>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FileUploader;
