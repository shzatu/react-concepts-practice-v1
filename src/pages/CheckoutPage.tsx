import {
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";

type CheckoutStep =
  | "details"
  | "products"
  | "cart"
  | "summary"
  | "success";

type Product = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

type Order = {
  id: string;
  date: string;
  total: number;
  status: string;
  paymentStatus: string;
};

type CartAction =
  | {
      type: "INCREASE";
      productId: number;
    }
  | {
      type: "DECREASE";
      productId: number;
    }
  | {
      type: "RESET";
    };

// MOCK PRODUCT DATA

const productList: Product[] = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 12000,
    quantity: 0,
  },
  {
    id: 2,
    name: "Phone Case",
    price: 2500,
    quantity: 0,
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    price: 8500,
    quantity: 0,
  },
  {
    id: 4,
    name: "Wireless Mouse",
    price: 4500,
    quantity: 0,
  },
  {
    id: 5,
    name: "Mechanical Keyboard",
    price: 15000,
    quantity: 0,
  },
  {
    id: 6,
    name: "USB-C Cable",
    price: 1800,
    quantity: 0,
  },
  {
    id: 7,
    name: "Power Bank",
    price: 7500,
    quantity: 0,
  },
  {
    id: 8,
    name: "Laptop Stand",
    price: 6500,
    quantity: 0,
  },
];

// CART REDUCER

function cartReducer(
  products: Product[],
  action: CartAction
): Product[] {
  switch (action.type) {
    case "INCREASE":
      return products.map((product) =>
        product.id === action.productId
          ? {
              ...product,
              quantity: product.quantity + 1,
            }
          : product
      );

    case "DECREASE":
      return products.map((product) =>
        product.id === action.productId
          ? {
              ...product,
              quantity: Math.max(
                0,
                product.quantity - 1
              ),
            }
          : product
      );

    case "RESET":
      return productList.map((product) => ({
        ...product,
        quantity: 0,
      }));

    default:
      return products;
  }
}

// MAIN CHECKOUT PAGE

