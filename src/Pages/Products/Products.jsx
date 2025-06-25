
import { useState } from 'react'
import CategoryBar from '../../Components/Products/CategoryBar'
import { categories, products } from "../../data/products"
import ProductGridComplete from '../../Components/Products/ProductGridComplete'

export default function Products() {
    const [selectedCategory, setSelectedCategory] = useState("Categoria1")
    return (
        <>
            <div className='flex flex-col justify-center items-center bg-[#F8F5EE]'>
                <div className='w-[80%]'>
                    <CategoryBar
                        categories={categories}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                    />
                </div>


                <div className='w-[80%] mt-4'>
                    <ProductGridComplete products={products} categories={categories} selectedCategory={selectedCategory} />
                </div>
            </div>

        </>
    )
}
