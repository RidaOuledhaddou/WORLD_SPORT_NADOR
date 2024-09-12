import React from 'react';
import './Cards.css';
import Card from '../Card/Card';
// Card 
const Cards = ({ cardsData }) => {
  return (
    <div className="Cards">
      {cardsData.map((card, id) => (
        <div key={id} className="parentContainer"> 
          <Card
            title={card.title}
            color={card.color}
            barValue={card.barValue}
            value={card.value}
            png={card.png}
            series={card.series}
          />
        </div>
      ))}
    </div>
  );
};

export default Cards;
