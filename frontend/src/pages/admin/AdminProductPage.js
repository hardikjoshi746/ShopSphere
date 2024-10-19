import ProductPageComponent from "./components/ProductPageComponent";

import axios from "axios";

const fetchProduct = async (abctlr) => {
  const { data } = await axios.get("/api/products/admin", {
    signal: abctlr.signal,
  });
  return data;
};

const deleteProduct = async (productId) => {
  const { data } = await axios.delete(`/api/products/admin/${productId}`); // delete product
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
