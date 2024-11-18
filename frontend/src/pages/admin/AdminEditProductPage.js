import EditProductPageComponent from "./components/EditProductPageComponent";
import { useSelector } from "react-redux";
import axios from "axios";

const fetchProducts = async (productId) => {
  const { data } = await axios.get(`/api/products/get-one/${productId}`);
  return data;
};

const updateEditProductApiRequest = async (productId, formInput) => {
  const { data } = await axios.put(`/api/products/admin/${productId}`, {
    ...formInput, // The formInput object is spread into the request body
  }); // axios.put is a function that sends a PUT request to the specified endpoint
  return data; // The response data is returned
};

const AdminEditProductPage = () => {
  const { categories } = useSelector((state) => state.getCategories); // useSelector is a hook to extract data from the Redux store state, using a selector function.

  return (
    <EditProductPageComponent
      categories={categories}
      fetchProducts={fetchProducts}
      updateEditProductApiRequest={updateEditProductApiRequest}
    />
  );
};

export default AdminEditProductPage;
