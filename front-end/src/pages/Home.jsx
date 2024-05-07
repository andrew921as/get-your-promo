import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Selectors from "../components/Selectors";
import PDFcard from "../components/PDFcard";
import NormalCard from "../components/NormalCard";
import {
  getAlkostoPromos,
  getAllPromos,
  getJumboPromos,
} from "../utils/endpoints";

export default function Home() {
  const [filteredPromos, setFilteredPromos] = useState([]);
  const [promos, setPromos] = useState([]);
  const [alkostoLink, setAlkostoLink] = useState("");
  const [jumboLink, setJumboLink] = useState("");

  useEffect(() => {
    const fetchPromos = async () => {
      const myPromos = await getAllPromos();
      console.log(myPromos);
      setPromos(myPromos);
      setFilteredPromos(myPromos);
    };

    const fetchAlkostoLink = async () => {
      const { link } = await getAlkostoPromos();
      setAlkostoLink(link);
    };

    const fetchJumboLink = async () => {
      const { link } = await getJumboPromos();
      setJumboLink(link);
    };

    fetchPromos();
    fetchAlkostoLink();
    fetchJumboLink();
  }, []);

  const filterPromos = (selectedStores, selectedPromo) => {
		console.log("SelectedStores",selectedStores,"SelectedPromos",selectedPromo)
    if (selectedStores.length === 0 && selectedPromo === "All") {
      setFilteredPromos(promos);
      return;
    } else if (selectedPromo === "All") {
      const filteredPromos = promos.filter((promo) =>
        selectedStores.includes(promo.store)
      );
      setFilteredPromos(filteredPromos);
			return
    }else if (selectedStores.length === 0) {
			const filteredPromos = promos.filter((promo) =>
				parseInt(promo.discount) >= parseInt(selectedPromo)
			);
			setFilteredPromos(filteredPromos);
			return
		}else{
			const filteredPromos = promos.filter((promo) =>
				selectedStores.includes(promo.store) &&
				parseInt(promo.discount) >= parseInt(selectedPromo)
			);
			setFilteredPromos(filteredPromos);
		}
  };

  return (
    <div className="flex">
      <Header />
      <Selectors filterPromos={filterPromos} />
      <div className="w-1/6" />
      <div className="mt-[140px] ml-14 w-3/4">
        <h2 className="font-poppinsBold text-5xl">Revista de promociones!</h2>
        <div className="relative mt-10 grid grid-cols-2 gap-20">
          <PDFcard
            link={jumboLink}
            title="Jumbo"
            color="green"
            image="/Images/JumboLogo.svg"
          />
          <PDFcard
            link={alkostoLink}
            title="Alkosto"
            color="blue"
            image="/Images/alkosto-logo.svg"
          />
        </div>
        <h2 className="font-poppinsBold text-2xl mt-20">Todas las promos</h2>
        <div className="relative mt-10 grid grid-cols-4 gap-10">
          {filteredPromos.map((promo, index) => (
            <NormalCard
              key={index}
              title={promo.title}
              discount={promo.discount}
              price={promo.price}
              img={promo.image}
              store={promo.store}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
