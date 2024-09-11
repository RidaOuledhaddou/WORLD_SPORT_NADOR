import { Link } from 'react-router-dom';
import nutrexImg from '../../assets/images/nutrex.webp';
export function About() {
    return (
        <>
            <section className="about bg-black padding-block-650">
                <div className="container">
                    <div className="even-columns">
                        <div className="desc sm-m-auto sm-t-center">
                            <h2 className="head-info text-primary fs-900 sm-fs-650">A Legacy Of
                                Quality Sports
                                Supplements</h2>
                            <p className="text-info fs-500 sm-fs-400 fw-regular text-gray mb-2">
                                Nutrex Research has earned its reputation as a fitness and nutrition
                                powerhouse for over two decades by consistently setting the standard
                                with pioneering and groundbreaking formulas. Our unwavering mission
                                is to empower athletes to not just meet their goals - but to crush them.
                                Our job isn’t to just help you succeed… it’s to make you UNSTOPPABLE.
                                That is our legacy…
                            </p>
                            <button className="btn mt-2"><Link to="products">More About Nutrex</Link> </button>
                        </div>
                        <div className='img-holder'>
                            <img src={nutrexImg} alt="" />
                        </div>
                    </div>
                </div>

            </section>
        </>
    )
}