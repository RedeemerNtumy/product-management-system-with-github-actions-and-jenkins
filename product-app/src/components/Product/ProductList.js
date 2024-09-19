import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useDebounce from './useDebounce';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(5);
    const [editId, setEditId] = useState(null);
    const [editedName, setEditedName] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 300);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, [debouncedSearchTerm]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await axios.get(debouncedSearchTerm ? `/api/products/searchProducts?searchTerm=${encodeURIComponent(debouncedSearchTerm)}` : '/api/products');
            setProducts(response.data || []);
        } catch (err) {
            setError('Failed to fetch products. Please try again later.');
        }
        setLoading(false);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleEdit = (product) => {
        setEditId(product.id);
        setEditedName(product.name);
    };

    const saveEdit = async (id, name) => {
        try {
            await axios.put(`/api/products/${id}`, { newName: name });
            setEditId(null);
            fetchProducts(); // Refresh the list
            setError('');
        } catch (err) {
            setError('Failed to update product. Please try again later.');
        }
    };

    const cancelEdit = () => {
        setEditId(null);
    };

    const handleDelete = async (productId) => {
        try {
            await axios.delete(`/api/products/${productId}`);
            fetchProducts(); // Refresh the list after deletion
        } catch (err) {
            setError('Failed to delete product. Please try again later.');
        }
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div style={{padding: '20px', maxWidth: '1200px', margin: 'auto', fontFamily: 'Arial, sans-serif'}}>
            <h2>Product List</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Enter product name"
                    style={{padding: '10px', margin: '10px', width: '300px'}}
                />
            </form>
            {loading && <p>Loading...</p>}
            {error && <p style={{color: 'red'}}>{error}</p>}
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
                {currentProducts.map((product) => (
                    <div key={product.id} style={{
                        margin: '10px',
                        border: '1px solid #ccc',
                        padding: '20px',
                        width: '220px',
                        borderRadius: '4px'
                    }}>
                        <img src={product.imageUrl || "/logo512.png"} alt="Product"
                             style={{width: '100%', marginBottom: '8px'}}/>
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>${product.price}</p>
                        {editId === product.id ? (
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
                                <button onClick={() => saveEdit(product.id, editedName)} style={{
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
                                <button onClick={() => handleEdit(product)} style={{
                                    backgroundColor: '#FF9900',
                                    color: 'white',
                                    padding: '10px',
                                    borderRadius: '4px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    width: '100%'
                                }}>Edit
                                </button>
                                <button onClick={() => handleDelete(product.id)} style={{
                                    backgroundColor: '#f44336',
                                    color: 'white',
                                    padding: '10px',
                                    borderRadius: '4px',
                                    textAlign: 'center',
                                    textDecoration: 'none',
                                    marginTop: '8px'
                                }}>Delete
                                </button>
                            </>
                        )}
                    </div>
                ))}
            </div>
            <div style={{textAlign: 'center', marginTop: '20px'}}>
                {[...Array(Math.ceil(products.length / productsPerPage)).keys()].map(number => (
                    <button key={number + 1}
                            onClick={() => paginate(number + 1)}
                            style={{
                                backgroundColor: currentPage === number + 1 ? '#FF9900' : 'white',
                                color: currentPage === number + 1 ? 'white' : '#FF9900', // Text color changes based on selection
                                padding: '10px',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                margin: '5px',
                                border: '1px solid #FF9900' // Consistent border color
                            }}>
                        {number + 1}
                    </button>
                ))}
            </div>

        </div>
    );
}

export default ProductList;
