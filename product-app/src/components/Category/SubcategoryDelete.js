import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function SubcategoryDelete() {
    const { categoryId, subcategoryId } = useParams();
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/categories/${categoryId}/subcategories/${subcategoryId}`);
            setMessage('Subcategory deleted successfully.');
        } catch (error) {
            setError('Failed to delete subcategory');
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Delete Subcategory</h1>
            {error && <p>{error}</p>}
            {message && <p>{message}</p>}
            <button onClick={handleDelete}>Delete Subcategory</button>
        </div>
    );
}

export default SubcategoryDelete;
