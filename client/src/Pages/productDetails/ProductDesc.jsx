import { useState } from "react";
import { useCart } from '../../context/CartContext';

export default function ProductDetails({ product }) {
    const { handleAddToCart } = useCart();
    const [qte, setQte] = useState(1);
    const [selectedFlavor, setSelectedFlavor] = useState("Refreshers");
    const [selectedImage, setSelectedImage] = useState(product.main_image_url);

    const handleFlavorClick = (flavor) => {
        setSelectedFlavor(flavor);
    };

    const handleIncrease = () => {
        setQte(prevQte => prevQte + 1);
    };

    const handleDecrease = () => {
        setQte(prevQte => (prevQte > 1 ? prevQte - 1 : 1));
    };

    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    return (
        <>
            <div className="product padding-block-800">
                <div className="container">
                    <nav className="mb-4">
                        <a href="" className="fs-300 fw-light text-gray">
                            Accueil / Vêtements et accessoires /
                        </a>
                        <a href="" className="fw-light">Chiba Power Gants d’entraînement</a>
                    </nav>

                    <div className="even-columns">
                        <div className="wrapper">
                            <ol className="mt-4">
                                <li>
                                    <img src={`../../assets/images/products/${product.main_image_url}`} alt="" onClick={() => handleImageClick(product.main_image_url)} />
                                </li>
                                {
                                    product.images.map((img) => {
                                        return (
                                            <li key={img.id}>
                                                <img src={`../../assets/images/products/${img.image_url}`} alt="" onClick={() => handleImageClick(img.image_url)} />
                                            </li>
                                        )
                                    })
                                }
                            </ol>
                            <div className="main-img bg-silver">
                                <img src={`../../assets/images/products/${selectedImage}`} alt="" />
                            </div>
                        </div>

                        <div className="product-details w-fit-content">
                            <h1 className="fs-800 uppercase ">{product.name}</h1>
                            <h2 className="fs-600 ">{product.description}</h2>
                            <div className="">Brands : <span className="ff-secondary fw-light fs-300 text-light">{product.brand}</span></div>
                            <div className="price-review flex justify-between w-full mt-1 pr-4">
                                <p className="fs-400">${product.price}</p>
                                <img src="../../assets/images/five-stars.png" alt="" />
                            </div>
                            <p className="text-info m-2 fs-300 ff-secondary fw-light text-light">
                                ABE – Applied Nutrition est un pré-entraînement extrêmement puissant qui vous procurera une énergie maximale ainsi qu’une congestion musculaire exceptionnelle. ABE augmente instantanément et de manière significative la force et la puissance musculaire. De plus, il favorisera une concentration extrême pour rester pleinement concentré lors de vos séances d’entraîne- -ment. Attention, il est crucial de ne jamais dépasser la dose recommandée de 10,5g.
                            </p>
                            <h2 className="">Flavor</h2>

                            <ol className="flex flavor">
                                {product.flavors.map((flavor) => (
                                    <li
                                        key={flavor.id}
                                        className={`fs-300 fw-regular p-1 ${selectedFlavor === flavor.id ? 'bg-black text-white' : ''}`}
                                        onClick={() => handleFlavorClick(flavor.id)}
                                    >
                                        {flavor.name}
                                    </li>
                                ))}
                            </ol>
                            <div className="flex m-2">
                                <div className="quantite">
                                    <button onClick={handleDecrease}>-</button>
                                    <input type="number" value={qte} readOnly />
                                    <button onClick={handleIncrease}>+</button>
                                </div>
                                <button className="btn bg-red text-white ml-2" onClick={() => handleAddToCart(product)}>Add to cart</button>
                            </div>
                            <div className="">Categories :
                                {
                                    product.categories.map((category) => {
                                        return (
                                            <span key={category.id} className="ff-secondary fw-light fs-300 text-light">
                                                {category.name},
                                            </span>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
