import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { read, listRelated } from "./apiCore";
import Card from "./Card";

const Product = (props) => {
  console.log(props);
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [runProduct, setRunProduct] = useState(false);

  const [error, setError] = useState(false);

  const singleProduct = (productId) => {
    read(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        // fetch related products here
        listRelated(data._id).then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setRelatedProduct(data);
          }
        });
      }
    });
  };

  useEffect(() => {
    // grabs productId from params
    const productId = props.match.params.productId;
    singleProduct(productId);
  }, [runProduct]); // when props changes useEffect runs again

  return (
    <Layout
      title={product && product.name}
      description={
        product && product.description && product.description.substring(0, 100)
      }
      className="container-fluid"
    >
      <div className="row">
        <div className="col-8">
          {product && product.description && (
            <Card
              showViewProductButton={false}
              product={product}
              runProduct={runProduct}
              setRunProduct={setRunProduct}
            />
          )}
        </div>
        <div className="col-4">
          <h4>Related products</h4>
          {relatedProduct.map((p, i) => (
            <div className="mb-3">
              <Card
                key={i}
                product={p}
                runProduct={runProduct}
                setRunProduct={setRunProduct}
              />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Product;
