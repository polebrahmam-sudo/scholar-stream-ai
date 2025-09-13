import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Upload, File, CheckCircle, AlertCircle, X } from "lucide-react";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: "uploading" | "processing" | "completed" | "error";
  progress: number;
  extractedContent?: string;
  keyTopics?: string[];
}

export const FileUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const newFile: UploadedFile = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        status: "uploading",
        progress: 0
      };

      setUploadedFiles(prev => [...prev, newFile]);
      
      // Simulate upload and processing
      simulateFileProcessing(newFile.id);
    });

    toast({
      title: "Files uploaded successfully",
      description: `Processing ${acceptedFiles.length} file(s)...`
    });
  }, [toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'text/plain': ['.txt'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxSize: 10 * 1024 * 1024 // 10MB
  });

  const simulateFileProcessing = async (fileId: string) => {
    // Simulate upload progress
    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setUploadedFiles(prev => 
        prev.map(file => 
          file.id === fileId 
            ? { ...file, progress, status: progress === 100 ? "processing" : "uploading" }
            : file
        )
      );
    }

    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock extracted content and topics
    const mockTopics = ["Mathematics", "Algebra", "Equations", "Problem Solving"];
    
    setUploadedFiles(prev => 
      prev.map(file => 
        file.id === fileId 
          ? { 
              ...file, 
              status: "completed",
              extractedContent: "Sample extracted content from the document...",
              keyTopics: mockTopics
            }
          : file
      )
    );

    toast({
      title: "Document processed",
      description: "AI analysis completed successfully"
    });
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-8">
      {/* Upload Area */}
      <Card className="p-8">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all duration-300 ${
            isDragActive 
              ? 'border-primary bg-primary/5 scale-105' 
              : 'border-muted-foreground/25 hover:border-primary hover:bg-primary/5'
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-2xl font-semibold text-foreground mb-2">
            {isDragActive ? 'Drop your files here' : 'Upload Study Materials'}
          </h3>
          <p className="text-muted-foreground mb-6">
            Drag and drop your PDFs, documents, or notes here, or click to browse
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            <Badge variant="outline">PDF</Badge>
            <Badge variant="outline">DOCX</Badge>
            <Badge variant="outline">TXT</Badge>
            <Badge variant="outline">DOC</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Maximum file size: 10MB
          </p>
        </div>
      </Card>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-foreground mb-6">Processing Files</h3>
          <div className="space-y-4">
            {uploadedFiles.map((file) => (
              <div key={file.id} className="border rounded-lg p-4 bg-gradient-card">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <File className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{file.name}</h4>
                      <p className="text-sm text-muted-foreground">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {file.status === "completed" && (
                      <CheckCircle className="h-5 w-5 text-success" />
                    )}
                    {file.status === "error" && (
                      <AlertCircle className="h-5 w-5 text-destructive" />
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(file.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {(file.status === "uploading" || file.status === "processing") && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {file.status === "uploading" ? "Uploading..." : "Processing..."}
                      </span>
                      <span className="text-muted-foreground">{file.progress}%</span>
                    </div>
                    <Progress value={file.progress} className="h-2" />
                  </div>
                )}

                {file.status === "completed" && file.keyTopics && (
                  <div className="mt-4 p-4 bg-success/5 rounded-lg border border-success/20">
                    <h5 className="font-medium text-success mb-2">AI Analysis Complete</h5>
                    <div className="flex flex-wrap gap-2">
                      {file.keyTopics.map((topic, index) => (
                        <Badge key={index} variant="secondary" className="bg-success/10 text-success">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};