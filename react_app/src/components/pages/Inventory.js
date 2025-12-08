import React, { useState, useEffect } from 'react';
import './css/Inventory.css';

function Inventory() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    fetch('/api/products', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => {
      setProducts(data);
      setLoading(false);
    })
    .catch(err => {
      console.error('Inventory error:', err);
      setLoading(false);
    });
  }, []);

  const openModal = () => {
    document.getElementById('productModal').style.display = 'flex';
  };

  const closeModal = () => {
    document.getElementById('productModal').style.display = 'none';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('jwtToken');
    const formData = {
      name: document.getElementById('productName').value,
      description: document.getElementById('productDescription').value,
      price: parseFloat(document.getElementById('productPrice').value),
      category: document.getElementById('productCategory').value,
      stock: parseInt(document.getElementById('productStock').value)
    };

    try {
      const response = await fetch('http://localhost:8080/api/products', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setProducts([...products, formData]);
        closeModal();
      } else {
        console.error('Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="inventory-container">
      <nav className="navbar">
        <h1>Products Management</h1>
        <ul className="nav-links">
          <li><a href="/dashboard">Dashboard</a></li>
          <li><a href="/products">Products</a></li>
          <li><a href="/inventory">Inventory</a></li>
          <li><a href="/cart">🛒 Cart</a></li>
        </ul>
        <div className="user-info">
          <span>{localStorage.getItem('username') || 'Loading...'}</span>
          <span className="role-badge">Loading...</span>
          <button onClick={() => {
            localStorage.clear();
            window.location.href = '/login';
          }}>Logout</button>
        </div>
      </nav>

      <div className="inventory-content">
        <div className="header-section">
          <h2>Product Management</h2>
          <p>Manage your store products</p>
          <button onClick={openModal}>Add New Product</button>
        </div>
        {loading ? (
          <div className="loading">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="no-products">
            <h3>No Products Found</h3>
            <p>Start by adding your first product to the store.</p>
          </div>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>₹{product.price}</p>
                <p>Stock: {product.stock}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div id="productModal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeModal}>&times;</span>
          <h3>Add New Product</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="productName">Product Name:</label>
              <input type="text" id="productName" required />
            </div>
            <div className="form-group">
              <label htmlFor="productDescription">Description:</label>
              <textarea id="productDescription" rows="3" required></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="productPrice">Price (₹):</label>
              <input type="number" id="productPrice" step="0.01" required />
            </div>
            <div className="form-group">
              <label htmlFor="productCategory">Category:</label>
              <input type="text" id="productCategory" required />
            </div>
            <div className="form-group">
              <label htmlFor="productStock">Stock Quantity:</label>
              <input type="number" id="productStock" required />
            </div>
            <button type="submit">Add Product</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Inventory;