function CheckoutPage() {
  // CHECKOUT STATE

  const [step, setStep] =
    useState<CheckoutStep>("details");

  // useReducer manages the cart
  const [products, dispatch] =
    useReducer(cartReducer, productList);

  const [customerName, setCustomerName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [address, setAddress] =
    useState("");

  const [city, setCity] =
    useState("");

  const [province, setProvince] =
    useState("");

  const [postalCode, setPostalCode] =
    useState("");

  const [country, setCountry] =
    useState("");

  // ORDER HISTORY

  const [orderHistory, setOrderHistory] =
    useState<Order[]>([]);

  const [lastOrderId, setLastOrderId] =
    useState("");

  const [searchOrderId, setSearchOrderId] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [paymentFilter, setPaymentFilter] =
    useState("All");

  const [dateFilter, setDateFilter] =
    useState("All");

  // useRef

  const nameInputRef =
    useRef<HTMLInputElement>(null);

  // useEffect

  useEffect(() => {
    if (step === "details") {
      document.title = "Checkout - Customer Details";

      nameInputRef.current?.focus();
    } else if (step === "products") {
      document.title = "Checkout - Products";
    } else if (step === "cart") {
      document.title = "Checkout - Cart";
    } else if (step === "summary") {
      document.title = "Checkout - Summary";
    } else if (step === "success") {
      document.title = "Checkout - Order Success";
    }
  }, [step]);

  // CART CALCULATIONS

  const selectedProducts = products.filter(
    (product) => product.quantity > 0
  );

  const cartItemCount = products.reduce(
    (total, product) =>
      total + product.quantity,
    0
  );

  const subtotal = selectedProducts.reduce(
    (total, product) =>
      total +
      product.price * product.quantity,
    0
  );

  const shipping =
    subtotal > 0 ? 1000 : 0;

  const tax = subtotal * 0.1;

  const total =
    subtotal + shipping + tax;

  // FUNCTIONS

  const goToProducts = () => {
    setStep("products");
  };

  const goToCart = () => {
    if (cartItemCount > 0) {
      setStep("cart");
    }
  };

  const goToSummary = () => {
    if (cartItemCount > 0) {
      setStep("summary");
    }
  };

  const goBackToDetails = () => {
    setStep("details");
  };

  const goBackToProducts = () => {
    setStep("products");
  };

  const goBackToCart = () => {
    setStep("cart");
  };

  const placeOrder = () => {
    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      date: new Date().toLocaleDateString(),
      total: total,
      status: "Placed",
      paymentStatus: "Paid",
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
    setPhone("");
    setAddress("");
    setCity("");
    setProvince("");
    setPostalCode("");
    setCountry("");

    dispatch({
      type: "RESET",
    });

    setStep("details");
  };

  // FILTER ORDER HISTORY

  const filteredOrders =
    orderHistory.filter((order) => {
      const matchesSearch =
        order.id
          .toLowerCase()
          .includes(
            searchOrderId.toLowerCase()
          );

      const matchesStatus =
        statusFilter === "All" ||
        order.status === statusFilter;

      const matchesPayment =
        paymentFilter === "All" ||
        order.paymentStatus ===
          paymentFilter;

      const matchesDate =
        dateFilter === "All" ||
        order.date === dateFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPayment &&
        matchesDate
      );
    });

  // SUCCESS PAGE

  if (step === "success") {
    return (
      <div style={pageStyle}>
        <div style={successCardStyle}>
          <div style={successIconStyle}>
            ✓
          </div>

          <h1>Order Placed Successfully!</h1>

          <p>
            Thank you, {customerName}.
          </p>

          <p>Your order ID is:</p>

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

        <OrderHistory
          orders={filteredOrders}
          searchOrderId={searchOrderId}
          setSearchOrderId={setSearchOrderId}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          paymentFilter={paymentFilter}
          setPaymentFilter={setPaymentFilter}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
        />
      </div>
    );
  }

  // MAIN CHECKOUT PAGE

  return (
    <div style={pageStyle}>
      <div style={headerStyle}>
        <h1>Checkout</h1>

        <p>
          Complete your order step by step.
        </p>
      </div>

      {/* STEP INDICATOR */}

      <div style={stepsStyle}>
        <StepIndicator
          number="1"
          title="Customer Details"
          active={step === "details"}
        />

        <StepIndicator
          number="2"
          title="Products"
          active={step === "products"}
        />

        <StepIndicator
          number="3"
          title="Cart"
          active={step === "cart"}
        />

        <StepIndicator
          number="4"
          title="Summary & Confirm"
          active={step === "summary"}
        />
      </div>

      {/* STEP 1 — CUSTOMER DETAILS */}

      {step === "details" && (
        <section style={largeCardStyle}>
          <h2>Customer Details</h2>

          <p style={sectionDescription}>
            Enter your customer and shipping
            information.
          </p>

          <div style={formGridStyle}>
            <div>
              <label>Full Name</label>

              <input
                ref={nameInputRef}
                type="text"
                value={customerName}
                onChange={(event) =>
                  setCustomerName(
                    event.target.value
                  )
                }
                placeholder="Enter your full name"
                style={inputStyle}
              />
            </div>

            <div>
              <label>Email Address</label>

              <input
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                placeholder="Enter your email"
                style={inputStyle}
              />
            </div>

            <div>
              <label>Phone Number</label>

              <input
                type="tel"
                value={phone}
                onChange={(event) =>
                  setPhone(event.target.value)
                }
                placeholder="Enter your phone number"
                style={inputStyle}
              />
            </div>
          </div>

          <h2 style={{ marginTop: "30px" }}>
            Shipping Address
          </h2>

          <div>
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
          </div>

          <div style={shippingGridStyle}>
            <div>
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
            </div>

            <div>
              <label>Province</label>

              <input
                type="text"
                value={province}
                onChange={(event) =>
                  setProvince(
                    event.target.value
                  )
                }
                placeholder="Province"
                style={inputStyle}
              />
            </div>

            <div>
              <label>Postal Code</label>

              <input
                type="text"
                value={postalCode}
                onChange={(event) =>
                  setPostalCode(
                    event.target.value
                  )
                }
                placeholder="Postal Code"
                style={inputStyle}
              />
            </div>

            <div>
              <label>Country</label>

              <input
                type="text"
                value={country}
                onChange={(event) =>
                  setCountry(
                    event.target.value
                  )
                }
                placeholder="Country"
                style={inputStyle}
              />
            </div>
          </div>

          <button
            onClick={goToProducts}
            disabled={
              !customerName ||
              !email ||
              !phone ||
              !address ||
              !city ||
              !province ||
              !postalCode ||
              !country
            }
            style={{
              ...primaryButton,
              opacity:
                customerName &&
                email &&
                phone &&
                address &&
                city &&
                province &&
                postalCode &&
                country
                  ? 1
                  : 0.5,
            }}
          >
            Continue to Products →
          </button>
        </section>
      )}

      {/* STEP 2 — PRODUCT SELECTION */}

      {step === "products" && (
        <section style={largeCardStyle}>
          <div style={sectionHeaderStyle}>
            <div>
              <h2>Select Products</h2>

              <p style={sectionDescription}>
                Choose the products and quantities
                for your order.
              </p>
            </div>

            <div style={cartBadgeStyle}>
              🛒 {cartItemCount} items
            </div>
          </div>

          <div style={productGridStyle}>
            {products.map((product) => (
              <div
                key={product.id}
                style={{
                  ...productCardStyle,
                  border:
                    product.quantity > 0
                      ? "2px solid #333"
                      : "1px solid #ddd",
                }}
              >
                <h3>{product.name}</h3>

                <p style={productPriceStyle}>
                  LKR{" "}
                  {product.price.toLocaleString(
                    "en-LK",
                    {
                      minimumFractionDigits: 2,
                    }
                  )}
                </p>

                <div style={quantityStyle}>
                  <button
                    onClick={() =>
                      dispatch({
                        type: "DECREASE",
                        productId:
                          product.id,
                      })
                    }
                    disabled={
                      product.quantity === 0
                    }
                  >
                    −
                  </button>

                  <strong>
                    {product.quantity}
                  </strong>

                  <button
                    onClick={() =>
                      dispatch({
                        type: "INCREASE",
                        productId:
                          product.id,
                      })
                    }
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div style={bottomBarStyle}>
            <button
              onClick={goBackToDetails}
              style={secondaryButton}
            >
              ← Back
            </button>

            <button
              onClick={goToCart}
              disabled={cartItemCount === 0}
              style={{
                ...primaryButton,
                opacity:
                  cartItemCount === 0
                    ? 0.5
                    : 1,
              }}
            >
              View Cart ({cartItemCount}) →
            </button>
          </div>
        </section>
      )}

      {/* STEP 3 — CART */}

      {step === "cart" && (
        <section style={largeCardStyle}>
          <div style={sectionHeaderStyle}>
            <div>
              <h2>Your Cart</h2>

              <p style={sectionDescription}>
                Check your selected products and
                quantities.
              </p>
            </div>

            <div style={cartBadgeStyle}>
              🛒 {cartItemCount} items
            </div>
          </div>

          {selectedProducts.map((product) => (
            <div
              key={product.id}
              style={cartRowStyle}
            >
              <div>
                <h3>{product.name}</h3>

                <p>
                  LKR{" "}
                  {product.price.toLocaleString(
                    "en-LK",
                    {
                      minimumFractionDigits: 2,
                    }
                  )}{" "}
                  each
                </p>
              </div>

              <div style={quantityStyle}>
                <button
                  onClick={() =>
                    dispatch({
                      type: "DECREASE",
                      productId:
                        product.id,
                    })
                  }
                >
                  −
                </button>

                <strong>
                  {product.quantity}
                </strong>

                <button
                  onClick={() =>
                    dispatch({
                      type: "INCREASE",
                      productId:
                        product.id,
                    })
                  }
                >
                  +
                </button>
              </div>

              <strong>
                LKR{" "}
                {(
                  product.price *
                  product.quantity
                ).toLocaleString("en-LK", {
                  minimumFractionDigits: 2,
                })}
              </strong>
            </div>
          ))}

          <div style={cartTotalStyle}>
            <span>Subtotal</span>

            <strong>
              LKR{" "}
              {subtotal.toLocaleString(
                "en-LK",
                {
                  minimumFractionDigits: 2,
                }
              )}
            </strong>
          </div>

          <div style={bottomBarStyle}>
            <button
              onClick={goBackToProducts}
              style={secondaryButton}
            >
              ← Back to Products
            </button>

            <button
              onClick={goToSummary}
              disabled={cartItemCount === 0}
              style={{
                ...primaryButton,
                opacity:
                  cartItemCount === 0
                    ? 0.5
                    : 1,
              }}
            >
              Continue to Summary →
            </button>
          </div>
        </section>
      )}

      {/* STEP 4 — ORDER SUMMARY + REVIEW + CONFIRM */}

      {step === "summary" && (
        <section style={largeCardStyle}>
          <h2>Order Summary & Confirmation</h2>

          <p style={sectionDescription}>
            Review your details and order before
            placing it.
          </p>

          <div style={summaryGridStyle}>
            <div style={cardStyle}>
              <h3>Customer Details</h3>

              <p>
                <strong>Full Name:</strong>{" "}
                {customerName}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {email}
              </p>

              <p>
                <strong>Phone:</strong>{" "}
                {phone}
              </p>

              <h3>Shipping Address</h3>

              <p>
                {address}, {city},{" "}
                {province}, {postalCode},{" "}
                {country}
              </p>

              <button
                onClick={goBackToDetails}
                style={secondaryButton}
              >
                ← Edit Details
              </button>
            </div>

            <div style={cardStyle}>
              <h3>Selected Products</h3>

              {selectedProducts.map(
                (product) => (
                  <div
                    key={product.id}
                    style={summaryProductStyle}
                  >
                    <span>
                      {product.name} ×{" "}
                      {product.quantity}
                    </span>

                    <strong>
                      LKR{" "}
                      {(
                        product.price *
                        product.quantity
                      ).toLocaleString(
                        "en-LK",
                        {
                          minimumFractionDigits: 2,
                        }
                      )}
                    </strong>
                  </div>
                )
              )}
            </div>
          </div>

          <div
            style={{
              ...cardStyle,
              marginTop: "25px",
            }}
          >
            <h3>Order Summary</h3>

            <p style={summaryLineStyle}>
              <span>Subtotal</span>

              <strong>
                LKR{" "}
                {subtotal.toLocaleString(
                  "en-LK",
                  {
                    minimumFractionDigits: 2,
                  }
                )}
              </strong>
            </p>

            <p style={summaryLineStyle}>
              <span>Shipping</span>

              <strong>
                LKR{" "}
                {shipping.toLocaleString(
                  "en-LK",
                  {
                    minimumFractionDigits: 2,
                  }
                )}
              </strong>
            </p>

            <p style={summaryLineStyle}>
              <span>Tax</span>

              <strong>
                LKR{" "}
                {tax.toLocaleString(
                  "en-LK",
                  {
                    minimumFractionDigits: 2,
                  }
                )}
              </strong>
            </p>

            <hr />

            <h2 style={summaryLineStyle}>
              <span>Total</span>

              <strong>
                LKR{" "}
                {total.toLocaleString(
                  "en-LK",
                  {
                    minimumFractionDigits: 2,
                  }
                )}
              </strong>
            </h2>
          </div>

          <div style={bottomBarStyle}>
            <button
              onClick={goBackToCart}
              style={secondaryButton}
            >
              ← Back to Cart
            </button>

            <button
              onClick={placeOrder}
              style={primaryButton}
            >
              Place Order
            </button>
          </div>
        </section>
      )}

      {/* ORDER HISTORY */}

      <OrderHistory
        orders={filteredOrders}
        searchOrderId={searchOrderId}
        setSearchOrderId={setSearchOrderId}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        paymentFilter={paymentFilter}
        setPaymentFilter={setPaymentFilter}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
      />
    </div>
  );
}

// STEP INDICATOR

function StepIndicator({
  number,
  title,
  active,
}: {
  number: string;
  title: string;
  active: boolean;
}) {
  return (
    <div
      style={{
        ...stepStyle,
        borderBottom: active
          ? "3px solid #222"
          : "3px solid #ddd",
        fontWeight: active
          ? "bold"
          : "normal",
      }}
    >
      <span style={stepNumberStyle}>
        {number}
      </span>

      {title}
    </div>
  );
}

// ORDER HISTORY

function OrderHistory({
  orders,
  searchOrderId,
  setSearchOrderId,
  statusFilter,
  setStatusFilter,
  paymentFilter,
  setPaymentFilter,
  dateFilter,
  setDateFilter,
}: {
  orders: Order[];
  searchOrderId: string;
  setSearchOrderId: (
    value: string
  ) => void;
  statusFilter: string;
  setStatusFilter: (
    value: string
  ) => void;
  paymentFilter: string;
  setPaymentFilter: (
    value: string
  ) => void;
  dateFilter: string;
  setDateFilter: (
    value: string
  ) => void;
}) {
  return (
    <div style={historyStyle}>
      <h2>Order History</h2>

      <div style={filterGridStyle}>
        <div>
          <label>
            🔍 Search by Order ID
          </label>

          <input
            type="text"
            value={searchOrderId}
            onChange={(event) =>
              setSearchOrderId(
                event.target.value
              )
            }
            placeholder="Search Order ID"
            style={inputStyle}
          />
        </div>

        <div>
          <label>Filter by Status</label>

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(
                event.target.value
              )
            }
            style={inputStyle}
          >
            <option value="All">All</option>

            <option value="Placed">
              Placed
            </option>
          </select>
        </div>

        <div>
          <label>Filter by Date</label>

          <select
            value={dateFilter}
            onChange={(event) =>
              setDateFilter(
                event.target.value
              )
            }
            style={inputStyle}
          >
            <option value="All">
              All Dates
            </option>

            {orders.map((order) => (
              <option
                key={order.id}
                value={order.date}
              >
                {order.date}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>
            Filter by Payment Status
          </label>

          <select
            value={paymentFilter}
            onChange={(event) =>
              setPaymentFilter(
                event.target.value
              )
            }
            style={inputStyle}
          >
            <option value="All">All</option>

            <option value="Paid">
              Paid
            </option>

            <option value="Pending">
              Pending
            </option>
          </select>
        </div>
      </div>

      {orders.length === 0 ? (
        <p style={emptyStyle}>
          No orders found.
        </p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            style={orderHistoryCardStyle}
          >
            <div>
              <strong>
                {order.id}
              </strong>

              <p>
                Date: {order.date}
              </p>
            </div>

            <div>
              <p>
                <strong>Total:</strong>{" "}
                LKR{" "}
                {order.total.toLocaleString(
                  "en-LK",
                  {
                    minimumFractionDigits: 2,
                  }
                )}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {order.status}
              </p>

              <p>
                <strong>
                  Payment Status:
                </strong>{" "}
                {order.paymentStatus}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

// STYLES

const pageStyle = {
  maxWidth: "1100px",
  margin: "0 auto",
  padding: "40px 30px",
  fontFamily: "Arial, sans-serif",
};

const headerStyle = {
  marginBottom: "30px",
};

const stepsStyle = {
  display: "grid",
  gridTemplateColumns:
    "repeat(4, 1fr)",
  gap: "10px",
  marginBottom: "30px",
};

const stepStyle = {
  padding: "15px 10px",
  textAlign: "center" as const,
};

const stepNumberStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "28px",
  height: "28px",
  borderRadius: "50%",
  border: "1px solid #aaa",
  marginRight: "8px",
};

const largeCardStyle = {
  border: "1px solid #ddd",
  borderRadius: "14px",
  padding: "30px",
  marginBottom: "35px",
};

const cardStyle = {
  border: "1px solid #ddd",
  borderRadius: "12px",
  padding: "25px",
};

const sectionDescription = {
  color: "#666",
  marginBottom: "25px",
};

const formGridStyle = {
  display: "grid",
  gridTemplateColumns:
    "repeat(3, 1fr)",
  gap: "20px",
};

const shippingGridStyle = {
  display: "grid",
  gridTemplateColumns:
    "repeat(4, 1fr)",
  gap: "15px",
};

const inputStyle = {
  display: "block",
  width: "100%",
  boxSizing: "border-box" as const,
  padding: "12px",
  marginTop: "8px",
  marginBottom: "20px",
  border: "1px solid #ccc",
  borderRadius: "7px",
  fontSize: "15px",
};

const primaryButton = {
  padding: "13px 22px",
  border: "none",
  borderRadius: "7px",
  cursor: "pointer",
  fontSize: "15px",
  marginTop: "15px",
};

const secondaryButton = {
  padding: "12px 20px",
  border: "1px solid #aaa",
  borderRadius: "7px",
  cursor: "pointer",
  background: "white",
  fontSize: "15px",
};

const sectionHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "20px",
};

const cartBadgeStyle = {
  border: "1px solid #ddd",
  borderRadius: "20px",
  padding: "10px 16px",
  whiteSpace: "nowrap" as const,
};

const productGridStyle = {
  display: "grid",
  gridTemplateColumns:
    "repeat(4, 1fr)",
  gap: "18px",
  marginTop: "25px",
};

const productCardStyle = {
  borderRadius: "10px",
  padding: "20px",
};

const productPriceStyle = {
  fontWeight: "bold",
  fontSize: "17px",
};

const quantityStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "15px",
  marginTop: "15px",
};

const bottomBarStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "15px",
  marginTop: "30px",
};

const cartRowStyle = {
  display: "grid",
  gridTemplateColumns:
    "2fr 1fr 1fr",
  alignItems: "center",
  gap: "20px",
  padding: "18px 0",
  borderBottom: "1px solid #eee",
};

const cartTotalStyle = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: "20px",
  paddingTop: "25px",
};

const summaryGridStyle = {
  display: "grid",
  gridTemplateColumns:
    "1fr 1fr",
  gap: "25px",
  marginTop: "25px",
};

const summaryProductStyle = {
  display: "flex",
  justifyContent: "space-between",
  padding: "12px 0",
  borderBottom: "1px solid #eee",
};

const summaryLineStyle = {
  display: "flex",
  justifyContent: "space-between",
};

const historyStyle = {
  marginTop: "40px",
  borderTop: "1px solid #ddd",
  paddingTop: "30px",
};

const filterGridStyle = {
  display: "grid",
  gridTemplateColumns:
    "repeat(4, 1fr)",
  gap: "15px",
  marginTop: "20px",
};

const orderHistoryCardStyle = {
  display: "flex",
  justifyContent: "space-between",
  gap: "30px",
  border: "1px solid #ddd",
  borderRadius: "10px",
  padding: "20px",
  marginTop: "15px",
};

const emptyStyle = {
  padding: "25px",
  textAlign: "center" as const,
  color: "#777",
};

const successCardStyle = {
  border: "1px solid #ddd",
  borderRadius: "15px",
  padding: "60px 30px",
  textAlign: "center" as const,
};

const successIconStyle = {
  fontSize: "45px",
  marginBottom: "15px",
};

export default CheckoutPage;