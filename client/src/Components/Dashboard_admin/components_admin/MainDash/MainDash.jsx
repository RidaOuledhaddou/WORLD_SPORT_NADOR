import React, { useEffect, useState } from 'react';
import Cards from '../Cards/Cards';
import Table from '../Table/Table';
import "./MainDash.css";
import { fetchRequestsData, fetchTotalQuantity, fetchTotalRevenue, CardsDataTemplate } from '../Data/Data';

const MainDash = () => {
  const [cardsData, setCardsData] = useState(CardsDataTemplate);
  const maxQuantityValue = 1000; // Define the maximum value for total quantity

  useEffect(() => {
    const getData = async () => {
      const requestsData = await fetchRequestsData();
      const totalQuantityData = await fetchTotalQuantity();
      const totalRevenueData = await fetchTotalRevenue();

      // Update the CardsData with dynamic data
      const updatedCardsData = CardsDataTemplate.map(card => {
        if (card.title === "Requests") {
          return {
            ...card,
            barValue: (requestsData.totalRequests / 100) * 10, // Example percentage
            value: requestsData.totalRequests,
            series: [
              {
                name: 'Requests',
                data: requestsData.data
              }
            ]
          };
        } else if (card.title === "Sales") {
          return {
            ...card,
            barValue: (totalQuantityData.totalQuantity / 1000) * 10, // Percentage of maxQuantityValue
            value: totalQuantityData.totalQuantity,
            series: [
              {
                name: 'Sales',
                data: [totalQuantityData.totalQuantity]
              }
            ]
          };
        } else if (card.title === "Revenue") {
          return {
            ...card,
            barValue: (totalRevenueData.totalAmount / 100000) * 10, // Example percentage of a max revenue value
            value: `${totalRevenueData.totalAmount}DH`, // Format as currency
            series: [
              {
                name: 'Revenue',
                data: [totalRevenueData.totalAmount]
              }
            ]
          };
        }
        return card;
      });

      setCardsData(updatedCardsData);
    };

    getData();
  }, []);

  return (
    <>
      <div className="MainDash">
        <h1>Dashboard</h1>
        <Cards cardsData={cardsData} />
        <h3>Recent Orders</h3>
        <Table />
      </div>
    </>
  );
};

export default MainDash;
