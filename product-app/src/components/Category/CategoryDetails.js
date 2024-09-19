import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function CategoryDetails() {
    const { categoryId } = useParams();
    const [category, setCategory] = useState(null);
    const [error, setError] = useState('');

    const handleDeleteSubcategory = async (subcategoryId) => {
        try {
            await axios.delete(`/api/categories/${categoryId}/subcategories/${subcategoryId}`);
            // Refresh subcategories list after deletion
            const updatedSubcategories = category.subcategories.filter(sub => sub.id !== subcategoryId);
            setCategory({ ...category, subcategories: updatedSubcategories });
            alert('Subcategory deleted successfully!');
        } catch (err) {
            alert('Failed to delete subcategory.');
        }
    };


    useEffect(() => {
        const fetchCategoryDetails = async () => {
            try {
                const response = await axios.get(`/api/categories/${categoryId}`);
                setCategory(response.data);
            } catch (err) {
                setError('Failed to fetch category details.');
            }
        };
        fetchCategoryDetails();
    }, [categoryId]);

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
            <h2>Category Details</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {category ? (
                <div>
                    <h3>{category.name}</h3>
                    <h4>Subcategories:</h4>
                    <ul>
                        {category.subcategories.map(subcategory => (
                            <li key={subcategory.id}>
                                {subcategory.name}
                                <button onClick={() => handleDeleteSubcategory(subcategory.id)} style={{ marginLeft: '10px' }}>
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : <p>Loading category details...</p>}
        </div>
    );
}

export default CategoryDetails;
