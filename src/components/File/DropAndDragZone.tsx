"use client";

import ImageFileItem from "@components/File/ImageFileItem";
import { Button } from "@components/ui/button";
import { Upload } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

import useFiles from "@/hooks/zustand/useFiles";
import { FileWithPreview } from "@/types";

interface RejectedFile {
  file: File;
  errors: { code: string; message: string }[];
}

const DropAndDragZone = ({
  className,
  maxFiles,
}: {
  className: string;
  maxFiles?: number;
}) => {
  const { saveFiles } = useFiles();

  const maxFilesNumber = maxFiles ?? 10;

  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [rejected, setRejected] = useState<RejectedFile[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: RejectedFile[]) => {
      if (acceptedFiles?.length) {
        if (files.length + acceptedFiles.length > maxFilesNumber) {
          toast.error(`Chỉ được tải lên tối đa ${maxFilesNumber} file.`);
          return;
        }

        setFiles((previousFiles) =>
          previousFiles.concat(
            acceptedFiles.map((file) =>
              Object.assign(file, { preview: URL.createObjectURL(file) })
            )
          )
        );
      }

      if (fileRejections?.length) {
        setRejected((previousFiles) =>
          previousFiles.concat(
            fileRejections.map(({ file, errors }) => ({
              file,
              errors: errors.map((error) => ({
                code: error.code,
                message: "File quá lớn",
              })),
            }))
          )
        );
      }
    },
    [files, maxFilesNumber]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxSize: 5120 * 1000,
    maxFiles: maxFilesNumber,
    onDrop,
  });

  useEffect(() => {
    return () => {
      files.forEach((file) => {
        URL.revokeObjectURL(file.preview);
      });
    };
  }, [files]);

  useEffect(() => {
    saveFiles(files);
  }, [files, saveFiles]);

  const removeFile = (name: string) => {
    setFiles((files) => files.filter((file) => file.name !== name));
  };

  const removeAll = () => {
    setFiles([]);
    setRejected([]);
  };

  const removeRejected = (name: string) => {
    setRejected((files) => files.filter(({ file }) => file.name !== name));
  };

  const action = async () => {
    const file = files[0];
    if (!file) return;
  };

  return (
    <form action={action} className="h-fit w-full">
      <div
        {...getRootProps({
          className: className,
        })}
      >
        <input className="" {...getInputProps({ name: "file" })} />
        <div className="flex w-full flex-col items-center justify-center gap-4">
          <Upload className="h-5 w-5" />
          {isDragActive ? (
            <p>Kéo thả hoặc chọn file ở đây</p>
          ) : (
            <p>Kéo thả hoặc chọn file ở đây</p>
          )}
        </div>
      </div>

      {/* Preview */}
      <section className="mb-4 mt-6">
        {/* Accepted files */}
        {files?.length > 0 && (
          <>
            <h3 className="title mt-6 border-b text-sm">Thêm thành công</h3>
            <div className="mt-4 grid w-fit grid-cols-6 gap-3 sm:grid-cols-4">
              {files.map((file) => (
                <ImageFileItem
                  key={file.name}
                  image={file.preview}
                  name={file.name}
                  removeHandler={() => removeFile(file.name)}
                />
              ))}
            </div>
          </>
        )}

        {/* Rejected Files */}
        {rejected?.length > 0 && (
          <>
            <h3 className="title mt-6 border-b text-sm">Thêm thất bại</h3>
            <ul className="mt-3 flex flex-col">
              {rejected.map(({ file, errors }) => (
                <li
                  key={file.name}
                  className="flex items-start justify-between"
                >
                  <div>
                    <p className="text-sm font-medium text-stone-500">
                      {file.name}
                    </p>
                    <ul className="text-[12px] text-red-400">
                      {errors.map((error) => (
                        <li key={error.code}>{error.message}</li>
                      ))}
                    </ul>
                  </div>
                  <Button
                    className="h-9 border-none text-sm"
                    variant="outline"
                    onClick={() => removeRejected(file.name)}
                  >
                    Xóa
                  </Button>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </form>
  );
};

export default DropAndDragZone;
