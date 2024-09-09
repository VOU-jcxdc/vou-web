import React, { useEffect, useRef, useState } from "react";
import { useMapsLibrary, useMap } from "@vis.gl/react-google-maps";
import { Input } from "@/components/ui/input"; // Assuming you're using ShadCN's Input component
import { Button } from "@/components/ui/button"; // Assuming you're using ShadCN's Button component
import { X } from "lucide-react";

interface AutocompleteProps {
  onPlaceSelect: (place: google.maps.places.PlaceResult) => void;
  onClear?: () => void;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

export default function PlaceAutocomplete({
  onPlaceSelect,
  onClear,
  inputProps,
}: AutocompleteProps) {
  const [placeAutocomplete, setPlaceAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const [geocoder, setGeocoder] = useState<google.maps.Geocoder | null>(null);
  const [inputValue, setInputValue] = useState(inputProps?.defaultValue ?? "");
  const places = useMapsLibrary("places");
  const map = useMap();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!places || !inputRef.current) return;
    const options = {
      fields: ["geometry", "name", "formatted_address"],
    };
    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
    setGeocoder(new google.maps.Geocoder());
    console.log("Call");
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;
    placeAutocomplete.addListener("place_changed", () => {
      const place = placeAutocomplete.getPlace();
      if (place.formatted_address) {
        setInputValue(place.formatted_address);
        if (place.geometry && place.geometry.location) {
          // Recenter the map based on the selected place
          map?.panTo(place.geometry.location);
          map?.setZoom(15); // Set a default zoom level
        }
      } else {
        geocoder?.geocode({ address: place.name }, (results, status) => {
          if (status === "OK" && results && results[0]) {
            setInputValue(results[0].formatted_address);
            onPlaceSelect(results[0]);
          }
        });
      }
      onPlaceSelect(place);
    });
  }, [onPlaceSelect, placeAutocomplete]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleClear = () => {
    setInputValue("");
    onClear?.();
  };

  return (
    <div className="relative">
      <Input
        {...inputProps}
        value={inputValue}
        onChange={handleChange}
        ref={inputRef}
        className={"w-full py-2 pl-4 pr-0"}
      />
      {Boolean(inputValue) && (
        <Button
          variant="ghost"
          className="absolute right-2 top-1/2 -translate-y-1/2 transform"
          onClick={handleClear}
        >
          <X className="h-5 w-5 text-gray-500" />
        </Button>
      )}
    </div>
  );
}
