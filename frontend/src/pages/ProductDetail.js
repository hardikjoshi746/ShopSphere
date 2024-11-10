import ProductDetailPageComponent from "./components/ProductDetailPageComonent";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/actions/cartActions";

const ProductDetailPage = () => {
  const dispatch = useDispatch();

  return (
    <ProductDetailPageComponent
      addToCartReduxAction={addToCart}
      reduxDispatch={dispatch}
    />
  );
};

export default ProductDetailPage;
