'use client'
import { useState, useEffect, useRef } from 'react';
import EventInput from './event/eventInput';
import TimeSelector from './timeSelector';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation'

import {
  APIProvider,
  ControlPosition,
  MapControl,
  AdvancedMarker,
  Map,
  useMap,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import PlaceAutocomplete from './placeAutocomplete';

export default function EventForm() {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [isExpanded, setIsExpanded] = useState(false)

  const router = useRouter()

  const [formData, setFormData] = useState({
    eventName: '',
    location: '',
    hour: '',
    minute: ''
  });

  const handleBack = () => {
    router.back(); // Navigate back to the previous page
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleTimeChange = (type, value) => {
    setFormData({ ...formData, [type]: value })
  }

  const handleLocationFocus = () => {
    setIsExpanded(true)
  }

  const handleRecommendationClick = () => {
    setFormData({ ...formData, ['location']: selectedPlace.name })
    setIsExpanded(false)
  }

  const MapHandler = ({ place, marker }) => {
    const map = useMap();
  
    useEffect(() => {
      if (!map || !place || !marker) return;
  
      if (place.geometry?.viewport) {
        map.fitBounds(place.geometry?.viewport);
      }
  
      marker.position = place.geometry?.location;
    }, [map, place, marker]);
    return null;
  };  

  return (
    <form 
      onSubmit={handleSubmit} 
      className="bg-black bg-opacity-30 backdrop-blur-xl rounded-lg shadow-2xl p-8 space-y-6 border border-gray-800"
    >
      <div className={`space-y-4 transition-all duration-500 ease-in-out ${
        isExpanded ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}>
        <h2 
          className="text-3xl font-bold text-center text-white mb-6"
        >Deep Space Event Planner</h2>
        <EventInput name="eventName" placeholder="Event Name" value={formData.eventName} onChange={handleChange} />

        <EventInput name="location" placeholder="Location" value={formData.location} onFocus={handleLocationFocus} />

        <TimeSelector handleTimeChange={handleTimeChange} />
        <Button
          type="submit" 
          className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white transition-all duration-300 transform hover:scale-105">
              Initiate Cosmic Journey
        </Button>
      </div>
      <div className={`absolute inset-0 transition-all duration-500 ${
        isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <APIProvider
          apiKey={process.env.NEXT_PUBLIC_PLACES_API_KEY}
          solutionChannel="GMP_devsite_samples_v3_rgmautocomplete"
        >
          <Map
            mapId={"bf51a910020fa25a"}
            defaultCenter={{lat: 22.54992, lng: 0}}
            gestureHandling={'greedy'}
            disableDefaultUI={true}
          >
            <AdvancedMarker ref={markerRef} position={null} />
          </Map>
          <MapControl position={ControlPosition.TOP}>
            <div className="pt-4 w-full">
              <PlaceAutocomplete onPlaceSelect={setSelectedPlace} onBack={handleBack} onClick={handleRecommendationClick} />
            </div>
          </MapControl>
          <MapHandler place={selectedPlace} marker={marker} />
        </APIProvider>
        
      </div>
    </form>
  );
}
