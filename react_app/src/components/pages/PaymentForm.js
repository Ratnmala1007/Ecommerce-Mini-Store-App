import React, { useState } from 'react';
import './css/PaymentForm.css';

function PaymentForm() {
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const token = localStorage.getItem('jwtToken');
    const userId = 1; // Replace with dynamic userId
    const total = 100; // Replace with dynamic total from cart

    try {
      const response = await fetch(`/api/orders/pay?userId=${userId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...paymentDetails, total })
      });

      if (response.ok) {
        setSuccess('Payment successful! Order placed.');
        setTimeout(() => (window.location.href = '/dashboard'), 2000);
      } else {
        setError('Payment failed. Please check your details.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <nav className="navbar">
        <h1>Payment</h1>
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

      <div className="payment-content">
        <h2>Enter Payment Details</h2>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="cardNumber">Card Number:</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={paymentDetails.cardNumber}
              onChange={handleChange}
              placeholder="1234 5678 9012 3456"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="expiryDate">Expiry Date:</label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              value={paymentDetails.expiryDate}
              onChange={handleChange}
              placeholder="MM/YY"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="cvv">CVV:</label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={paymentDetails.cvv}
              onChange={handleChange}
              placeholder="123"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Name on Card:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={paymentDetails.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Processing...' : 'Pay Now'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PaymentForm;