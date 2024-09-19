import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ProductsByCategory() {
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`/api/products/category/${categoryId}`);
                setProducts(response.data);
            } catch (error) {
                setError('Failed to fetch products');
                console.error(error);
            }
        };

        fetchProducts();
    }, [categoryId]);

    return (
        <div>
            <h1>Products in Category</h1>
            {error && <p>{error}</p>}
            {products.length > 0 ? (
                <ul>
                    {products.map((product) => (
                        <li key={product.id}>{product.name}</li>
                    ))}
                </ul>
            ) : (
                <p>No products found in this category.</p>
            )}
        </div>
    );
}

export default ProductsByCategory;
