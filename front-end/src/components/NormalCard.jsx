import React from "react";

export default function NormalCard({
  title,
  discount,
  price,
  img,
  store,
  link,
}) {
  const navigateToLink = () => {
    window.open(link, "_blank");
  };

  return (
    <div
      onClick={navigateToLink}
      className="flex flex-col bg-secondary rounded-lg w-full shadow-lg shadow-gray-500 transition duration-300 ease-in-out hover:cursor-pointer hover:scale-110"
    >
      <h3
        className={`
			font-poppins 
			text-center
			text-xl
			py-1
			rounded-t-lg
			${store === "Exito" ? "bg-yellow-400" : "bg-green-600"}`}
      >
        {store}
      </h3>
      <img
        src={img ? img : "https://via.placeholder.com/150"}
        alt="Titulo"
        className="w-1/2 mx-auto mt-5"
      />
      <div className="m-auto w-11/12">
        <h3 className="font-poppinsBold text-xl text-center mt-5 overflow-hidden">
          {title}
        </h3>
        <p className="bg-red-400 py-1 text-center rounded-lg my-3 w-1/4">
          {discount}%
        </p>
        <p className="mb-4">{price}</p>
      </div>
    </div>
  );
}
