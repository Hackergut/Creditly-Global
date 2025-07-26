import React, { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Upload,
  File,
  FileText,
  Image,
  X,
  Check,
  AlertCircle } from
"lucide-react";

export default function DocumentUpload({
  onDocumentsChange,
  acceptedTypes = [".pdf", ".jpg", ".jpeg", ".png"],
  requiredDocs = []
}) {
  const [documents, setDocuments] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const handleFiles = async (files) => {
    setUploading(true);

    const validFiles = files.filter((file) => {
      const extension = '.' + file.name.split('.').pop().toLowerCase();
      return acceptedTypes.includes(extension);
    });

    try {
      const uploadPromises = validFiles.map(async (file) => {
        const { file_url } = await UploadFile({ file });
        return {
          name: file.name,
          url: file_url,
          type: file.type,
          size: file.size
        };
      });

      const uploadedDocs = await Promise.all(uploadPromises);
      const newDocuments = [...documents, ...uploadedDocs];

      setDocuments(newDocuments);
      onDocumentsChange(newDocuments);
    } catch (error) {
      console.error("Error uploading files:", error);
    }

    setUploading(false);
  };

  const removeDocument = (index) => {
    const newDocuments = documents.filter((_, i) => i !== index);
    setDocuments(newDocuments);
    onDocumentsChange(newDocuments);
  };

  const getFileIcon = (type) => {
    if (type?.includes('image')) return Image;
    if (type?.includes('pdf')) return FileText;
    return File;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Required Documents List */}
      {requiredDocs.length > 0 &&
      <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-6">
          <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-3 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            Documenti Richiesti
          </h4>
          <ul className="space-y-2">
            {requiredDocs.map((doc, index) =>
          <li key={index} className="flex items-center text-sm text-blue-800 dark:text-blue-300">
                <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mr-3"></div>
                {doc}
              </li>
          )}
          </ul>
        </div>
      }

      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
        dragActive ?
        "border-red-400 dark:border-[#FF453A] bg-red-50 dark:bg-[#FF453A]/10" :
        "border-gray-300 dark:border-slate-600 hover:border-gray-400 dark:hover:border-slate-500"}`
        }
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}>

        <input
          type="file"
          multiple
          accept={acceptedTypes.join(',')}
          onChange={handleFileInput}
          className="hidden"
          id="file-upload" />

        
        <div className="space-y-4">
          <div className="w-16 h-16 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto">
            <Upload className="w-8 h-8 text-gray-400 dark:text-slate-500" />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Trascina i file qui o clicca per selezionare
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Formati supportati: {acceptedTypes.join(', ')}
            </p>
            <label htmlFor="file-upload">
              <Button variant="outline" className="cursor-pointer" asChild>
                <span className="bg-slate-800 text-slate-50 px-4 py-2 text-sm font-medium disabled:opacity- inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-80 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border h-10 border-slate-600 hover:bg-slate-700 hover:text-white rounded-lg">Seleziona File


                </span>
              </Button>
            </label>
          </div>
        </div>
      </div>

      {/* Upload Progress */}
      {uploading &&
      <Card className="border-blue-200 dark:border-blue-800 bg-white dark:bg-[#1E293B]">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 dark:border-blue-400"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-blue-900 dark:text-blue-200">Caricamento in corso...</p>
                <Progress value={75} className="h-2 mt-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      }

      {/* Uploaded Documents */}
      {documents.length > 0 &&
      <div className="space-y-3">
          <h4 className="font-semibold text-gray-900 dark:text-white">
            Documenti caricati ({documents.length})
          </h4>
          
          <div className="space-y-2">
            {documents.map((doc, index) => {
            const FileIcon = getFileIcon(doc.type);
            return (
              <Card key={index} className="border-gray-200 dark:border-slate-700 bg-white dark:bg-[#1E293B]">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-100 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                          <FileIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {doc.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {formatFileSize(doc.size)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-700">
                          <Check className="w-3 h-3 mr-1" />
                          Caricato
                        </Badge>
                        <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeDocument(index)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-500/10 dark:text-red-400 dark:hover:text-red-300">

                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>);

          })}
          </div>
        </div>
      }
    </div>);

}