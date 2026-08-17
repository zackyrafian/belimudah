import { ChevronDown } from "lucide-react";
import { useRef, useState, useEffect } from "react";

export default function Combobox({ label, options, value, onChange, placeholder }) {
  const [query, setQuery] = useState(value || "");
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const filtered = query
    ? options.filter((o) => o.name.toLowerCase().includes(query.toLowerCase()))
    : options;

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (opt) => {
    setQuery(opt.name);
    onChange(opt);
    setOpen(false);
  };

  const handleInput = (e) => {
    setQuery(e.target.value);
    onChange(null);
    setOpen(true);
  };

  return (
    <div ref={ref} className="flex flex-1 flex-col gap-1.5 relative">
      <label className="text-xs font-medium text-gray-600">{label}</label>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInput}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          autoComplete="off"
          className="w-full border border-black/20 px-3 pr-9 py-2 rounded-xl bg-black/3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
        />
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setOpen((v) => !v)}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400"
        >
          <ChevronDown size={15} className={`transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
      </div>
      {open && filtered.length > 0 && (
        <ul className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-black/10 rounded-xl shadow-lg overflow-hidden max-h-44 overflow-y-auto">
          {filtered.map((opt) => (
            <li
              key={opt.id}
              onMouseDown={() => handleSelect(opt)}
              className={`px-3 py-2 text-sm cursor-pointer hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                query === opt.name ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-700"
              }`}
            >
              {opt.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}