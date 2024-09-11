import { Link } from 'react-router-dom';
import goalImg1 from '../../assets/images/MAN9.jpg';
import goalImg2 from '../../assets/images/MAN4.jpg';
import goalImg3 from '../../assets/images/MAN8.jpg';
export default function GoalCategory() {
    return (
        <>
            <section className="goal-categories padding-block-650">
                <div className="container">
                    <h1 className="secondary-heading fs-700 sm-fs-650 t-center fs-700 sm-fs-650">Shop by goal</h1>
                    <div className="even-columns">
                        <div className="m-auto">
                            <Link to="/products/gain-power">
                                <div className="img-holder">
                                    <img src={goalImg3} style={{width : "280px", height: "380px"}} alt="" />
                                </div>
                                <h2 className="t-center fs-600">GAIN POWER</h2>
                            </Link>

                        </div>

                        <div className="m-auto">
                            <Link to="/products/pris-masse">
                                <div className="img-holder">
                                    <img src={goalImg2} style={{width : "250px", height: "380px"}} alt="" />
                                </div>
                                <h2 className="t-center fs-600">PRISE DE MASSE</h2>
                            </Link>

                        </div>
                        <div className="m-auto">
                            <Link to="/products/prepare-sache">
                                <div className="img-holder">
                                    <img src={goalImg1} style={{width : "280px", height: "380px"}} alt="" />
                                </div>
                                <h2 className="t-center fs-600">PREPARE TA SACHE</h2>
                            </Link>

                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}