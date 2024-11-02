import ProductListPageComponent from "./components/ProductListPageComponent";
import axios from "axios";

const getProducts = async () => {
  const { data } = await axios.get("/api/products");
  return data;
};

const ListOfProductPage = () => {
  return <ProductListPageComponent getProducts={getProducts} />;
};

export default ListOfProductPage;
