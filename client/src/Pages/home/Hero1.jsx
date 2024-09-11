import { Link } from 'react-router-dom';
import heroImg from '../../assets/images/MAN10.jpg';

export default function Hero() {
    return (
        <>
            <section className="hero bg-black text-white ">
                <div className="container padding-block-650">
                    <div className="even-columns">
                        <div className="text-info sm-t-center m-auto">
                            <h1 className="primary-heading fw-regular fs-800 sm-fs-600">
                                Welcome to &ensp;
                                <span className="text-primary">
                                    world sport
                                </span>,
                                Your Destination for
                                Fitness Supplements
                            </h1>
                            <Link to="/products/all_products">   <button className="btn bg-primary text-white t-center mt-1">
                                See Products
                            </button> </Link>
                        </div>
                        <div className="img-holder">
                            <img src={heroImg} style={{width : "400px", height: "340px"}} alt="" />
                        </div>
                    </div>
                </div>
                <div className="scroller bg-black" data-speed="fast" data-direction="left">
                    <div className="scroller__inner">
                        <span>Hungry. Relentless. Unstoppable. </span>
                        <span>Hungry. Relentless. Unstoppable. </span>
                        <span>Hungry. Relentless. Unstoppable. </span>
                        <span>Hungry. Relentless. Unstoppable. </span>
                        <span>Hungry. Relentless. Unstoppable. </span>
                        <span>Hungry. Relentless. Unstoppable. </span>
                        <span>Hungry. Relentless. Unstoppable. </span>
                        <span>Hungry. Relentless. Unstoppable. </span>
                        <span>Hungry. Relentless. Unstoppable. </span>
                        <span>Hungry. Relentless. Unstoppable. </span>
                        <span>Hungry. Relentless. Unstoppable. </span>
                        <span>Hungry. Relentless. Unstoppable. </span>
                    </div>
                </div>
            </section>
        </>
    )
}