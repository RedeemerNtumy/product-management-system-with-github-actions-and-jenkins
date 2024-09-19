import React, { useState } from 'react';
import axios from 'axios';

function CategoryCreate() {
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const params = new URLSearchParams();
            params.append('name', name);
            const response = await axios.post(`/api/categories?${params.toString()}`);
            if (response.status === 200) {
                setSuccess('Category added successfully!');
                setName(''); // Clear input after successful submission
                setError('');
            } else {
                throw new Error('Failed to create category');
            }
        } catch (err) {
            console.error(err); // It's helpful to log the error for debugging
            setError('Failed to create category. Please try again.');
            setSuccess('');
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
            <h2>Add New Category</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter category name"
                    style={{ padding: '10px', fontSize: '16px' }}
                />
                <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#FF9900', border: 'none', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>
                    Add Category
                </button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
            </form>
        </div>
    );
}

export default CategoryCreate;
