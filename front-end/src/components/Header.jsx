import React from "react";

export default function Header() {
  return (
    <header className="z-40 fixed top-0 right-0 w-3/4 h-[100px] bg-gradient-to-r from-transparent via-primary to-primary">
        <div className="w-11/12 m-auto ">
          <h1 className="text-white text-end font-poppinsBold text-[50px]">
            GetYourPromo
          </h1>
        </div>
    </header>
  );
}
