import { useParams } from "react-router"
import { categories, products } from "../../data/products"
import ProductGallery from "../../Components/ProductDetailCard/ProductGallery";
import ProductInfo from "../../Components/ProductDetailCard/ProductInfo";
import Cotizaciones from "../../Components/ProductDetailCard/Cotizaciones";
import CustomerOpinions from "../../Components/ProductDetailCard/Ratings";
import Sugest from "../../Components/ProductDetailCard/Sugest";

export default function ProductDetailCard() {
    const { id } = useParams();
    const images = products.Categoria1[0].images
    console.log(images)

    return (
        <>
            <div className='pt-20 bg-[#F8F5EE]'>ProductDetailCard{id}
                <div className="w-full flex max-lg:flex-col justify-center">
                    <div className="lg:w-[40%]">
                        <ProductGallery
                            images={images}
                        />
                    </div>
                    <div className="lg:w-[50%] flex justify-center items-center">
                        <ProductInfo />
                    </div>

                </div>
                <div className="flex justify-center p-10">
                    <Cotizaciones />
                </div>
                <div>
                    <CustomerOpinions />
                </div>
                <div>
                    <Sugest />
                </div>
            </div>


        </>
    )
}
