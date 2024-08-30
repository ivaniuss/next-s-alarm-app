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
  useMapsLibrary,
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

  function initMap() {
    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer();
    var chicago = new google.maps.LatLng(41.850033, -87.6500523);
    var mapOptions = {
      zoom:7,
      center: chicago
    }
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    directionsRenderer.setMap(map);
  }
  
  function calcRoute() {
    var start = document.getElementById('start').value;
    var end = document.getElementById('end').value;
    var request = {
      origin: start,
      destination: end,
      travelMode: 'DRIVING'
    };
    directionsService.route(request, function(result, status) {
      if (status == 'OK') {
        directionsRenderer.setDirections(result);
      }
    });
  }

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

        <EventInput name="location" placeholder="Location" value={formData.location} onFocus={handleLocationFocus} readOnly={true}/>

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
            defaultZoom={1}
            gestureHandling={'greedy'}
            disableDefaultUI={true}
          >
            <AdvancedMarker ref={markerRef} position={null} />
          </Map>
          <Directions />
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

function Directions() {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsSerive] = useState();
  const [directionsRenderer, setDirectionsRenderer] = useState();
  const [routes, setRoutes] = useState([])
  const [routeIndex, setRouteIndex] = useState(0)
  const selected = routes[routeIndex]
  const leg = selected?.legs[0]

  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsSerive(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
  },[routesLibrary, map])

  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;
    directionsService.route({
      origin: "100 Front St, Toronto ON",
      destination: "500 College St, Toronto ON",
      travelMode: google.maps.TravelMode.DRIVING,
      provideRouteAlternatives: true,
    }).then(response => {
      console.log(response)
      directionsRenderer.setDirections(response)
      setRoutes(response.routes)
    })
  },[directionsService, directionsRenderer])

  useEffect(() => {
    if (!directionsRenderer) return;
    directionsRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionsRenderer])

  if (!leg) return null;
  return (
    <div className='directions'>
      <h2>{selected.summary}</h2>
      <p>
        {leg.start_address.split(",")[0]} to {leg.end_address.split(",")[0]}
      </p>
      <p>Distance: {leg.distance?.text}</p>
      <p>Duration: {leg.duration?.text}</p>

      <h2>Other Routes</h2>
      <ul>
        {routes.map((route, index) => (
          <li key={route.summary}>
            <button onClick={() => setRouteIndex(index)}>
              {route.summary}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}