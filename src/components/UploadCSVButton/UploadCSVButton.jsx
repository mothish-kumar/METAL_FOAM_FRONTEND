import React, { useRef, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { toast } from 'sonner';

const UploadCSVButton = ({onUploadSuccess}) => {
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleButtonClick = () => {
    fileInputRef.current.click(); // Trigger file input
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    if (file.type !== "text/csv") {
      toast.error("Please select a CSV file only.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsUploading(true);
      const response = await axiosInstance.post("/admin/upload-csv", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        toast.success(response.data.message || "CSV uploaded successfully!");
        onUploadSuccess()
        console.log("Transaction Result:", response.data.transactionResult);
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Upload Error:", error);
      toast.error(error.response?.data?.error || "Failed to upload CSV.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <button
        className="px-3"
        style={{
          backgroundColor: isUploading ? "#B0B0B0" : "#FF710C",
          color: "white",
          borderRadius: "40px",
          padding: "10px",
          cursor: isUploading ? "not-allowed" : "pointer",
        }}
        onClick={handleButtonClick}
        disabled={isUploading}
      >
        {isUploading ? "Uploading..." : "Upload CSV"}
      </button>

      {/* Hidden file input */}
      <input
        type="file"
        accept=".csv"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </>
  );
};

export default UploadCSVButton;
