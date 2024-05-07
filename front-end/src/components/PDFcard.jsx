import React from "react";

export default function PDFcard({ link, title, color, image }) {
  return (
    <a
      href={link}
      target="_blank"
      className={`
			border
			${color === "green" ? "border-green-700" : "border-blue-500"}
			flex 
			justify-center 
			align-middle 
			rounded-lg 
			w-full 
			h-64 
			shadow-md 
			${color === "green" ? "shadow-green-400" : "shadow-blue-200"}
			transition 
			duration-300 
			ease-in-out 
			hover:cursor-pointer 
			hover:scale-110`}
    >
			<img src={image} alt={title} className='w-1/2 mx-auto '/>
    </a>
  );
}
