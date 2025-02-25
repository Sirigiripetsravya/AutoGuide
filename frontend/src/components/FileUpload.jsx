import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { Button } from './ui/Button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { documents } from '@/lib/api';

export const FileUpload: React.FC = () => {
  const queryClient = useQueryClient();

  const uploadMutation = useMutation({
    mutationFn: (file: File) => documents.upload(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    },
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        uploadMutation.mutate(file);
      }
    },
    [uploadMutation]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors"
    >
      <input {...getInputProps()} />
      <Upload className="mx-auto h-12 w-12 text-gray-400" />
      <p className="mt-4 text-lg font-medium text-gray-900">
        {isDragActive ? 'Drop the files here...' : 'Drag & drop files here'}
      </p>
      <p className="mt-2 text-sm text-gray-500">or</p>
      <Button variant="secondary" className="mt-4">
        Browse Files
      </Button>
      {uploadMutation.isPending && (
        <p className="mt-4 text-sm text-blue-600">Uploading...</p>
      )}
      {uploadMutation.isError && (
        <p className="mt-4 text-sm text-red-600">Upload failed. Please try again.</p>
      )}
    </div>
  );
};