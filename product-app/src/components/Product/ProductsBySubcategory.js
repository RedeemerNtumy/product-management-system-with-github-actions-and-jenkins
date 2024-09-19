import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ProductsBySubcategory() {
    const { subcategoryId } = useParams();
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`/api/products/subcategory/${subcategoryId}`);
                setProducts(response.data);
            } catch (error) {
                setError('Failed to fetch products');
                console.error(error);
            }
        };

        fetchProducts();
    }, [subcategoryId]);

    return (
        <div>
            <h1>Products in Subcategory</h1>
            {error && <p>{error}</p>}
            {products.length > 0 ? (
                <ul>
                    {products.map((product) => (
                        <li key={product.id}>{product.name}</li>
                    ))}
                </ul>
            ) : (
                <p>No products found in this subcategory.</p>
            )}
        </div>
    );
}

export default ProductsBySubcategory;
