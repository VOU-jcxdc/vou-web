import { Check, TextQuote, TrashIcon } from "lucide-react";
import { useEditor } from "novel";
import React from "react";

import { CommandGroup, CommandItem, CommandSeparator } from "../ui/command";

const AICompletionCommands = ({
  completion,
  onDiscard,
}: {
  completion: string;
  onDiscard: () => void;
}) => {
  const { editor } = useEditor();
  return (
    <>
      <CommandGroup>
        <CommandItem
          className="gap-2 px-4"
          value="replace"
          onSelect={() => {
            const selection = editor?.view.state.selection;

            editor
              ?.chain()
              .focus()
              .insertContentAt(
                {
                  from: selection?.from ?? 0,
                  to: selection?.to ?? 0,
                },
                completion
              )
              .run();
          }}
        >
          <Check className="text-muted-foreground h-4 w-4" />
          Thay thế nội dung
        </CommandItem>
        <CommandItem
          className="gap-2 px-4"
          value="insert"
          onSelect={() => {
            const selection = editor?.view.state.selection;
            editor
              ?.chain()
              .focus()
              .insertContentAt(selection?.to ?? 0 + 1, completion)
              .run();
          }}
        >
          <TextQuote className="text-muted-foreground h-4 w-4" />
          Thêm bên dưới
        </CommandItem>
      </CommandGroup>
      <CommandSeparator />

      <CommandGroup>
        <CommandItem onSelect={onDiscard} value="thrash" className="gap-2 px-4">
          <TrashIcon className="text-muted-foreground h-4 w-4" />
          Bỏ qua
        </CommandItem>
      </CommandGroup>
    </>
  );
};

export default AICompletionCommands;
