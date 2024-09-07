import { Button } from "@components/ui/button";
import { Trash, Upload } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

import useFiles from "@/hooks/zustand/useFiles";
import { cn } from "@/lib/utils";
import { FileWithPreview } from "@/types";

interface RejectedFile {
  file: File;
  errors: { code: string; message: string }[];
}

const DropAndDragZoneGeneralFile = ({
  className,
  maxFiles,
}: {
  className?: string;
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
            acceptedFiles.map((file) => Object.assign(file, { preview: URL.createObjectURL(file) }))
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
      ".csv": [],
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

  // const removeFile = (name: string) => {
  //   setFiles((files) => files.filter((file) => file.name !== name));
  // };

  // const removeAll = () => {
  //   setFiles([]);
  //   setRejected([]);
  // };

  const removeRejected = (name: string) => {
    setRejected((files) => files.filter(({ file }) => file.name !== name));
  };

  return (
    <form className="h-fit w-full">
      <div {...getRootProps({ className })}>
        <input className="" {...getInputProps({ name: "file" })} />
        <div
          className={cn(
            "flex min-h-40 w-full flex-col items-center justify-center gap-2 rounded border border-dashed hover:cursor-pointer hover:border-primary/80 hover:bg-primary/10",
            isDragActive ? "border-primary/80 bg-primary/10" : ""
          )}
        >
          <Upload className="h-5 w-5" />
          <p>Kéo thả hoặc chọn file ở đây</p>
        </div>
      </div>

      {/* Preview */}
      <section className="mb-4 mt-6">
        {/* Accepted files */}
        {files?.length > 0 && (
          <div className="mt-4 flex w-fit flex-col gap-3 sm:grid-cols-4">
            {files.map((file) => (
              <div className="inline-flex items-center">
                {file.name}
                <Button
                  variant="ghost"
                  className="text-destructive"
                  onClick={() => {
                    setFiles((files) => files.filter((f) => f.name !== file.name));
                  }}
                >
                  <Trash size={20} />
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Rejected Files */}
        {rejected?.length > 0 && (
          <>
            <h3 className="title mt-6 border-b text-sm">Thêm thất bại</h3>
            <ul className="mt-3 flex flex-col">
              {rejected.map(({ file, errors }) => (
                <li key={file.name} className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-stone-500">{file.name}</p>
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

export default DropAndDragZoneGeneralFile;
