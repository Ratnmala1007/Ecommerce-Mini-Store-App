import React, { useState, useEffect } from 'react';
import './css/Cart.css';

function Cart() {
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    const userId = 1; // Replace with dynamic userId
    fetch(`http://localhost:8080/api/cart?userId=${userId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => {
      setCartItems(data);
      setTotal(data.reduce((sum, item) => sum + item.price * item.quantity, 0));
      setLoading(false);
    })
    .catch(err => {
      console.error('Cart error:', err);
      setLoading(false);
    });
  }, []);

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 0) return;
    const token = localStorage.getItem('jwtToken');
    try {
      const response = await fetch(`/api/cart/${itemId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ quantity: newQuantity })
      });
      if (response.ok) {
        const updatedItems = cartItems.map(item =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        );
        setCartItems(updatedItems);
        setTotal(updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0));
      }
    } catch (error) {
      console.error('Update quantity error:', error);
    }
  };

  const removeItem = async (itemId) => {
    const token = localStorage.getItem('jwtToken');
    try {
      const response = await fetch(`http://localhost:8080/api/cart/${itemId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const updatedItems = cartItems.filter(item => item.id !== itemId);
        setCartItems(updatedItems);
        setTotal(updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0));
      }
    } catch (error) {
      console.error('Remove item error:', error);
    }
  };

  const checkout = async () => {
    const token = localStorage.getItem('jwtToken');
    const userId = 1; // Replace with dynamic userId
    try {
      const response = await fetch(`http://localhost:8080/api/orders/checkout?userId=${userId}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        setCartItems([]);
        setTotal(0);
        alert('Checkout successful!');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Checkout failed. Please try again.');
    }
  };

  return (
    <div className="cart-container">
      <nav className="navbar">
        <h1>Shopping Cart</h1>
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

      <div className="cart-content">
        {loading ? (
          <div className="loading">Loading cart...</div>
        ) : cartItems.length === 0 ? (
          <div className="empty-cart">
            <h3>Your Cart is Empty</h3>
            <p>Start shopping by adding items from the Products page.</p>
            <a href="/products" className="shop-now">Shop Now</a>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <h3>{item.name}</h3>
                  <p>₹{item.price} x <input
                    type="number"
                    value={item.quantity}
                    min="0"
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    className="quantity-input"
                  /></p>
                  <p>Total: ₹{item.price * item.quantity}</p>
                  <button onClick={() => removeItem(item.id)} className="remove-btn">Remove</button>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <h3>Total: ₹{total.toFixed(2)}</h3>
              <button onClick={checkout} className="checkout-btn">Proceed to Checkout</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;