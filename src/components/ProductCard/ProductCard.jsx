import React from "react";
import GroceryCard from "./GroceryCart/GroceryCard";
import ClothingCard from "./ClothingCart/ClothingCard";
import ElectronicsCard from "./GroceryCart/GroceryCard";

const ProductCard = ({ product }) => {
  switch (product.category) {
    case "Groceries":
      return <GroceryCard product={product} />;
    case "Clothing":
      return <ClothingCard product={product} />;
    case "Electronics":
      return <ElectronicsCard product={product} />;
    default:
      return <GroceryCard product={product} />; // Fallback to GroceryCard
  }
};

export default ProductCard;
