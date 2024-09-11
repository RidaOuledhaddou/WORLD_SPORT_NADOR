
export default function Footer() {
    return (
        <>
            <footer className="footer bg-black text-white padding-block-650">
                <div className="container">
                    <div className="even-columns">
                        <div className="flex flex-column justify-between">
                            <a href=""><img src="../assets/images/logo.png" alt="" /></a>
                            <div className="social-icons flex mt-3">
                                <img className="m-2" src="../assets/images/insta-icon.png" alt="" />
                                <img className="m-2" src="../assets/images/fb-icon.png" alt="" />
                                <img className="m-2" src="../assets/images/youtube-icon.png" alt="" />
                            </div>
                        </div>

                        <div>
                            <ul>
                                <li className=" fs-400 fw-bold">Supplements</li>
                                <li><a className="pl-2 fs-300 fw-light text-white" href="">item</a></li>
                                <li><a className="pl-2 fs-300 fw-light text-white" href="">item</a></li>
                                <li><a className="pl-2 fs-300 fw-light text-white" href="">item</a></li>
                                <li><a className="pl-2 fs-300 fw-light text-white" href="">item</a></li>
                                <li><a className="pl-2 fs-300 fw-light text-white" href="">item</a></li>
                            </ul>
                        </div>
                        <div>
                            <ul>
                                <ul>
                                    <li className=" fs-400 fw-bold">About</li>
                                    <li><a className="pl-2 fs-300 fw-light text-white" href="">item</a></li>
                                    <li><a className="pl-2 fs-300 fw-light text-white" href="">item</a></li>
                                    <li><a className="pl-2 fs-300 fw-light text-white" href="">item</a></li>
                                    <li><a className="pl-2 fs-300 fw-light text-white" href="">item</a></li>
                                    <li><a className="pl-2 fs-300 fw-light text-white" href="">item</a></li>
                                </ul>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}