import { useState } from "react";

type CheckoutStep = "details" | "review" | "success";

type Order = {
  id: string;
  date: string;
  total: number;
  status: string;
};

function CheckoutPage() {
  // =====================================================
  // MOCK PRODUCT DATA
  // =====================================================

  const items = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 120,
      quantity: 1,
    },
    {
      id: 2,
      name: "Phone Case",
      price: 25,
      quantity: 2,
    },
  ];

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = 10;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  // =====================================================
  // CHECKOUT STATE
  // =====================================================

  const [step, setStep] =
    useState<CheckoutStep>("details");

  const [customerName, setCustomerName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [address, setAddress] =
    useState("");

  const [city, setCity] =
    useState("");

  // =====================================================
  // ORDER HISTORY
  // =====================================================

  const [orderHistory, setOrderHistory] =
    useState<Order[]>([]);

  const [lastOrderId, setLastOrderId] =
    useState("");

  // =====================================================
  // FUNCTIONS
  // =====================================================

  const goToReview = () => {
    setStep("review");
  };

  const goBackToDetails = () => {
    setStep("details");
  };

  const placeOrder = () => {
    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      date: new Date().toLocaleDateString(),
      total: total,
      status: "Placed",
    };

    setOrderHistory((previousOrders) => [
      ...previousOrders,
      newOrder,
    ]);

    setLastOrderId(newOrder.id);
    setStep("success");
  };

  const startNewOrder = () => {
    setCustomerName("");
    setEmail("");
    setAddress("");
    setCity("");
    setStep("details");
  };

  // =====================================================
  // DETAILS PAGE
  // =====================================================

  if (step === "details") {
    return (
      <div
        style={{
          maxWidth: "1000px",
          margin: "40px auto",
          padding: "30px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h1>Checkout</h1>

        <p>Step 1 of 3 — Customer Details</p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "2fr 1fr",
            gap: "30px",
            marginTop: "30px",
          }}
        >
          <div
            style={{
              border: "1px solid #ddd",
              borderRadius: "12px",
              padding: "25px",
            }}
          >
            <h2>Customer Information</h2>

            <label>Full Name</label>

            <input
              type="text"
              value={customerName}
              onChange={(event) =>
                setCustomerName(event.target.value)
              }
              placeholder="Enter your name"
              style={inputStyle}
            />

            <label>Email</label>

            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="Enter your email"
              style={inputStyle}
            />

            <h2>Shipping Address</h2>

            <label>Address</label>

            <input
              type="text"
              value={address}
              onChange={(event) =>
                setAddress(event.target.value)
              }
              placeholder="Street address"
              style={inputStyle}
            />

            <label>City</label>

            <input
              type="text"
              value={city}
              onChange={(event) =>
                setCity(event.target.value)
              }
              placeholder="City"
              style={inputStyle}
            />

            <button
              onClick={goToReview}
              disabled={
                !customerName ||
                !email ||
                !address ||
                !city
              }
              style={primaryButton}
            >
              Continue to Review →
            </button>
          </div>

          <OrderSummary
            subtotal={subtotal}
            shipping={shipping}
            tax={tax}
            total={total}
          />
        </div>

        <OrderHistory orders={orderHistory} />
      </div>
    );
  }

  // =====================================================
  // REVIEW PAGE
  // =====================================================

  if (step === "review") {
    return (
      <div
        style={{
          maxWidth: "1000px",
          margin: "40px auto",
          padding: "30px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h1>Review Your Order</h1>

        <p>Step 2 of 3 — Review</p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "2fr 1fr",
            gap: "30px",
            marginTop: "30px",
          }}
        >
          <div>
            <div style={cardStyle}>
              <h2>Customer Details</h2>

              <p>
                <strong>Name:</strong>{" "}
                {customerName}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {email}
              </p>

              <p>
                <strong>Address:</strong>{" "}
                {address}, {city}
              </p>

              <button
                onClick={goBackToDetails}
                style={secondaryButton}
              >
                ← Edit Details
              </button>
            </div>

            <div
              style={{
                ...cardStyle,
                marginTop: "20px",
              }}
            >
              <h2>Items</h2>

              {items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    padding: "12px 0",
                    borderBottom:
                      "1px solid #eee",
                  }}
                >
                  <span>
                    {item.name} ×{" "}
                    {item.quantity}
                  </span>

                  <strong>
                    $
                    {(
                      item.price *
                      item.quantity
                    ).toFixed(2)}
                  </strong>
                </div>
              ))}
            </div>
          </div>

          <OrderSummary
            subtotal={subtotal}
            shipping={shipping}
            tax={tax}
            total={total}
          />
        </div>

        <button
          onClick={placeOrder}
          style={{
            ...primaryButton,
            marginTop: "25px",
            width: "100%",
          }}
        >
          Place Order
        </button>

        <OrderHistory orders={orderHistory} />
      </div>
    );
  }

  // =====================================================
  // SUCCESS PAGE
  // =====================================================

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "60px auto",
        padding: "30px",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "15px",
          padding: "50px 30px",
        }}
      >
        <h1>✓ Order Placed Successfully!</h1>

        <p>
          Thank you, {customerName}.
        </p>

        <p>
          Your order ID is:
        </p>

        <h2>{lastOrderId}</h2>

        <p>
          Your order has been successfully
          placed.
        </p>

        <button
          onClick={startNewOrder}
          style={primaryButton}
        >
          Start New Order
        </button>
      </div>

      <OrderHistory orders={orderHistory} />
    </div>
  );
}

