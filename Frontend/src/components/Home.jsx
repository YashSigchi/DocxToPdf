import React from "react";
import { FaFileWord } from "react-icons/fa6";
import axios from "axios";

function Home({ darkMode, setDarkMode }) {
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [convert, setConvert] = React.useState("");
  const [downloadError, setDownloadError] = React.useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setConvert("Please select a file");
      return;
    }
    const formData = new FormData();
    formData.append("file", selectedFile);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/convertFile`,
        formData,
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        selectedFile.name.replace(/\.[^/.]+$/, "") + ".pdf"
      );
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      setSelectedFile(null);
      setDownloadError("");
      setConvert("File Converted Successfully");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setDownloadError("Error occurred: " + error.response.data.message);
      } else {
        setConvert("");
      }
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto container px-6 py-3 md:px-40">
      <div className="flex h-screen items-center justify-center">
        <div
          className={`border-2 border-dashed px-4 py-2 md:px-8 md:py-6 rounded-lg shadow-lg transition-all duration-500 ${
            darkMode ? "border-gray-600 bg-gray-800 text-white" : "border-indigo-400 bg-white text-gray-900"
          }`}
        >
          {/* Dark Mode Toggle */}
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`px-3 py-1 rounded-lg transition-all duration-300 font-bold ${
                darkMode ? "bg-yellow-400 text-black hover:bg-yellow-300" : "bg-gray-800 text-white hover:bg-gray-700"
              }`}
            >
              {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
            </button>
          </div>

          <h1 className="text-3xl font-bold text-center mb-4">Convert Word to PDF Online</h1>
          <p className="text-sm text-center mb-5">
            Easily convert Word documents to PDF format online, without having to install any software.
          </p>

          <div className="flex flex-col items-center space-y-4">
            <input type="file" accept=".doc,.docx" onChange={handleFileChange} className="hidden" id="FileInput" />
            <label
              htmlFor="FileInput"
              className={`w-full flex items-center justify-center px-4 py-6 rounded-lg shadow-lg cursor-pointer transition-all duration-300 border ${
                darkMode
                  ? "bg-gray-700 text-gray-300 border-gray-500 hover:bg-gray-600"
                  : "bg-blue-500 text-white border-blue-300 hover:bg-blue-400"
              }`}
            >
              <FaFileWord className="text-3xl mr-3" />
              <span className="text-2xl mr-2">{selectedFile ? selectedFile.name : "Choose File"}</span>
            </label>

            <button
              onClick={handleSubmit}
              disabled={!selectedFile}
              className={`font-bold px-4 py-2 rounded-lg transition-all duration-300 ${
                selectedFile
                  ? darkMode ? "bg-blue-600 hover:bg-blue-500 text-white" : "bg-blue-500 hover:bg-blue-700 text-white"
                  : "bg-gray-400 text-gray-800 cursor-not-allowed"
              }`}
            >
              Convert File
            </button>

            {convert && <div className="text-green-500 text-center">{convert}</div>}
            {downloadError && <div className="text-red-500 text-center">{downloadError}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

//First start Backend using command npm start after opening 
// (yashsigchi@Daredevil Backend % npm start ) like this

//Than open one more terminal for frontend type command npm run dev like
// )yashsigchi@Daredevil Frontend % npm run dev) this
