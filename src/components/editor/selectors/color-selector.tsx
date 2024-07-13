import { Check, ChevronDown } from "lucide-react";
import { EditorBubbleItem, useEditor } from "novel";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface BubbleColorMenuItem {
  name: string;
  color: string;
}

const TEXT_COLORS: BubbleColorMenuItem[] = [
  {
    name: "Mặc định",
    color: "var(--novel-black)",
  },
  {
    name: "Màu tím",
    color: "#9333EA",
  },
  {
    name: "Màu đỏ",
    color: "#E00000",
  },
  {
    name: "Màu vàng",
    color: "#EAB308",
  },
  {
    name: "Xanh dương",
    color: "#2563EB",
  },
  {
    name: "Xanh lá",
    color: "#008A00",
  },
  {
    name: "Màu cam",
    color: "#FFA500",
  },
  {
    name: "Màu hồng",
    color: "#BA4081",
  },
  {
    name: "Màu xám",
    color: "#A8A29E",
  },
];

const HIGHLIGHT_COLORS: BubbleColorMenuItem[] = [
  {
    name: "Mặc định",
    color: "var(--novel-black)",
  },
  {
    name: "Màu tím",
    color: "#9333EA",
  },
  {
    name: "Màu đỏ",
    color: "#E00000",
  },
  {
    name: "Màu vàng",
    color: "#EAB308",
  },
  {
    name: "Xanh dương",
    color: "#2563EB",
  },
  {
    name: "Xanh lá",
    color: "#008A00",
  },
  {
    name: "Màu cam",
    color: "#FFA500",
  },
  {
    name: "Màu hồng",
    color: "#BA4081",
  },
  {
    name: "Màu xám",
    color: "#A8A29E",
  },
];

interface ColorSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ColorSelector = ({ open, onOpenChange }: ColorSelectorProps) => {
  const { editor } = useEditor();

  if (!editor) return null;
  const activeColorItem = TEXT_COLORS.find(({ color }) =>
    editor.isActive("textStyle", { color })
  );

  const activeHighlightItem = HIGHLIGHT_COLORS.find(({ color }) =>
    editor.isActive("highlight", { color })
  );

  return (
    <Popover modal={true} open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button size="sm" className="gap-2 rounded-none" variant="ghost">
          <span
            className="rounded-sm px-1"
            style={{
              color: activeColorItem?.color,
              backgroundColor: activeHighlightItem?.color,
            }}
          >
            A
          </span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        sideOffset={5}
        className="my-1 flex max-h-80 w-48 flex-col overflow-hidden overflow-y-auto rounded border p-1 shadow-xl "
        align="start"
      >
        <div className="flex flex-col">
          <div className="text-muted-foreground my-1 px-2 text-sm font-semibold">
            Màu sắc
          </div>
          {TEXT_COLORS.map(({ name, color }, index) => (
            <EditorBubbleItem
              key={index}
              onSelect={() => {
                editor.commands.unsetColor();
                name !== "Mặc định" &&
                  editor
                    .chain()
                    .focus()
                    .setColor(color || "")
                    .run();
              }}
              className="flex cursor-pointer items-center justify-between px-2 py-1 text-sm hover:bg-accent"
            >
              <div className="flex items-center gap-2">
                <div
                  className="rounded-sm border px-2 py-px font-medium"
                  style={{ color }}
                >
                  A
                </div>
                <span>{name}</span>
              </div>
            </EditorBubbleItem>
          ))}
        </div>
        <div>
          <div className="text-muted-foreground my-1 px-2 text-sm font-semibold">
            Màu nền
          </div>
          {HIGHLIGHT_COLORS.map(({ name, color }, index) => (
            <EditorBubbleItem
              key={index}
              onSelect={() => {
                editor.commands.unsetHighlight();
                name !== "Default" && editor.commands.setHighlight({ color });
              }}
              className="flex cursor-pointer items-center justify-between px-2 py-1 text-sm hover:bg-accent"
            >
              <div className="flex items-center gap-2">
                <div
                  className="rounded-sm border px-2 py-px font-medium"
                  style={{ backgroundColor: color }}
                >
                  A
                </div>
                <span>{name}</span>
              </div>
              {editor.isActive("highlight", { color }) && (
                <Check className="h-4 w-4" />
              )}
            </EditorBubbleItem>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
