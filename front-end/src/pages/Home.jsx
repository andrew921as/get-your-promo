import React from "react";
import Header from "../components/Header";
import Selectors from "../components/Selectors";
import PDFcard from "../components/PDFcard";
import NormalCard from "../components/NormalCard";

export default function Home() {

  return (
    <div className="flex">
      <Header />
			<Selectors/>
			<div className="w-1/6"/>
      <div className="mt-[140px] ml-14 w-3/4">      
        <h2 className="font-poppinsBold text-5xl">Las mejores!</h2>
				<div className="relative mt-10 grid grid-cols-3 gap-20">
					<PDFcard/>
					<PDFcard/>
					<PDFcard/>
				</div>
				<h2 className="font-poppinsBold text-2xl mt-20">Todas las promos</h2>
				<div className="relative mt-10 grid grid-cols-4 gap-10">
					<NormalCard/>
					<NormalCard/>
					<NormalCard/>
					<NormalCard/>
					<NormalCard/>
					<NormalCard/>
					<NormalCard/>
					<NormalCard/>
					<NormalCard/>
					<NormalCard/>
					<NormalCard/>
					<NormalCard/>
				</div>
      </div>
    </div>
  );
}
