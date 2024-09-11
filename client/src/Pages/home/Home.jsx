import React, { useEffect } from 'react';
import Navbar from "../../Components/common/Navbar";
import Footer from "../../Components/common/Footer";
import Hero from "./Hero1";
import GoalCategory from "./GoalCategory";
import Category from "./Category";
import Deals from "./Deals";
import { About } from "./About";
import Partners from "./Partners";
import Cta from "./Cta";

import fetchProdsByCategory from "./fetchProdsByCategory";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
    const { id } = useParams();
    const results = useQuery(["prodsByCategories", id], fetchProdsByCategory);

    useEffect(() => {
      fetch('http://127.0.0.1:8000/api/increment')
        .then((response) => response.json())
        .catch((error) => console.error('Error incrementing visits:', error));
    }, []);

    if (results.isLoading) {
        return (
          <div className="loading-pane m-auto">
            <h2 className="loader">🌀</h2>
          </div>
        );
    }

    if (results.isError) {
        return (
          <div className="error-pane m-auto">
            <h2 className="error">Error: {results.error.message}</h2>
          </div>
        );
    }

    const topSellers = results.data?.["top-sellers"] || [];
    const wheyProtein = results.data?.["WHEY PROTEIN"] || [];
    const creatine = results.data?.["CREATINE"] || [];

    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <GoalCategory />
                <Category title="TOP SELLERS" category="top-sellers" products={topSellers} />
                <Deals />
                <Category title="WHEY PROTEIN" category="WHEY PROTEIN" products={wheyProtein} />
                <Category title="CREATINE" category="CREATINE" products={creatine} />
                <About />
                <Partners />
                <Cta />
            </main>
            <Footer />
        </>
    );
}
