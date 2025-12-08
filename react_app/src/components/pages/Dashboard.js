import React, { useState, useEffect } from 'react';
import './css/Dashboard.css';
// 3.14159  * r^2
// 4/3 * π * r^3
// Area of Circle = π * r^2
// Volume of Sphere = 4/3 * π * r^3
// Area of Circle = π * r^2

function Dashboard() {
  const [userRole, setUserRole] = useState('Not set');
  const [username, setUsername] = useState('Not set');
  const [productsCount, setProductsCount] = useState(0);
  const [showDebug, setShowDebug] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      fetch('/api/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => {
        setUserRole(data.role || 'CUSTOMER');
        setUsername(data.username || 'User');
        setProductsCount(data.productsCount || 0);
      })
      .catch(err => console.error('Dashboard error:', err));
    }
  }, []);

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <h1>Dashboard</h1>
        <ul className="nav-links">
          <li><a href="/dashboard">Dashboard</a></li>
          <li><a href="/products">Products</a></li>
          <li><a href="/inventory">Inventory</a></li>
          <li><a href="/cart">🛒 Cart</a></li>
        </ul>
        <div className="user-info">
          <span>{username}</span>
          <span className={`role-badge ${userRole.toLowerCase()}`}>{userRole}</span>
          <button onClick={() => {
            localStorage.clear();
            window.location.href = '/login';
          }}>Logout</button>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="welcome-section">
          <h2>Welcome {username}!</h2>
          <p>Role: {userRole}</p>
        </div>
        <div className="services-section">
          <h3>Our E-Commerce Services</h3>
          <ul className="services-list">
            {[
              { icon: '🛒', title: 'Online Shopping', desc: 'Browse and purchase a wide range of products from the comfort of your home.' },
              { icon: '💳', title: 'Secure Payments', desc: 'Enjoy fast and secure checkout with multiple payment options.' },
              { icon: '🚚', title: 'Fast Delivery', desc: 'Get your orders delivered quickly and reliably to your doorstep.' },
              { icon: '📦', title: 'Order Tracking', desc: 'Track your orders in real-time from purchase to delivery.' },
              { icon: '🔄', title: 'Easy Returns', desc: 'Hassle-free returns and exchanges for a smooth shopping experience.' },
              { icon: '🎁', title: 'Exclusive Offers', desc: 'Enjoy special discounts, deals, and seasonal promotions.' },
              { icon: '📞', title: 'Customer Support', desc: 'Get help anytime with our dedicated customer support team.' },
              { icon: '🛍️', title: 'Product Management', desc: 'Managers can add, update, and manage inventory with ease.' },
            ].map((service, index) => (
              <li key={index} className="service-card">
                <span role="img" aria-label={service.title.toLowerCase()}>{service.icon}</span>
                <strong>{service.title}</strong>
                <p>{service.desc}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="about-section">
          <h3>About Our Store 🛍️</h3>
          <p>This mini E-commerce Store is a demo project built with Spring Boot (backend) and Thymeleaf + JavaScript (frontend). It supports both Customer and Manager roles. Customers can browse and purchase products, while managers can add, update, or manage inventory.</p>
          <p>The goal of this project is to demonstrate JWT Authentication, Role-based Dashboard, and a simple yet functional store system.</p>
        </div>
        <div className="stats-section">
          <div className="stat-item">Total Products: {productsCount}</div>
          <div className="stat-item">Low Stock Alert: --</div>
          <div className="stat-item">Out of Stock: --</div>
          <div className="stat-item">Product Categories: --</div>
        </div>
        <div className="actions-section">
          <h3>Quick Actions</h3>
          <button>Browse All Products</button>
          <button>View Shopping Cart</button>
        </div>
        {showDebug && (
          <div className="debug-section">
            <p>User Role: {userRole}</p>
            <p>Username: {username}</p>
            <p>Products Count: {productsCount}</p>
            <button onClick={() => setShowDebug(false)}>Hide Debug</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;