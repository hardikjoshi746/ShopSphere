import ProductPageComponent from "./components/ProductPageComponent";

import axios from "axios";

const fetchProduct = async (abctlr) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_API_URL}/products/admin`,
    {
      signal: abctlr.signal,
    }
  );
  return data;
};

const deleteProduct = async (productId) => {
  const { data } = await axios.delete(
    `${process.env.REACT_APP_API_URL}/products/admin/${productId}`
  ); // delete product
  return data;
};

const AdminProductPage = () => {
  return (
    <ProductPageComponent
      fetchProduct={fetchProduct}
      deleteProduct={deleteProduct}
    />
  );
};

export default AdminProductPage;
