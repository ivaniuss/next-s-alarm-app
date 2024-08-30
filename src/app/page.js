
import AnimatedBackground from '@/components/animatedBackground'
import EventForm from '@/components/eventForm'
import Location from '@/components/location'

export default function Home() {

  return (
    <div className="min-h-screen flex items-center justify-center bg-black overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-20 w-full max-w-md">
        <Location />
        <EventForm />
      </div>
    </div>
  )
}
