'use client'
import { useEffect } from 'react';

const GoogleMapsLoader = ({ apiKey, version }) => {
  useEffect(() => {
    const loadGoogleMaps = () => {
      const script = document.createElement('script');
      const params = new URLSearchParams();
      params.set('key', apiKey);
      params.set('v', version);
      params.set('libraries', 'places'); // Incluye las bibliotecas que necesites

      script.src = `https://maps.googleapis.com/maps/api/js?${params.toString()}`;
      script.async = true;
      script.defer = true;

      script.onload = () => {
        console.log('Google Maps API loaded successfully');
      };

      script.onerror = () => {
        console.error('Failed to load Google Maps API');
      };

      document.head.appendChild(script);
    };

    loadGoogleMaps();

    return () => {
      const existingScript = document.querySelector(`script[src*="maps.googleapis.com"]`);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [apiKey, version]);

  return null;
};

export default GoogleMapsLoader;
