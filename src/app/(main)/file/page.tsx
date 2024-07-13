import DropAndDragZone from "@/components/File/DropAndDragZone";
export default function File() {
  return (
    <>
      <div className="flex h-fit min-h-screen w-screen flex-col items-center gap-4 px-3">
        <h1 className="mt-4 text-2xl font-bold">Files uploading</h1>
        <div className="h-fit w-[700px] sm:w-full">
          <DropAndDragZone
            className="rounded-lg border border-foreground/10 p-16"
            maxFiles={5}
          />
        </div>
      </div>
    </>
  );
}
