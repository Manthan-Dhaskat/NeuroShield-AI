export default function Navbar() {
  return (
    <header className="h-16 border-b flex items-center justify-between px-6">
      <h2 className="font-semibold text-lg">
        NeuroShield Dashboard
      </h2>

      <span className="text-sm text-muted-foreground">
        Real-Time AI Monitoring
      </span>
    </header>
  );
}