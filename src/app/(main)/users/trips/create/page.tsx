import { Card, CardContent,CardHeader } from "@components/ui/card";

import CreateForm from "./Components/CreateForm";

export default async function page() {
  return (
    <div className="flex min-h-[calc(100vh_-_6rem)] flex-col gap-2 px-4 pb-4 sm:px-2 sm:pb-2">
      <h1 className="my-2 text-2xl font-medium">
        Create trip for phone customer
      </h1>
      <div className="flex w-full flex-row gap-4 lg:flex-col sm:gap-2">
        <Card className="h-fit w-full">
          <CardHeader className="pb-3">Enter trip information</CardHeader>
          <CardContent>
            <CreateForm />
          </CardContent>
        </Card>
        <Card className="h-fit w-full">
          <CardHeader className="pb-3">Map</CardHeader>
          <CardContent className="p-2">
            <iframe
              title="Google Maps"
              width="100%"
              height="690px"
              loading="lazy"
              allowFullScreen
              className="rounded-md"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d930675.8275413112!2d105.32405856359039!3d21.02776387246799!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab4b5a9b5f1b%3A0x54fbdddfab9c85c2!2zVmnhu4d0IE5hbQ!5e0!3m2!1sen!2s!4v1649589435091!5m2!1sen!2s"
            ></iframe>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
