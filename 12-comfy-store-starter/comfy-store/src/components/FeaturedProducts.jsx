//this component will have both the section title i.e featured products title and the featured grid which has the actual  items 

import ProductsGrid from "./ProductsGrid"
import SectionTitle from "./SectionTitle"

const FeaturedProducts = () => {
  return (
    <div className="pt-24">
        {/* pass prop of featured products */}
        <SectionTitle text='featured products'/>
        <ProductsGrid/>
    </div>
  )
}
export default FeaturedProducts