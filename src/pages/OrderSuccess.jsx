import { useEffect, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";

function OrderSuccess() {
  const { orderId } = useParams();
  const location = useLocation();

  const [order, setOrder] = useState(location.state?.order || null);

  useEffect(() => {
    if (!order) {
      const orders = JSON.parse(localStorage.getItem("orders") || "[]");
      const found = orders.find((o) => o.orderId === orderId);
      if (found) {
        setOrder(found);
      }
    }
  }, [order, orderId]);

  if (!order) {
    return (
      <div className="empty-cart-card" style={{ margin: "50px auto" }}>
        <h2>Order Information Not Found</h2>
        <p>We could not find the details for Order #{orderId}.</p>
        <Link to="/products" className="shop-now-btn">
          Back to Store
        </Link>
      </div>
    );
  }

  return (
    <div className="order-success-container">
      <div className="success-banner-card">
        <div className="success-icon-badge">✓</div>
        <h1>Order Confirmed!</h1>
        <p className="success-subtitle">
          Thank you for shopping with Fashion Store! Your order has been placed and is being prepared for dispatch.
        </p>

        <div className="order-meta-pill">
          <span><strong>Order ID:</strong> #{order.orderId}</span>
          <span>•</span>
          <span><strong>Date:</strong> {order.orderDate}</span>
          <span>•</span>
          <span><strong>Status:</strong> <span className="status-badge-confirmed">{order.status}</span></span>
        </div>
      </div>

      <div className="order-details-grid">
        {/* Left Column: Delivery & Payment Details */}
        <div className="order-info-column">
          <div className="info-box-card">
            <h3>📦 Delivery Information</h3>
            <p className="delivery-highlight">
              Estimated Delivery: <strong>{order.estimatedDelivery}</strong>
            </p>
            <div className="address-display">
              <p><strong>{order.shippingAddress.fullName}</strong></p>
              <p>{order.shippingAddress.street}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state} -{" "}
                {order.shippingAddress.pincode}
              </p>
              <p>Phone: +91 {order.shippingAddress.phone}</p>
            </div>
          </div>

          <div className="info-box-card">
            <h3>💳 Payment Summary</h3>
            <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
            <p>
              <strong>Payment Status:</strong>{" "}
              <span style={{ color: "#16a34a", fontWeight: "bold" }}>
                {order.paymentMethod.includes("COD") ? "To be paid on delivery" : "Paid Securely"}
              </span>
            </p>
          </div>
        </div>

        {/* Right Column: Ordered Items Receipt */}
        <div className="order-items-column">
          <div className="info-box-card">
            <h3>Ordered Items ({order.items?.length || 0})</h3>

            <div className="receipt-items-list">
              {order.items?.map((item) => (
                <div key={item.id} className="receipt-item-row">
                  <img src={item.image} alt={item.name} />
                  <div className="receipt-item-details">
                    <h4>{item.name}</h4>
                    <p>Brand: {item.brand}</p>
                    <p>Qty: {item.quantity || 1}</p>
                  </div>
                  <div className="receipt-item-price">
                    ₹{((item.price || 0) * (item.quantity || 1)).toLocaleString("en-IN")}
                  </div>
                </div>
              ))}
            </div>

            <hr className="summary-divider" />

            <div className="summary-row">
              <span>Subtotal:</span>
              <span>₹{order.subtotal?.toLocaleString("en-IN")}</span>
            </div>

            <div className="summary-row">
              <span>Delivery Charges:</span>
              <span>
                {order.shipping === 0 ? "FREE" : `₹${order.shipping}`}
              </span>
            </div>

            <hr className="summary-divider" />

            <div className="summary-row grand-total-row">
              <span>Total Paid:</span>
              <span>₹{order.totalAmount?.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="order-actions-bar">
        <Link to="/orders" className="view-orders-btn">
          View All My Orders
        </Link>
        <Link to="/products" className="continue-shopping-btn">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default OrderSuccess;
