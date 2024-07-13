import {
  ArrowDownWideNarrow,
  CheckCheck,
  RefreshCcwDot,
  StepForward,
  WrapText,
} from "lucide-react";
import { useEditor } from "novel";
import { getPrevText } from "novel/extensions";
import React from "react";

import { CommandGroup, CommandItem, CommandSeparator } from "../ui/command";

const options = [
  {
    value: "improve",
    label: "Cải thiện bài viết",
    icon: RefreshCcwDot,
  },

  {
    value: "fix",
    label: "Sửa lỗi chính tả",
    icon: CheckCheck,
  },
  {
    value: "shorter",
    label: "Tóm tắt lại",
    icon: ArrowDownWideNarrow,
  },
  {
    value: "longer",
    label: "Viết dài hơn",
    icon: WrapText,
  },
];

interface AISelectorCommandsProps {
  onSelect: (value: string, option: string) => void;
}

const AISelectorCommands = ({ onSelect }: AISelectorCommandsProps) => {
  const { editor } = useEditor();

  return (
    <>
      <CommandGroup heading="Chỉnh sửa">
        {options.map((option) => (
          <CommandItem
            onSelect={(value) => {
              const slice = editor?.state.selection.content();
              const text = editor?.storage.markdown.serializer.serialize(
                slice?.content
              );
              onSelect(text, value);
            }}
            className="flex gap-2 px-4"
            key={option.value}
            value={option.value}
          >
            <option.icon className="h-4 w-4 text-purple-500" />
            {option.label}
          </CommandItem>
        ))}
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="Hỏi AI">
        <CommandItem
          onSelect={() => {
            if (editor) {
              const text = getPrevText(editor, { chars: 5000 });
              onSelect(text, "continue");
            }
          }}
          value="continue"
          className="gap-2 px-4"
        >
          <StepForward className="h-4 w-4 text-purple-500" />
          Viết tiếp
        </CommandItem>
      </CommandGroup>
    </>
  );
};

export default AISelectorCommands;
