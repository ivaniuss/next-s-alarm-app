export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-indigo-900 animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-900 to-teal-900 animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }} />
    </div>
  );
}