// =====================================================
// ORDER SUMMARY
// =====================================================

type OrderSummaryProps = {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
};

function OrderSummary({
  subtotal,
  shipping,
  tax,
  total,
}: OrderSummaryProps) {
  return (
    <div style={cardStyle}>
      <h2>Order Summary</h2>

      <p>
        Subtotal:
        <strong style={priceStyle}>
          ${subtotal.toFixed(2)}
        </strong>
      </p>

      <p>
        Shipping:
        <strong style={priceStyle}>
          ${shipping.toFixed(2)}
        </strong>
      </p>

      <p>
        Tax:
        <strong style={priceStyle}>
          ${tax.toFixed(2)}
        </strong>
      </p>

      <hr />

      <h2>
        Total:
        <strong style={priceStyle}>
          ${total.toFixed(2)}
        </strong>
      </h2>
    </div>
  );
}

// =====================================================
// ORDER HISTORY
// =====================================================

function OrderHistory({
  orders,
}: {
  orders: Order[];
}) {
  if (orders.length === 0) {
    return null;
  }

  return (
    <div
      style={{
        marginTop: "40px",
        borderTop: "1px solid #ddd",
        paddingTop: "25px",
      }}
    >
      <h2>Order History</h2>

      {orders.map((order) => (
        <div
          key={order.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "15px",
            marginTop: "12px",
          }}
        >
          <p>
            <strong>Order ID:</strong>{" "}
            {order.id}
          </p>

          <p>
            <strong>Date:</strong>{" "}
            {order.date}
          </p>

          <p>
            <strong>Total:</strong> $
            {order.total.toFixed(2)}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            {order.status}
          </p>
        </div>
      ))}
    </div>
  );
}

// =====================================================
// STYLES
// =====================================================

const inputStyle = {
  display: "block",
  width: "100%",
  boxSizing: "border-box" as const,
  padding: "12px",
  marginTop: "8px",
  marginBottom: "20px",
  border: "1px solid #ccc",
  borderRadius: "6px",
  fontSize: "15px",
};

const primaryButton = {
  padding: "12px 20px",
  border: "none",
  borderRadius: "7px",
  cursor: "pointer",
  fontSize: "15px",
  marginTop: "10px",
};

const secondaryButton = {
  padding: "10px 18px",
  border: "1px solid #ccc",
  borderRadius: "7px",
  cursor: "pointer",
  background: "white",
};

const cardStyle = {
  border: "1px solid #ddd",
  borderRadius: "12px",
  padding: "25px",
};

const priceStyle = {
  float: "right" as const,
};

export default CheckoutPage;