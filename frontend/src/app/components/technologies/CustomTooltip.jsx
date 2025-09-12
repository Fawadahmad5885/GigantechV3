import React, { useState } from "react";

const CustomTooltip = ({ content, children }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div className="absolute left-full top-[60%] transform -translate-y-1/2 ml-2 px-2 py-1 bg-gray-700 text-white text-xs rounded shadow-lg whitespace-nowrap z-30">
          {content}
        </div>
      )}
    </div>
  );
};

export default CustomTooltip;
