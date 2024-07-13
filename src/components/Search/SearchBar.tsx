"use client";

import { useQuery } from "@tanstack/react-query";
import { Gamepad2, Newspaper, Search,ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect,useState } from "react";
import { useForm } from "react-hook-form";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";

export default function SearchBar() {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const data = [
    { id: "", name: "Location 1" },
    { id: "", name: "Location 2" },
  ];

  const { register, setValue } = useForm({
    defaultValues: { search: "" },
  });

  const [searchText, setSearchText] = useState<string>("");
  const [matchingKeywords, setMatchingKeywords] = useState<string[]>([]);

  const keywords: { name: string; id: string }[] = data ?? [];
  const keywordNames = keywords.map((keyword) => keyword.name);

  useEffect(() => {
    setMatchingKeywords(findMatchingKeywords(searchText, keywordNames));
  }, [searchText]);

  const handleKeywordClick = (keyword: string) => {
    setValue("search", keyword);
    setMatchingKeywords([]);

    const selectedKeyword = keywords.find((kw) => kw.name === keyword);
    if (selectedKeyword) {
      router.push(`/product/${selectedKeyword.id}`);
    }
  };

  return (
    <>
      <Input
        className="h-8 hover:cursor-pointer focus:border-[#E5E7EB] focus:outline-none focus:ring-0"
        type="text"
        autoComplete="off"
        placeholder="Tìm kiếm..."
        onClick={() => setOpen(true)}
      />
      <CommandDialog defaultOpen={false} open={open} onOpenChange={setOpen}>
        <div className="flex flex-row items-center">
          <Search className="ml-4 h-5 w-5" />
          <Input
            {...register("search")}
            autoComplete="off"
            onChange={(e) => setSearchText(e.target.value)}
            className="border-none px-2 focus:outline-none focus:ring-0"
            placeholder="Nhập tên sản phẩm..."
          />
        </div>
        <CommandList>
          <CommandEmpty>Không có kết quả</CommandEmpty>
          <CommandGroup heading="Gợi ý">
            {matchingKeywords?.length > 0 &&
              matchingKeywords.map((item, index) => (
                <CommandItem
                  key={index}
                  onSelect={() => {
                    setOpen(false);
                    handleKeywordClick(item);
                  }}
                >
                  <Gamepad2 className="mr-2 h-4 w-4" />
                  <span>{item}</span>
                </CommandItem>
              ))}
          </CommandGroup>
          <CommandSeparator />
          {matchingKeywords?.length === 0 && (
            <CommandGroup heading="Các trang">
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                }}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                <span>Giỏ hàng</span>
              </CommandItem>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                }}
              >
                <Newspaper className="mr-2 h-4 w-4" />
                <span>Tin tức</span>
              </CommandItem>
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}

function findMatchingKeywords(input: string, keywords: string[]) {
  if (!input.trim()) {
    return [];
  }

  const inputLowerCase = input.toLowerCase();
  const matchingKeywords = keywords.filter((keyword) =>
    keyword.toLowerCase().includes(inputLowerCase)
  );

  return matchingKeywords;
}
