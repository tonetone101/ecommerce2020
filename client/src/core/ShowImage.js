import React from "react";
import { API } from "../config";

const ShowImage = ({ item, url }) => {
  return (
    <div className="product-img">
      <img
        id="product-img"
        className="mb-3"
        src={`/api/product/photo/${item._id}`}
        alt={item.name}
        style={{ maxHeight: "400px", maxWidth: "200px" }}
      />
    </div>
  );
};

export default ShowImage;
