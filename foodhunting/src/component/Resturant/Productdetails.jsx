import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { id, jsonType } = useParams(); // Get ID and jsonType from URL
  const [product, setProduct] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate loading time
      console.log("System is running")
      let jsonData;

      // Dynamically import the correct JSON file based on jsonType
      try {
        jsonData = await import(`../../assets/JsonData/${jsonType}.json`);
        console.log(jsonData)
      } catch (error) {
        console.error("Error loading JSON data:", error);
        setLoading(false);
        return;
      }

      // Find the product by ID
      const items = jsonData[jsonType];
      let foundProduct = null;

      if (jsonType === 'Main_Course') {
        // Loop through categories to find the item
        for (const category of jsonData.menu) {
          foundProduct = category.items.find(item => item.itemId === parseInt(id));
          if (foundProduct) break; // Stop searching if found
        }

      } else if (jsonType === 'Beverages') {
        foundProduct = jsonData.beverages.find(item => item.itemId === parseInt(id));
      } else if (jsonType === 'dessert') {
        for (const category of jsonData.desserts) {
          foundProduct = category.items.find(item => item.itemId === parseInt(id));
          if (foundProduct) break; // Stop searching if found
        }
      }
      console.log(foundProduct)
      setProduct(foundProduct);
      setLoading(false);
    };

    fetchProductDetails();
  }, [id, jsonType]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>Product not found!</p>;
  }

  return (
    <div className="container-max">
        console.log("product")
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover" />
      <p>{product.description}</p>
      <p className="text-lg font-semibold">${product.price}</p>
      <p>Rating: {product.rating} ★</p>
    </div>
  );
};

export default ProductDetails;
