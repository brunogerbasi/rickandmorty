
import React from "react";
import logoImg from "../../../assets/img/Rick-And-Morty-Logo.png";

export interface LogoProps { 
  width?: number;  
  height?: number;  
  className?: string;
}

const Logo: React.FC<LogoProps> = ({
  width = 761,
  height = 255,  
}) => (  
    <img
      src={logoImg}
      alt="Rick and Morty Logo"
      decoding="async"
      width={width}
      height={height}
      className="object-contain"
    />  
);

export default Logo;
