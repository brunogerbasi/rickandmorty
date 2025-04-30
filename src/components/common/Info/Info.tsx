import React from "react";

export interface InfoProps {
  label: string;
  colorClass?: string; 
}

export const Info: React.FC<InfoProps> = ({
  label,
  colorClass = "bg-gray-100 text-gray-800",
}) => (
  <span
    className={[
      "inline-block px-2 py-0.5 text-xs font-medium rounded-full",
      colorClass,
    ].join(" ")}
  >
    {label}
  </span>
);