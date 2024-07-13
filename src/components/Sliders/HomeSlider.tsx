import Slide1 from "@assets/slides/School-1.jpg";
import Slide2 from "@assets/slides/School-2.jpg";
import Slide3 from "@assets/slides/School-3.jpg";
import Slide4 from "@assets/slides/School-4.jpg";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const slideThumbnails = [Slide1, Slide2, Slide3, Slide4];

export default function HomeSlider() {
  return (
    <Carousel className="max-w-[80vw] mx-auto" opts={{ loop: true }}>
      <CarouselPrevious className="xl:hidden" />
      <CarouselContent>
        {slideThumbnails.map((thumbnail, index) => (
          <CarouselItem key={index}>
            <div className="h-[80vh] flex items-center justify-center p-6 relative">
              <Image
                src={thumbnail}
                className="rounded-lg object-cover"
                fill
                alt={`Slide ${index + 1}`}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext className="xl:hidden" />
    </Carousel>
  );
}
