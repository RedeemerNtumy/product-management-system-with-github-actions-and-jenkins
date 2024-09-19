import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SubcategoryCreate() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [subcategoryName, setSubcategoryName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/categories');
                setCategories(response.data);
            } catch (err) {
                setError('Failed to fetch categories.');
            }
        };
        fetchCategories();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedCategory) {
            setError('Please select a category.');
            return;
        }
        try {
            const params = new URLSearchParams();
            params.append('name', subcategoryName);
            const response = await axios.post(`/api/categories/${selectedCategory}/subcategories?${params.toString()}`);
            if (response.status === 200) {
                setSuccess('Subcategory added successfully!');
                setSubcategoryName(''); // Clear input after successful submission
                setError('');
            } else {
                throw new Error('Failed to create subcategory');
            }
        } catch (err) {
            console.error(err);
            setError('Failed to create subcategory. Please try again.');
            setSuccess('');
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
            <h2>Add New Subcategory</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    style={{ padding: '10px', fontSize: '16px' }}
                >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    value={subcategoryName}
                    onChange={(e) => setSubcategoryName(e.target.value)}
                    placeholder="Enter subcategory name"
                    style={{ padding: '10px', fontSize: '16px' }}
                />
                <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#FF9900', border: 'none', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>
                    Add Subcategory
                </button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
            </form>
        </div>
    );
}

export default SubcategoryCreate;
