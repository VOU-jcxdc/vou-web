"use client";
import { CircleAlert } from "lucide-react";
import Image from "next/image";

import { Skeleton } from "@/components/ui/skeleton";
import { useGetFile } from "@/hooks/react-query/useBucket";

type EventImageProps = {
  bucketId: string;
};

export function EventImage({ bucketId }: EventImageProps) {
  const { data, isSuccess, isLoading, isError } = useGetFile(bucketId);
  if (isLoading)
    return <Skeleton className="rounded-md w-full h-[250px] object-cover" />;
  if (isError)
    return (
      <div className="bg-muted rounded-md w-full h-[250px] object-cover grid place-items-center gap-4 content-center">
        <CircleAlert className="text-muted-foreground w-10 h-10" />
        <p className="text-sm text-muted-foreground">
          There was an error occured
        </p>
      </div>
    );
  if (isSuccess && data.url)
    return (
      <Image
        className="rounded-md w-full max-h-[250px] object-cover"
        src={data.url}
        alt={`Image ${bucketId}`}
        width={200}
        height={250}
      />
    );
  return null;
}
