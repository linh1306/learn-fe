export function Loading() {
  return (
    <div className="flex relative w-6 space-x-1 items-end overflow-hidden h-4">
      <div className="h-10 animate-bounce [animation-delay:-0.3s] flex items-end">
        <div className="w-1 h-1 bg-black rounded-full"></div>
      </div>
      <div className="h-10 animate-bounce [animation-delay:-0.15s] flex items-end">
        <div className="w-1 h-1 bg-black rounded-full"></div>
      </div>
      <div className="h-10 animate-bounce flex items-end">
        <div className="w-1 h-1 bg-black rounded-full"></div>
      </div>
    </div>
  );
}
