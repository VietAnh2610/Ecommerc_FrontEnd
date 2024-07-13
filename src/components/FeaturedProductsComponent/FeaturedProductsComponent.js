import React from 'react';
import CartComponents from '../CartComponents/CartComponents'; 
import * as ProductService from "../../services/ProductService";
import { useQuery } from "@tanstack/react-query";
const FeaturedProductsComponent = () => {
    const fetchProductAll = async () => {
        const res = await ProductService.getAllProduct();
        return res;
      };
      const { data: products } = useQuery({
        queryKey: ["products"],
        queryFn: fetchProductAll,
      });
  return (
    <div className="products row d-flex flex-wrap">
      {products?.data
        ?.filter((product) => product.isFeatured) 
        .slice(0, 8)
        .map((product) => (
          <CartComponents
            key={product._id}
            id={product._id}
            countInStock={product.countInStock}
            descriptions={product.description}
            image={product.image}
            name={product.name}
            price={product.price}
            rating={product.rating}
            type={product.type}
            original_price={product.original_price}
            size={product.size}
            color={product.color}
          />
        ))}
    </div>
  );
};

export default FeaturedProductsComponent;
