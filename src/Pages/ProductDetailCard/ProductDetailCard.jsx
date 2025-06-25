import { useParams } from "react-router"
import { categories, products } from "../../data/products"
import ProductGallery from "../../Components/ProductDetailCard/ProductGallery";
import ProductInfo from "../../Components/ProductDetailCard/ProductInfo";

export default function ProductDetailCard() {
    const { id } = useParams();
    const images = products.Categoria1[0].images
    console.log(images)

    return (
        <>
            <div className='pt-20 bg-gray-300'>ProductDetailCard{id}
                <div className="w-full flex justify-center">
                    <div className="w-[40%]">
                        <ProductGallery
                            images={images}
                        />
                    </div>
                    <div className="w-[50%] flex justify-center items-center">
                        <ProductInfo />
                    </div>
                </div>

            </div>


        </>
    )
}
