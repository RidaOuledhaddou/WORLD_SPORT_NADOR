import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import product3Img from '../../assets/images/products/product-3.jpeg';
import starsImg from '../../assets/images/five-stars.png';

export default function Deals() {
    const [deals, setDeals] = useState([]);

    useEffect(() => {
        // Fetch deals data from the API
        fetch('http://127.0.0.1:8000/api/index_Deals')
            .then(response => response.json())
            .then(data => {
                const dealsWithTimeLeft = data.map(deal => {
                    const endDate = new Date(deal.end_date);
                    const timeLeft = (endDate.getTime() - new Date().getTime()) / 1000;
                    return { ...deal, timeLeft };
                });
                setDeals(dealsWithTimeLeft);
            })
            .catch(error => console.error('Error fetching deals:', error));
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setDeals(prevDeals => prevDeals.map(deal => {
                const newTimeLeft = deal.timeLeft - 1;
                return { ...deal, timeLeft: newTimeLeft <= 0 ? 0 : newTimeLeft };
            }));
        }, 1000);

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    const formatTime = (time) => {
        const days = Math.floor(time / (60 * 60 * 24));
        const hours = Math.floor((time % (60 * 60 * 24)) / (60 * 60));
        const minutes = Math.floor((time % (60 * 60)) / 60);
        const seconds = Math.floor(time % 60);

        return {
            days: String(days).padStart(2, '0'),
            hours: String(hours).padStart(2, '0'),
            minutes: String(minutes).padStart(2, '0'),
            seconds: String(seconds).padStart(2, '0')
        };
    };

    return (
        <section className="deals padding-block-650">
            <div className="container">
                <div className="even-columns">
                    <div className="text-white sm-m-auto sm-t-center">
                        <h2 className="fs-700 ">DEALS OF THE WEEK <br /> <span className="text-primary"> 15% DISCOUNT</span></h2>
                        <p className="fs-500 fw-regular">FIRST COME, FIRST SERVED!</p>
                        {deals.length > 0 && (
                            <div className="timer w-fit-content flex sm-m-auto">
                                {(() => {
                                    const { days, hours, minutes, seconds } = formatTime(deals[0].timeLeft);
                                    return (
                                        <>
                                            <div className="m-1">
                                                <div className="fs-400 box bg-primary p-1 t-center fw-light">
                                                    {days}
                                                </div>
                                                <span className="fs-300 fw-light">Days</span>
                                            </div>
                                            <div className="m-1">
                                                <div className="fs-400 box bg-primary p-1 t-center fw-light">
                                                    {hours}
                                                </div>
                                                <span className="fs-300 fw-light">Hours</span>
                                            </div>
                                            <div className="m-1">
                                                <div className="fs-400 box bg-primary p-1 t-center fw-light">
                                                    {minutes}
                                                </div>
                                                <span className="fs-300 fw-light">Mins</span>
                                            </div>
                                            <div className="m-1">
                                                <div className="fs-400 box bg-primary p-1 t-center fw-light">
                                                    {seconds}
                                                </div>
                                                <span className="fs-300 fw-light">Secs</span>
                                            </div>
                                        </>
                                    );
                                })()}
                            </div>
                        )}
                        <button className="btn mt-2"><Link to="/products/all_deals">CHECK OUR PROMOTIONS</Link></button>
                    </div>
                    <div className="cards-holder">
                        {deals.map((product) => {
                            return (
                                <div className="card bg-white m-2 p-2 w-fit-content m-auto" key={product.id}>
                                    <div className="img-holder">
                                        <img src={product3Img} alt={product.product.name} />
                                    </div>
                                    <div className="m-2">
                                        <h3 className="fs-300 fw-light">
                                            {product.product.description.split(' ').slice(0, 19).join(' ') + (product.product.description.split(' ').length > 19 ? '...' : '')}
                                        </h3>
                                        <img src={starsImg} alt="stars" />
                                        <div className="price flex justify-between">
                                            <p className="promotion fs-300 text-gray font-weight-bold"><s>{product.old_price}</s></p>
                                            <p className="fs-300 text-red font-weight-bold">{product.price}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
