import React from "react";

export interface AvatarProps {
  src: string;
  alt: string;
  size?: number;
  className?: string;
  loading?: "lazy" | "eager";
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 80,
  className = "",
  loading = "lazy", 
}) => (
  <img
    src={src}
    alt={alt}
    width={size}
    height={size}
    loading={loading}
    className={[
      "rounded-full object-cover",
      `w-[${size}px] h-[${size}px]`,
      className,
    ].join(" ")}
  />
);
