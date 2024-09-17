import { useParams } from "react-router-dom"
const ProductDetailPage = () => {
    const {id} = useParams()
    console.log(id)
    return <h1>This is Product detail page</h1>
}

export default ProductDetailPage