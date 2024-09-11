import React from 'react'

export default function DealCart(product) {
    return (
        <>
            <div className="card bg-white m-2 p-2 w-fit-content m-auto">
                <div className="img-holder">
                    <img src={product3Img} alt="" />
                </div>
                <div className="m-2">
                    <h3 className="fs-300 fw-light">{product.name}</h3>
                    <img src={starsImg} alt="" />

                    <div className="price flex justify-between">
                        <p className="promotion fs-300 text-gray fw-light"><s>$1.049,00</s></p>
                        <p className="fs-300 fw-light text-red">${product.price}</p>
                    </div>

                </div>
            </div>
        </>
    )
}
