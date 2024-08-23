import { CircleAlert } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { useGetFile } from "@/hooks/react-query/useBucket";

type EventImageProps = {
  bucketId: string;
};

export function EventImage({ bucketId }: EventImageProps) {
  const { data, isSuccess, isLoading, isError } = useGetFile(bucketId);

  if (isLoading) return <Skeleton className="h-[250px] w-full rounded-md object-cover" />;
  if (isError)
    return (
      <div className="grid h-[250px] w-full place-items-center content-center gap-4 rounded-md bg-muted object-cover">
        <CircleAlert className="h-10 w-10 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">There was an error occured</p>
      </div>
    );
  if (isSuccess && data.url)
    return (
      <div className="relative h-[250px] w-full overflow-hidden rounded-md object-cover">
        <img src={data.url} alt={`Image ${bucketId}`} className="size-full object-cover" />
      </div>
    );
  return null;
}
