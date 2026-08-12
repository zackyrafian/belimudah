export default function PageLoader() {
  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50">
      <div
        className="h-full bg-[#4F39F6] rounded-full"
        style={{
          animation: 'progress 1.5s ease-in-out infinite',
          transformOrigin: 'left',
        }}
      />
      <style>{`
        @keyframes progress {
          0%   { transform: scaleX(0); margin-left: 0%; }
          50%  { transform: scaleX(0.7); margin-left: 0%; }
          100% { transform: scaleX(0); margin-left: 100%; }
        }
      `}</style>
    </div>
  )
}
