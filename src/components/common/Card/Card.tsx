import React, { ReactNode } from "react";

export interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = "" }) => (
  <article 
    className={[
      "bg-white rounded-2xl shadow-md overflow-hidden",
      "hover:shadow-lg transition-shadow",
      className,
    ].join(" ")}
  >
    {children}
  </article >
);