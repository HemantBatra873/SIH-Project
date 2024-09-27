import React from "react";

const FileUploadBox = ({ file }) => {
  return (
    <div className="file-upload-box bg-black text-white py-2 px-4 rounded-lg max-w-xs break-words mt-3">
      <p className="bg-black text-white rounded-lg max-w-xs">
        Uploaded Document:
      </p>
      <a
        href={URL.createObjectURL(file)}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline bg-black"
      >
        {file.name}
      </a>
    </div>
  );
};

export default FileUploadBox;
