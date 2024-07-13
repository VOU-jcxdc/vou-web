"use client";

import Image from "next/image";

export default function ImageFileItem({
  image,
  name,
  removeHandler,
}: {
  image: string;
  name: string;
  removeHandler: () => void;
}) {
  return (
    <div className="group w-full overflow-hidden hover:cursor-pointer">
      <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-lg border p-0.5">
        <Image
          src={image}
          alt="Product image"
          width={75}
          height={75}
          className="max-h-[90%] max-w-[90%] object-contain"
        />
        <div className="absolute left-0 top-0 hidden h-full w-full items-center justify-center bg-foreground/20 group-hover:flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#FFFFFF"
            onClick={removeHandler}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      </div>
      <span className="mt-0.5 line-clamp-1 block h-4 overflow-ellipsis px-1 text-[12px]">
        {name}
      </span>
    </div>
  );
}
