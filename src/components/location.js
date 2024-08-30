"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function Location() {
  const [location, setLocation] = useState(null)
  
  const getLocation = () => {
    if (navigator.geolocation) {
      console.log('asfasdfs',navigator)
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setLocation({ latitude, longitude })
        },
        (error) => {
          console.error("Error getting location:", error)
          alert("Error getting location. Please try again.")
        },
      )
    } else {
      console.error("Geolocation is not supported by this browser.")
      alert("Geolocation is not supported by this browser.")
    }
  }
  
  return (
      <div>
        {location ? (
          <div className="space-y-2">
            <div>
              <span className="font-medium">Latitude:</span> {location.latitude}
            </div>
            <div>
              <span className="font-medium">Longitude:</span> {location.longitude}
            </div>
          </div>
        ) : (
          <div className="text-center text-muted-foreground">Click the button</div>
        )}
        <Button onClick={getLocation} className='text-center w-full m-auto' >Get Location</Button>
      </div>
  )
}