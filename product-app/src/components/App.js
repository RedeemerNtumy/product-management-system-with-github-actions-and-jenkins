import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CategoryCreate from './Category/CategoryCreate';
import SubcategoryCreate from './Category/SubcategoryCreate';
import ProductAdd from './Product/ProductAdd';
import CategoryList from './Category/CategoryList';
import CategoryDetails from './Category/CategoryDetails';
import ProductList from './Product/ProductList';
import ProductUpdate from './Product/ProductUpdate'; // Ensure this file is implemented
import ProductDelete from './Product/ProductDelete';
import ProductDetails from "./Product/ProductDetails";
// Ensure this file is implemented
import './App.css'; // Assuming you have some global styles defined here

function App() {
    return (
        <Router>
            <div style={{ padding: '10px', backgroundColor: '#232F3E', color: 'white' }}>
                <h1 style={{ textAlign: 'center' }}>Product Management System</h1>
                <nav style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                    <Link to="/add-category" style={{ color: 'white', textDecoration: 'none' }}>Add Category</Link>
                    <Link to="/add-subcategory" style={{ color: 'white', textDecoration: 'none' }}>Add Subcategory</Link>
                    <Link to="/add-product" style={{ color: 'white', textDecoration: 'none' }}>Add Product</Link>
                    <Link to="/categories" style={{ color: 'white', textDecoration: 'none' }}>Manage Categories</Link>
                    <Link to="/products" style={{ color: 'white', textDecoration: 'none' }}>Manage Products</Link>


                </nav>
            </div>
            <Routes>
                <Route path="/add-category" element={<CategoryCreate />} />
                <Route path="/add-subcategory" element={<SubcategoryCreate />} />
                <Route path="/add-product" element={<ProductAdd />} />
                <Route path="/categories" element={<CategoryList />} />
                <Route path="/categories/:categoryId" element={<CategoryDetails />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/products/:productId/update" element={<ProductUpdate />} />
                <Route path="/products/:productId/delete" element={<ProductDelete />} />
                <Route path="/products/:productId" render={(props) => <ProductDetails {...props} />} />
            </Routes>
        </Router>
    );
}

export default App;
