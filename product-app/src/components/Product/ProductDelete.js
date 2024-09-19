import axios from 'axios';
import React, { useState } from 'react';

import { useParams } from 'react-router-dom';

function ProductDelete() {
    const { productId } = useParams();
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/products/${productId}`);
            setMessage('Product deleted successfully.');
        } catch (error) {
            setError('Failed to delete product');
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Delete Product</h1>
            {error && <p>{error}</p>}
            {message && <p>{message}</p>}
            <button onClick={handleDelete}>Delete Product</button>
        </div>
    );
}

export default ProductDelete;
