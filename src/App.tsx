import { PiStarFourFill } from "react-icons/pi";
import FileUploader from "./components/FileUploader";
import Card from "./components/Card";
import axios from "axios";
import { useState } from "react";
import UploadedFileCard from "./components/UploadedFileCard";
import { IoCloudDownloadOutline } from "react-icons/io5";

type UploadStatus = "idle" | "uploading" | "success" | "error";

function App() {
  const [file, setFile] = useState<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [progress, setProgress] = useState<number>(0);

  const checkFile = file.length > 0;

  const handleUpload = async () => {
    if (!file.length) return;

    setStatus("uploading");
    setProgress(0);

    const formData = new FormData();
    file.forEach((fileItem) => {
      formData.append("files[]", fileItem);
    });

    try {
      const response = await axios.post(
        "https://up1.fileditch.com/upload.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const bytesUploaded = progressEvent.loaded;
            const totalBytes = progressEvent.total || 1;
            const percentage = (bytesUploaded / totalBytes) * 100;
            setProgress(Math.round(percentage));
          },
        }
      );

      if (response.data.success) {
        setUploadedFiles((prev) => [...prev, ...response.data.files]);
        setFile([]);
        setStatus("success");
      } else {
        console.error("Upload failed");
        setStatus("error");
      }
    } catch (error) {
      console.error("Upload error", error);
      setStatus("error");
    }
  };

  const removeFile = (fileToRemove: File) => {
    setFile((prevFiles) => prevFiles.filter((f) => f !== fileToRemove));
  };

  return (
    <main className="w-screen min-h-screen bg-slate-200 flex justify-center items-center font-normal relative overflow-auto">
      <section className="bg-white w-[50%] min-h-[60%] overflow-auto p-4 pb-6 rounded-2xl relative flex flex-col gap-6 my-10">
        <div className="flex flex-row justify-between items-center">
          <div>
            <h1 className="font-semibold text-2xl">Upload and attach files</h1>
            <p className="opacity-50">Mini-project made by zoneeox.</p>
          </div>
          <i className="text-4xl">
            <PiStarFourFill />
          </i>
        </div>

        <FileUploader setFile={setFile} />
        {checkFile && <h2 className="text-lg font-semibold">Files</h2>}
        {file.map((item, index) => (
          <Card key={index} item={item} removeFile={removeFile} />
        ))}
        {status === "uploading" && (
          <div className="w-full mt-4">
            <div className="w-full bg-gray-300 rounded-full h-4">
              <div
                className="bg-blue-500 h-4 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-1">{progress}%</p>
          </div>
        )}
        <div className="w-full flex items-center flex-row-reverse">
          {checkFile && (
            <button
              className="bg-purple-600 hover:bg-purple-700 transition py-2 px-4 text-white rounded-xl w-fit flex flex-row gap-2 items-center"
              onClick={handleUpload}
              disabled={status === "uploading"}
            >
              <i className="text-lg">
                <IoCloudDownloadOutline />{" "}
              </i>
                {status === "uploading" ? "Uploading..." : "Upload"}
            </button>
          )}
        </div>

        {status === "error" && (
          <p className="text-red-500">Upload failed. Try again.</p>
        )}
        <hr />
        {uploadedFiles.length > 0 && (
          <>
            <h2 className="text-lg font-semibold">Uploaded Files</h2>
            {uploadedFiles.map((fileItem, index) => (
              <UploadedFileCard key={index} item={fileItem} />
            ))}
          </>
        )}
      </section>
    </main>
  );
}

export default App;
