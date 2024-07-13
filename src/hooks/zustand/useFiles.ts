import { create } from "zustand";

import { FileWithPreview } from "@/types";

interface useFilesState {
  files: FileWithPreview[];
  saveFiles: (newFiles: FileWithPreview[]) => void;
  clearFiles: () => void;
}

const useFiles = create<useFilesState>((set) => ({
  files: [],
  saveFiles: (newFiles: FileWithPreview[]) => set({ files: newFiles }),
  clearFiles: () => set({ files: [] }),
}));

export default useFiles;
