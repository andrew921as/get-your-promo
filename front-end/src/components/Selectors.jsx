import React from "react";

export default function Selectors() {
  return (
    <div
      className='
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
		'
    >
      <p className="text-black text-xl font-poppins mt-10 mx-auto overflow-hidden">
        Filtrar por almacen
      </p>
      <div className="mt-10 w-3/4 mx-auto">
        <div className="my-2">
          <input type="checkbox" id="Exito" name="Exito" value="yes" />
          <label htmlFor="Exito" className="ml-2 font-poppins">
            Exito
          </label>
        </div>
        <div className="my-2">
          <input type="checkbox" id="Alkosto" name="Alkosto" value="yes" />
          <label htmlFor="Alkosto" className="ml-2 font-poppins">
            Alkosto
          </label>
        </div>
        <div className="my-2">
          <input type="checkbox" id="Jumbo" name="Jumbo" value="yes" />
          <label htmlFor="Jumbo" className="ml-2 font-poppins">
            Jumbo
          </label>
        </div>
        <div className="my-2">
          <input type="checkbox" id="Carulla" name="Carulla" value="yes" />
          <label htmlFor="Carulla" className="ml-2 font-poppins">
            Carulla
          </label>
        </div>
      </div>

      <hr className="my-10 mx-auto w-3/4 border border-gray-600 bor" />

      <p className="text-black text-xl font-poppins mt-2 mx-auto">
        Filtrar por descuentos
      </p>
      <div className="mt-10 w-3/4 mx-auto">
        <div className="my-2">
          <input type="checkbox" id="60" name="60" value="yes" />
          <label htmlFor="60" className="ml-2 font-poppins">
							{">=60%"}
          </label>
        </div>
        <div className="my-2">
          <input type="checkbox" id="50" name="50" value="yes" />
          <label htmlFor="50" className="ml-2 font-poppins">
            {">=50%"}
          </label>
        </div>
        <div className="my-2">
          <input type="checkbox" id="40" name="40" value="yes" />
          <label htmlFor="40" className="ml-2 font-poppins">
            {">=40%"}
          </label>
        </div>
        <div className="my-2">
          <input type="checkbox" id="30" name="30" value="yes" />
          <label htmlFor="30" className="ml-2 font-poppins">
            {">=30%"}
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
