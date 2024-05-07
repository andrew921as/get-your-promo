import React, { useState } from "react";

export default function Selectors({ filterPromos }) {
  const [selectedStores, setSelectedStores] = useState([]);
  const [selectedOption, setSelectedOption] = useState("All");

  const handleCheckboxChange = (event) => {
    const storeName = event.target.name;
    const isChecked = event.target.checked;
    let newStores = [];
    if (isChecked) {
      newStores = [...selectedStores, storeName];
      setSelectedStores(newStores);
    } else {
      // Si el checkbox está desmarcado, eliminamos la tienda seleccionada del estado
      newStores = selectedStores.filter((store) => store !== storeName);
      setSelectedStores(newStores);
    }
    // Llamar a la función de filtro de promociones en el componente padre
    console.log("array de stores", selectedStores);
    filterPromos(newStores, selectedOption);
  };

  const handleCheckboxRadioChange = (event) => {
    setSelectedOption(event.target.value);
    const { value } = event.target;
    filterPromos(selectedStores, value);
  };

  return (
    <div
      className="
		z-10 
		fixed 
		w-1/6 
		h-screen 
		flex 
		flex-col 
		align-middle 
		left-0 
		top-0 
		py-4 
		bg-secondary
		rounded-r-[40px]
		shadow-black
		shadow-2xl
		"
    >
      <p className="text-black text-xl font-poppins mt-10 mx-auto overflow-hidden">
        Filtrar por almacen
      </p>
      <div className="mt-10 w-3/4 mx-auto">
        <div className="my-2">
          <input
            type="checkbox"
            id="Exito"
            name="Exito"
            value="yes"
            onChange={(e) => handleCheckboxChange(e)}
          />
          <label htmlFor="Exito" className="ml-2 font-poppins">
            Exito
          </label>
        </div>
        <div className="my-2">
          <input
            type="checkbox"
            id="Falabella"
            name="Falabella"
            value="yes"
            onChange={(e) => handleCheckboxChange(e)}
          />
          <label htmlFor="Falabella" className="ml-2 font-poppins">
            Falabella
          </label>
        </div>
      </div>

      <hr className="my-10 mx-auto w-3/4 border border-gray-600 bor" />

      <p className="text-black text-xl font-poppins mt-2 mx-auto">
        Filtrar por descuentos
      </p>
      <div className="mt-10 w-3/4 mx-auto">
        <div className="my-2">
          <input
            type="radio"
            id="60"
            name="60"
            value="60"
            checked={selectedOption === "60"}
            onChange={(e) => handleCheckboxRadioChange(e)}
          />
          <label htmlFor="60" className="ml-2 font-poppins">
            {">=60%"}
          </label>
        </div>
        <div className="my-2">
          <input
            type="radio"
            id="50"
            name="50"
            value="50"
            checked={selectedOption === "50"}
            onChange={(e) => handleCheckboxRadioChange(e)}
          />
          <label htmlFor="50" className="ml-2 font-poppins">
            {">=50%"}
          </label>
        </div>
        <div className="my-2">
          <input
            type="radio"
            id="40"
            name="40"
            value="40"
            checked={selectedOption === "40"}
            onChange={(e) => handleCheckboxRadioChange(e)}
          />
          <label htmlFor="40" className="ml-2 font-poppins">
            {">=40%"}
          </label>
        </div>
        <div className="my-2">
          <input
            type="radio"
            id="30"
            name="30"
            value="30"
            checked={selectedOption === "30"}
            onChange={(e) => handleCheckboxRadioChange(e)}
          />
          <label htmlFor="30" className="ml-2 font-poppins">
            {">=30%"}
          </label>
        </div>
        <div className="my-2">
          <input
            type="radio"
            id="All"
            name="All"
            value="All"
            checked={selectedOption === "All"}
            onChange={(e) => handleCheckboxRadioChange(e)}
          />
          <label htmlFor="All" className="ml-2 font-poppins">
            Todos
          </label>
        </div>
      </div>

      <hr className="my-10 mx-auto w-3/4 border border-gray-600 bor" />

      <p className="text-black text-sm font-poppins mt-2 mx-auto">
        Made by Andrew921 & SkyRedFX
      </p>
    </div>
  );
}
