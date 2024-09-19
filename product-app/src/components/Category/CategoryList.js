import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SubcategoryModal from './SubcategoryModal';

function CategoryList() {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');
    const [editId, setEditId] = useState(null);
    const [editedName, setEditedName] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [categoriesPerPage] = useState(5);
    const [modalOpen, setModalOpen] = useState(false);
    const [subcategories, setSubcategories] = useState([]);// Adjust number of categories per page as needed

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('/api/categories');
            setCategories(response.data);
        } catch (err) {
            setError('Failed to fetch categories. Please try again later.');
        }
    };

    const viewSubcategories = async (categoryId) => {
        try {
            const response = await axios.get(`/api/categories/${categoryId}/subcategories`);
            setSubcategories(response.data);
            setModalOpen(true);
        } catch (err) {
            setError('Failed to fetch subcategories. Please try again later.');
        }
    };

    const handleEdit = (category) => {
        setEditId(category.id);
        setEditedName(category.name);
    };

    const saveEdit = async (id, name) => {
        try {
            const response = await axios.put(`/api/categories/${id}`, { name });
            setEditId(null);
            fetchCategories(); // Refresh the list
            setError('');
        } catch (err) {
            setError('Failed to update category. Please try again later.');
        }
    };

    const cancelEdit = () => {
        setEditId(null);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/categories/${id}`);
            fetchCategories(); // Refresh the list
        } catch (err) {
            setError('Failed to delete category. Please try again later.');
        }
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const indexOfLastCategory = currentPage * categoriesPerPage;
    const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
    const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);

    return (
        <div style={{padding: '20px', maxWidth: '1200px', margin: 'auto', fontFamily: 'Arial, sans-serif'}}>
            <h2>Category List</h2>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
                {currentCategories.map((category) => (
                    <div key={category.id} style={{
                        margin: '10px',
                        border: '1px solid #ccc',
                        padding: '20px',
                        width: '220px',
                        borderRadius: '4px'
                    }}>
                        <img src="/logo512.png" alt="React Logo" style={{width: '100%', marginBottom: '8px'}}/>
                        <h3 style={{margin: '8px 0'}}>{category.name}</h3>
                        {editId === category.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editedName}
                                    onChange={(e) => setEditedName(e.target.value)}
                                    style={{
                                        margin: '8px 0',
                                        padding: '10px',
                                        borderRadius: '4px',
                                        border: '1px solid #ccc',
                                        width: '100%'
                                    }}
                                />
                                <button onClick={() => saveEdit(category.id, editedName)} style={{
                                    backgroundColor: '#4CAF50',
                                    color: 'white',
                                    padding: '10px',
                                    borderRadius: '4px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    width: '100%'
                                }}>Save
                                </button>
                                <button onClick={cancelEdit} style={{
                                    backgroundColor: '#ccc',
                                    color: 'white',
                                    padding: '10px',
                                    borderRadius: '4px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    width: '100%',
                                    marginTop: '8px'
                                }}>Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <button onClick={() => handleEdit(category)} style={{
                                    backgroundColor: '#FF9900',
                                    color: 'white',
                                    padding: '10px',
                                    borderRadius: '4px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    width: '100%'
                                }}>Edit
                                </button>
                                <button onClick={() => handleDelete(category.id)} style={{
                                    backgroundColor: '#D9534F',
                                    color: 'white',
                                    padding: '10px',
                                    borderRadius: '4px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    width: '100%',
                                    marginTop: '8px'
                                }}>Delete
                                </button>
                                <button onClick={() => viewSubcategories(category.id)} style={{
                                    display: 'block',
                                    backgroundColor: '#337AB7',
                                    color: 'white',
                                    padding: '10px',
                                    borderRadius: '4px',
                                    textAlign: 'center',
                                    textDecoration: 'none',
                                    marginTop: '8px'
                                }}>
                                    View Subcategories
                                </button>
                            </>
                        )}
                    </div>
                ))}
            </div>
            <div style={{textAlign: 'center', marginTop: '20px'}}>
                {[...Array(Math.ceil(categories.length / categoriesPerPage)).keys()].map(number => (
                    <button key={number + 1}
                            onClick={() => paginate(number + 1)}
                            style={{
                                backgroundColor: currentPage === number + 1 ? '#FF9900' : 'white',
                                color: currentPage === number + 1 ? 'white' : '#FF9900', // This will make the text color white for the selected and orange for others
                                padding: '10px',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                margin: '5px',
                                border: '1px solid #FF9900' // Keeping the border consistent
                            }}>
                        {number + 1}
                    </button>
                ))}
            </div>
            <SubcategoryModal isOpen={modalOpen} onClose={() => setModalOpen(false)} subcategories={subcategories}/>
        </div>

    );
}

export default CategoryList;
