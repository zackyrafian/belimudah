
export default function Card ({children, className="", ...props}) { 
  return ( 
    <div className={`bg-white border p-4 rounded-xl border-black/20 ${className}`} {...props}>
      {children}
    </div>
  )
}
