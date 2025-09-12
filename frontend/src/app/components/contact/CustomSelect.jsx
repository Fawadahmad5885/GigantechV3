import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export function CustomSelect({ id, label, value, options, onChange, required, searchable = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);
  const dropdownRef = useRef(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const [portalContainer, setPortalContainer] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

 useEffect(() => {
    // Only create container if it doesn't exist
    let container = document.getElementById('custom-select-portal');
    
    if (!container) {
      container = document.createElement("div");
      container.id = 'custom-select-portal';
      container.style.position = "absolute";
      container.style.top = "0";
      container.style.left = "0";
      container.style.width = "100%";
      container.style.zIndex = "10";
      container.style.pointerEvents = "none";
      document.body.appendChild(container);
    }
    
    setPortalContainer(container);

    return () => {
      // Only remove if it exists and has no other children
      const existingContainer = document.getElementById('custom-select-portal');
      if (existingContainer && existingContainer.children.length === 0) {
        try {
          document.body.removeChild(existingContainer);
        } catch (error) {
          // Silently handle the case where the element was already removed
          console.warn('Portal container already removed:', error);
        }
      }
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen && selectRef.current) {
      const rect = selectRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setIsFocused(true);
  };

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
    setIsFocused(false);
    setSearchTerm(""); // Reset search when an option is selected
  };

  // Filter options only if searchable is enabled
  const filteredOptions = searchable
    ? options.filter((option) =>
        (typeof option === "object" ? option.name || option.label : option)
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    : options;

  return (
    <div className="relative" ref={selectRef}>
      <div
        className={`h-[52px] w-full rounded border ${isFocused ? "border-secondaryColor border-2" : "border-gray-300 hover:border-gray-400"} bg-white px-3 py-2 text-sm cursor-pointer flex items-center justify-between`}
        onClick={handleToggle}
      >
        <span className={value ? "text-gray-900" : "text-transparent"}>{value || " "}</span>
        <svg
          className={`h-5 w-5 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      <label
        htmlFor={id}
        className={`absolute left-3 ${isFocused || value ? "-top-2.5 text-xs bg-white px-1" : "top-3.5"} transition-all duration-200 pointer-events-none ${isFocused ? "text-secondaryColor" : "text-gray-500"} z-10`}
      >
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>

      {isOpen &&
        portalContainer &&
        createPortal(
          <div
            ref={dropdownRef}
            className="absolute bg-white border border-gray-300 rounded shadow-lg mt-1 max-h-[250px] overflow-y-auto z-50"
            style={{
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`,
              width: `${dropdownPosition.width}px`,
              pointerEvents: "auto",
            }}
          >
            {/* Show search input only if searchable */}
            {searchable && (
              <div className="px-3 py-2">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-2 py-1 border rounded outline-none"
                  placeholder="Search..."
                />
              </div>
            )}

            {/* Render options */}
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <div
                  key={typeof option === "object" ? option.code || index : index}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  onClick={() =>
                    handleSelect(typeof option === "object" ? option.name || option.label : option)
                  }
                >
                  {typeof option === "object" ? option.name || option.label : option}
                </div>
              ))
            ) : (
              <div className="px-3 py-2 text-gray-500 text-sm">No results found</div>
            )}
          </div>,
          portalContainer
        )}
    </div>
  );
}
