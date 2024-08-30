import { useState, useEffect, useRef } from 'react';
import {
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { Input } from './ui/input';
import { Button } from './ui/button';
export default function PlaceAutocomplete({ onPlaceSelect, onBack, onClick }) {
  const [placeAutocomplete, setPlaceAutocomplete] = useState(null);
  const inputRef = useRef(null);
  const places = useMapsLibrary("places");
  
  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ["geometry", "name", "formatted_address"],
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);
  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener("place_changed", () => {
      onPlaceSelect(placeAutocomplete.getPlace());
    });
  }, [onPlaceSelect, placeAutocomplete]);

  const handleClear = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleConfirm = () => {
    if (placeAutocomplete) {
      onPlaceSelect(placeAutocomplete.getPlace());
    }
  };

  return (
    <div className="flex items-center w-full max-w-md mx-auto bg-background rounded-lg shadow-lg">
      <div className="relative flex-1 flex items-center">
        <button type="button" className="ml-2 p-2 text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
        <Input
          ref={inputRef}
          type="search"
          id='location'
          name='location'
          placeholder='Enter a Location...'
          // className="bg-gray-900 bg-opacity-50 max-w text-white placeholder-gray-500 border-gray-700 focus:border-teal-500 transition-all duration-300 hover:bg-opacity-70"
          className="w-full px-4 py-3 text-sm rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
        >
        </Input>
        <Button className="rounded-r-lg px-4 py-3 text-sm font-medium" onClick={onClick}>
          <CheckIcon className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
function ArrowLeftIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  )
}


function CheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}