import { Row, Col, Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import AdminLinksComponent from "../../../components/admin/AdminLinksComponent";
import { useEffect, useState } from "react";

const ProductPageComponent = ({ fetchProduct, deleteProduct }) => {
  const [products, setProducts] = useState([]); // products state
  const [productDeleted, setProductDeleted] = useState(false); // product deleted state

  const deleteHandler = async (productId) => {
    if (window.confirm("Are you sure?")) {
      // confirm before delete
      const data = await deleteProduct(productId); // delete product
      if (data.message === "Product deleted successfully") {
        // check if product deleted successfully
        setProductDeleted(!productDeleted); // update product deleted state
      }
    }
  };

  useEffect(() => {
    const abctlr = new AbortController(); // abort controller
    fetchProduct(abctlr)
      .then((res) => setProducts(res))
      .catch((err) => {
        if (err.response) {
          console.log(
            err.response.data.message
              ? err.response.data.message
              : err.response.data
          );
        } else {
          console.log("Error:", err.message); // Handle case when err.response is undefined
        }
      });
    return () => abctlr.abort(); // cleanup
  }, [productDeleted]);
  return (
    <Row className="m-5">
      <Col md={2}>
        <AdminLinksComponent />
      </Col>
      <Col md={10}>
        <h1>
          Product List{" "}
          <LinkContainer to="/admin/create-new-product">
            <Button variant="primary" size="lg">
              Create new
            </Button>
          </LinkContainer>
        </h1>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.category}</td>
                <td>
                  <LinkContainer to={`/admin/edit-product/${item._id}`}>
                    <Button className="btn-sm">
                      <i className="bi bi-pencil-square"></i>
                    </Button>
                  </LinkContainer>
                  {" / "}
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(item._id)}
                  >
                    <i className="bi bi-x-circle"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default ProductPageComponent;
