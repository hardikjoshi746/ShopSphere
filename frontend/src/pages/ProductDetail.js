import ProductDetailPageComponent from "./components/ProductDetailPageComonent";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/actions/cartActions";

const ProductDetailPage = () => {
  const products = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(addToCart());
  };

  return (
    <ProductDetailPageComponent
      addToCartHandler={addToCartHandler}
      products={products}
    />
  );
};

export default ProductDetailPage;
