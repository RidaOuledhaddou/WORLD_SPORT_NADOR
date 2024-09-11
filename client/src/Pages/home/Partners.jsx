import partnerImg1 from '../../assets/images/partners/partner-1.png';
import partnerImg2 from '../../assets/images/partners/partner-2.png';
import partnerImg3 from '../../assets/images/partners/partner-3.png';
import partnerImg4 from '../../assets/images/partners/partner-4.png';
import partnerImg5 from '../../assets/images/partners/partner-5.png';
import partnerImg6 from '../../assets/images/partners/partner-6.png';
import partnerImg7 from '../../assets/images/partners/partner-7.png';
import partnerImg8 from '../../assets/images/partners/partner-8.png';
import partnerImg9 from '../../assets/images/partners/partner-9.png';
import partnerImg10 from '../../assets/images/partners/partner-10.png';

export default function Partners() {
    return (
        <>
            <section className="partners padding-block-650">

                <div className="container">
                    <div className="flex justify-between">
                        <h2 className="secondary-heading fs-700 sm-fs-650">Our Partners :</h2>
                    </div>
                    <div className="logos-wrapper mt-4">
                        <div><img src={partnerImg1} alt=""/></div>
                        <div><img src={partnerImg2} alt=""/></div>
                        <div><img src={partnerImg3} alt=""/></div>
                        <div><img src={partnerImg4} alt=""/></div>
                        <div><img src={partnerImg5} alt=""/></div>
                        <div><img src={partnerImg6} alt=""/></div>
                        <div><img src={partnerImg7} alt=""/></div>
                        <div><img src={partnerImg8} alt=""/></div>
                        <div><img src={partnerImg9} alt=""/></div>
                        <div><img src={partnerImg10} alt=""/></div>
                    </div>
                </div>
            </section>

        </>
    )
}