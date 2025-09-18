import { FileText, ImageIcon, Upload, File } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const getFileIcon = (file) => {
  const fileType = file.type.toLowerCase();
  const fileName = file.name.toLowerCase();

  if (fileType.includes("pdf") || fileName.endsWith(".pdf")) {
    return <FileText className="h-8 w-8 text-red-500" />;
  }

  if (fileType.includes("image")) {
    return <ImageIcon className="h-8 w-8 text-blue-500" />;
  }

  if (
    fileType.includes("document") ||
    fileType.includes("msword") ||
    fileType.includes("wordprocessingml") ||
    fileName.endsWith(".doc") ||
    fileName.endsWith(".docx")
  ) {
    return <File className="h-8 w-8 text-blue-600" />;
  }

  return <File className="h-8 w-8 text-gray-500" />;
};

const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return (
    Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  );
};

const FileUploadPreview = ({
  file,
  onFileChange,
  id,
  label,
  accept,
  maxSize,
  required = false,
  description,
}) => {
  const isImage = file && file.type.startsWith("image/");

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <label
        htmlFor={id}
        className="cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors block"
      >
        {file ? (
          <div className="space-y-3">
            {isImage ? (
              <img
                src={URL.createObjectURL(file) || "/placeholder.svg"}
                alt="Selected file"
                className="h-20 w-20 object-cover rounded-lg mx-auto"
              />
            ) : (
              <div className="flex flex-col items-center">
                {getFileIcon(file)}
              </div>
            )}
            <div className="text-sm">
              <p className="font-medium text-gray-700 truncate max-w-xs mx-auto">
                {file.name}
              </p>
              <p className="text-gray-500 text-xs">
                {formatFileSize(file.size)}
              </p>
            </div>
            <p className="text-xs text-blue-600">Click to change file</p>
          </div>
        ) : (
          <div>
            <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
            <p className="text-sm text-gray-600 mb-2">{description}</p>
            <p className="text-xs text-gray-500">{maxSize}</p>
          </div>
        )}
        <Input
          id={id}
          type="file"
          accept={accept}
          className="hidden"
          onChange={onFileChange}
        />
      </label>
    </div>
  );
};
export default FileUploadPreview;
