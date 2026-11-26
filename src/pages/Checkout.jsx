
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { clearCart } from "../features/cartSlice";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const directItem = location.state?.directItem;
  const cartItems = useSelector((state) => state.cart || []);
  const itemsToOrder = directItem ? [directItem] : cartItems;

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: ""
  });

  const [paymentMethod, setPaymentMethod] = useState("card");

  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardHolder: "",
    expiry: "",
    cvv: ""
  });

  const [upiMethod, setUpiMethod] = useState("gpay");
  const [upiId, setUpiId] = useState("");

  const [selectedBank, setSelectedBank] = useState("HDFC Bank");

  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState("");

  const subtotal = itemsToOrder.reduce(
    (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
    0
  );

  const shipping = subtotal > 999 || itemsToOrder.length === 0 ? 0 : 99;
  const totalAmount = subtotal + shipping;

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 16);
    const formatted = value.replace(/(\d{4})(?=\d)/g, "$1 ");
    setCardDetails({ ...cardDetails, cardNumber: formatted });
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 4);

    if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }

    setCardDetails({ ...cardDetails, expiry: value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) {
      toast.warning("Please log in to place an order.");
      navigate("/login", { state: { from: location } });
      return;
    }

    // Validate Address
    if (
      !address.fullName ||
      !address.phone ||
      !address.street ||
      !address.city ||
      !address.state ||
      !address.pincode
    ) {
      toast.error("Please fill in all shipping address fields.");
      return;
    }

    if (address.phone.trim().length < 10) {
      toast.error("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (address.pincode.trim().length !== 6) {
      toast.error("Please enter a valid 6-digit PIN code.");
      return;
    }

    // Validate Payment Details
    if (paymentMethod === "card") {
      const cleanNum = cardDetails.cardNumber.replace(/\s/g, "");

      if (cleanNum.length < 16) {
        toast.error("Please enter a valid 16-digit card number.");
        return;
      }

      if (!cardDetails.cardHolder.trim()) {
        toast.error("Please enter cardholder name.");
        return;
      }

      if (cardDetails.expiry.length < 5) {
        toast.error("Please enter valid expiry date (MM/YY).");
        return;
      }

      if (cardDetails.cvv.length < 3) {
        toast.error("Please enter valid 3-digit CVV.");
        return;
      }
    } else if (paymentMethod === "upi" && upiMethod === "id") {
      if (!upiId || !upiId.includes("@")) {
        toast.error("Please enter a valid UPI ID (e.g., yourname@okhdfcbank).");
        return;
      }
    }

    // Start simulated payment processing
    setIsProcessing(true);
    setProcessingStep("Connecting to secure payment gateway...");

    setTimeout(() => {
      setProcessingStep("Authorizing transaction...");
    }, 800);

    setTimeout(() => {
      setProcessingStep("Finalizing your order...");
    }, 1500);

    setTimeout(() => {
      const orderId = `FS-${Date.now().toString().slice(-6)}-${Math.floor(
        100 + Math.random() * 900
      )}`;

      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + 4);

      const deliveryFormatted = deliveryDate.toLocaleDateString("en-IN", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric"
      });

      const orderData = {
        orderId,
        orderDate: new Date().toLocaleString("en-IN", {
          dateStyle: "medium",
          timeStyle: "short"
        }),
        estimatedDelivery: deliveryFormatted,
        items: itemsToOrder,
        shippingAddress: address,
        paymentMethod:
          paymentMethod === "card"
            ? `Card (ending in ${cardDetails.cardNumber.slice(-4)})`
            : paymentMethod === "upi"
            ? `UPI (${upiMethod.toUpperCase()}${upiId ? `: ${upiId}` : ""})`
            : paymentMethod === "netbanking"
            ? `Net Banking (${selectedBank})`
            : "Cash on Delivery (COD)",
        subtotal,
        shipping,
        totalAmount,
        status: "Confirmed"
      };

      // Save order to localStorage
      const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
      existingOrders.unshift(orderData);
      localStorage.setItem("orders", JSON.stringify(existingOrders));

      // Clear cart if order is from cart
      if (!directItem) {
        dispatch(clearCart());
      }

      setIsProcessing(false);
      toast.success("Order placed successfully! 🎉");

      navigate(`/order-success/${orderId}`, {
        state: { order: orderData }
      });
    }, 2200);
  };

  if (itemsToOrder.length === 0) {
    return (
      <div className="empty-cart-card" style={{ margin: "50px auto" }}>
        <h2>No Items To Checkout</h2>
        <p>Please select a product or add items to your cart first.</p>
        <Link to="/products" className="shop-now-btn">
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-page-container">
      {isProcessing && (
        <div className="processing-overlay">
          <div className="processing-modal">
            <div className="payment-spinner"></div>
            <h3>Processing Payment</h3>
            <p className="processing-status">{processingStep}</p>
            <p className="security-notice">🔒 256-Bit SSL Encrypted & Secure</p>
          </div>
        </div>
      )}

      <h1 className="page-title">Checkout & Payment</h1>

      <form onSubmit={handlePlaceOrder} className="checkout-layout">
        <div className="checkout-main-content">
          {/* Section 1: Shipping Address */}
          <div className="checkout-card">
            <h2 className="section-title">
              <span className="step-badge">1</span> Delivery Address
            </h2>

            <div className="form-grid">
              <div className="form-group full-width">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="e.g. John Doe"
                  value={address.fullName}
                  onChange={handleAddressChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Mobile Number *</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="10-digit mobile number"
                  maxLength="10"
                  value={address.phone}
                  onChange={(e) =>
                    setAddress({
                      ...address,
                      phone: e.target.value.replace(/\D/g, "")
                    })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>PIN Code *</label>
                <input
                  type="text"
                  name="pincode"
                  placeholder="6-digit PIN code"
                  maxLength="6"
                  value={address.pincode}
                  onChange={(e) =>
                    setAddress({
                      ...address,
                      pincode: e.target.value.replace(/\D/g, "")
                    })
                  }
                  required
                />
              </div>

              <div className="form-group full-width">
                <label>Address (Flat, House no., Building, Street) *</label>
                <input
                  type="text"
                  name="street"
                  placeholder="Flat No., Landmark, Street area"
                  value={address.street}
                  onChange={handleAddressChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>City / Town *</label>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={address.city}
                  onChange={handleAddressChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>State *</label>
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={address.state}
                  onChange={handleAddressChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Section 2: Payment Method */}
          <div className="checkout-card">
            <h2 className="section-title">
              <span className="step-badge">2</span> Select Payment Method
            </h2>

            <div className="payment-tabs">
              <button
                type="button"
                className={`payment-tab-btn ${paymentMethod === "card" ? "active" : ""}`}
                onClick={() => setPaymentMethod("card")}
              >
                💳 Credit / Debit Card
              </button>

              <button
                type="button"
                className={`payment-tab-btn ${paymentMethod === "upi" ? "active" : ""}`}
                onClick={() => setPaymentMethod("upi")}
              >
                ⚡ UPI / QR
              </button>

              <button
                type="button"
                className={`payment-tab-btn ${paymentMethod === "netbanking" ? "active" : ""}`}
                onClick={() => setPaymentMethod("netbanking")}
              >
                🏦 Net Banking
              </button>

              <button
                type="button"
                className={`payment-tab-btn ${paymentMethod === "cod" ? "active" : ""}`}
                onClick={() => setPaymentMethod("cod")}
              >
                💵 Cash on Delivery
              </button>
            </div>

            {/* Card Details */}
            {paymentMethod === "card" && (
              <div className="payment-body">
                <div className="card-mockup-banner">
                  <span>Supported Cards: Visa, MasterCard, RuPay, Amex</span>
                </div>

                <div className="form-grid">
                  <div className="form-group full-width">
                    <label>Card Number</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={cardDetails.cardNumber}
                      onChange={handleCardNumberChange}
                      maxLength="19"
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>Cardholder Name</label>
                    <input
                      type="text"
                      placeholder="Name printed on card"
                      value={cardDetails.cardHolder}
                      onChange={(e) =>
                        setCardDetails({
                          ...cardDetails,
                          cardHolder: e.target.value
                        })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Expiry Date</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={cardDetails.expiry}
                      onChange={handleExpiryChange}
                      maxLength="5"
                    />
                  </div>

                  <div className="form-group">
                    <label>CVV / CVC</label>
                    <input
                      type="password"
                      placeholder="3 digits"
                      maxLength="3"
                      value={cardDetails.cvv}
                      onChange={(e) =>
                        setCardDetails({
                          ...cardDetails,
                          cvv: e.target.value.replace(/\D/g, "")
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {/* UPI */}
            {paymentMethod === "upi" && (
              <div className="payment-body">
                <p className="payment-subtitle">
                  Choose your preferred UPI application or enter your Virtual
                  Payment Address (VPA):
                </p>

                <div className="upi-options-grid">
                  <label className={`upi-radio-card ${upiMethod === "gpay" ? "selected" : ""}`}>
                    <input
                      type="radio"
                      name="upiMethod"
                      value="gpay"
                      checked={upiMethod === "gpay"}
                      onChange={() => setUpiMethod("gpay")}
                    />
                    <span>Google Pay</span>
                  </label>

                  <label className={`upi-radio-card ${upiMethod === "phonepe" ? "selected" : ""}`}>
                    <input
                      type="radio"
                      name="upiMethod"
                      value="phonepe"
                      checked={upiMethod === "phonepe"}
                      onChange={() => setUpiMethod("phonepe")}
                    />
                    <span>PhonePe</span>
                  </label>

                  <label className={`upi-radio-card ${upiMethod === "paytm" ? "selected" : ""}`}>
                    <input
                      type="radio"
                      name="upiMethod"
                      value="paytm"
                      checked={upiMethod === "paytm"}
                      onChange={() => setUpiMethod("paytm")}
                    />
                    <span>Paytm UPI</span>
                  </label>

                  <label className={`upi-radio-card ${upiMethod === "id" ? "selected" : ""}`}>
                    <input
                      type="radio"
                      name="upiMethod"
                      value="id"
                      checked={upiMethod === "id"}
                      onChange={() => setUpiMethod("id")}
                    />
                    <span>Enter UPI ID</span>
                  </label>
                </div>

                {upiMethod === "id" && (
                  <div className="form-group" style={{ marginTop: "15px" }}>
                    <label>Enter UPI ID (e.g. mobile@upi)</label>
                    <input
                      type="text"
                      placeholder="username@okhdfcbank"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Net Banking */}
            {paymentMethod === "netbanking" && (
              <div className="payment-body">
                <p className="payment-subtitle">
                  Select your bank to proceed with direct Net Banking transfer:
                </p>

                <div className="form-group">
                  <label>Choose Bank</label>
                  <select
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className="bank-select"
                  >
                    <option value="HDFC Bank">HDFC Bank</option>
                    <option value="State Bank of India (SBI)">State Bank of India (SBI)</option>
                    <option value="ICICI Bank">ICICI Bank</option>
                    <option value="Axis Bank">Axis Bank</option>
                    <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                    <option value="Punjab National Bank">Punjab National Bank</option>
                    <option value="Bank of Baroda">Bank of Baroda</option>
                  </select>
                </div>
              </div>
            )}

            {/* Cash on Delivery */}
            {paymentMethod === "cod" && (
              <div className="payment-body">
                <div className="cod-info-box">
                  <span className="cod-icon">📦</span>
                  <div>
                    <h4>Pay on Delivery (Cash / UPI)</h4>
                    <p>
                      You can pay via Cash or UPI QR Code at your doorstep upon
                      receiving the shipment.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="checkout-sidebar">
          <div className="summary-card">
            <h2>Order Items ({itemsToOrder.length})</h2>

            <div className="checkout-items-preview">
              {itemsToOrder.map((item) => (
                <div key={item.id} className="checkout-item-row">
                  <img src={item.image} alt={item.name} />
                  <div className="checkout-item-meta">
                    <h4>{item.name}</h4>
                    <p>
                      Qty: {item.quantity || 1} × ₹
                      {item.price.toLocaleString("en-IN")}
                    </p>
                  </div>
                  <span className="checkout-item-price">
                    ₹
                    {(
                      (item.price || 0) * (item.quantity || 1)
                    ).toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>

            <hr className="summary-divider" />

            <div className="summary-row">
              <span>Items Total</span>
              <span>₹{subtotal.toLocaleString("en-IN")}</span>
            </div>

            <div className="summary-row">
              <span>Delivery Fee</span>
              <span>
                {shipping === 0 ? (
                  <strong style={{ color: "#16a34a" }}>FREE</strong>
                ) : (
                  `₹${shipping}`
                )}
              </span>
            </div>

            <hr className="summary-divider" />

            <div className="summary-row grand-total-row">
              <span>Total Payable</span>
              <span>₹{totalAmount.toLocaleString("en-IN")}</span>
            </div>

            <button type="submit" className="pay-now-btn">
              {paymentMethod === "cod"
                ? `Place Order (₹${totalAmount.toLocaleString("en-IN")})`
                : `Pay ₹${totalAmount.toLocaleString("en-IN")} & Complete Order`}
            </button>

            <p className="guarantee-badge">
              🛡️ 100% Secure Checkout with Fast Delivery Guarantee
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Checkout;
