import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    try {
      const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
      setOrders(savedOrders);
    } catch {
      setOrders([]);
    }
  }, []);

  return (
    <div className="orders-page-container">
      <h1 className="page-title">My Orders</h1>

      {orders.length === 0 ? (
        <div className="empty-cart-card">
          <div className="empty-cart-icon">📦</div>
          <h2>No Orders Found</h2>
          <p>You haven't placed any orders yet. Start shopping now!</p>
          <Link to="/products" className="shop-now-btn">
            Explore Fashion Collection
          </Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.orderId} className="order-history-card">
              <div className="order-history-header">
                <div>
                  <span className="order-id-label">Order #{order.orderId}</span>
                  <span className="order-date-text">Placed on {order.orderDate}</span>
                </div>
                <div className="order-header-right">
                  <span className="order-status-tag">{order.status || "Confirmed"}</span>
                  <span className="order-total-badge">
                    ₹{order.totalAmount?.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <div className="order-history-body">
                <div className="order-history-items">
                  {order.items?.map((item) => (
                    <div key={item.id} className="history-item-row">
                      <img src={item.image} alt={item.name} />
                      <div className="history-item-info">
                        <h4>{item.name}</h4>
                        <p>Brand: {item.brand}</p>
                        <p>Quantity: {item.quantity || 1}</p>
                        <p className="history-price">
                          ₹{((item.price || 0) * (item.quantity || 1)).toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="order-history-details">
                  <h4>Delivery Address:</h4>
                  <p><strong>{order.shippingAddress?.fullName}</strong></p>
                  <p>{order.shippingAddress?.street}</p>
                  <p>
                    {order.shippingAddress?.city}, {order.shippingAddress?.state} -{" "}
                    {order.shippingAddress?.pincode}
                  </p>
                  <p>Phone: +91 {order.shippingAddress?.phone}</p>

                  <div className="order-meta-info">
                    <p>
                      <strong>Payment:</strong> {order.paymentMethod}
                    </p>
                    <p>
                      <strong>Delivery By:</strong> {order.estimatedDelivery}
                    </p>
                  </div>

                  <Link
                    to={`/order-success/${order.orderId}`}
                    state={{ order }}
                    className="view-receipt-link"
                  >
                    View Order Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
