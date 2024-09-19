import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ProductUpdate() {
    const { productId } = useParams();
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`/api/products/${productId}`);
                setName(response.data.name);
            } catch (error) {
                setError('Failed to fetch product details');
            }
        };
        fetchProduct();
    }, [productId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/products/${productId}`, { name });
            setSuccess('Product updated successfully.');
        } catch (error) {
            setError('Failed to update product');
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Update Product</h1>
            {error && <p>{error}</p>}
            {success && <p>{success}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Product Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <button type="submit">Update Product</button>
            </form>
        </div>
    );
}

export default ProductUpdate;
