import { useEffect, useState } from "react";
import axios from "axios";

function AlternativeProduct({ upc }) {
    const [productName, setProductName] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const getProductInfo = () => {
        axios.get(`https://world.openfoodfacts.org/api/v2/product/${upc}.json`).then(response => {
            setProductName(response.data.product.product_name);
            if (response.data.product.selected_images !== null && response.data.product.selected_images.front) {
                setImageUrl(response.data.product.selected_images.front.display.en);
            }
        }).catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        getProductInfo();
    }, [])

    return (
        <div className="card" style={{width: "250px"}}>
            { imageUrl ?
                <img src={imageUrl} className="card-img-top mx-auto mt-3" style={{width: "125px"}} alt="product" />
            :
                <div className="bg-secondary-subtle mx-auto mt-3" style={{width: "225px", height: "100px"}}></div>
            }
            <div className="card-body">
                <h5 className="card-title mb-4">{productName}</h5>
                <a href={`/product/${upc}`} target="_blank" rel="noopener noreferrer" className="btn btn-success">See ingredients</a>
            </div>
        </div>
    )
}

export default AlternativeProduct;