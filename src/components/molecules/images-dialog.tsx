import DropAndDragZone from "@/components/File/DropAndDragZone";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import useFiles from "@/hooks/zustand/useFiles";

type ImagesDialogProps = {
  onUpload: (files: File[]) => void;
  title: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function ImagesDialog({
  onUpload,
  title,
  open,
  onOpenChange,
}: ImagesDialogProps) {
  const { files, clearFiles } = useFiles();
  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          clearFiles();
        }
        onOpenChange(open);
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline">{title}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>{title}</DialogHeader>
        <DropAndDragZone maxFiles={3} />
        <DialogFooter className="flex flex-row gap-4 justify-end">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={() => onUpload(files)} disabled={files.length === 0}>
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
