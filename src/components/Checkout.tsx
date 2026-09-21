import { useState } from "react";

type CustomerInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
};

type Product = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

const mockProducts: Product[] = [
  {
    id: 1,
    name: "React T-Shirt",
    price: 25,
    quantity: 1,
  },
  {
    id: 2,
    name: "TypeScript Mug",
    price: 15,
    quantity: 2,
  },
];

const initialCustomer: CustomerInfo = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  country: "",
  postalCode: "",
};

function Checkout() {
  const [step, setStep] = useState<number>(1);

  const [customer, setCustomer] =
    useState<CustomerInfo>(initialCustomer);

  const [orderPlaced, setOrderPlaced] =
    useState<boolean>(false);

  const shipping = 5;

  const subtotal = mockProducts.reduce(
    (total, product) =>
      total + product.price * product.quantity,
    0
  );

  const tax = subtotal * 0.1;

  const total = subtotal + shipping + tax;

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setCustomer({
      ...customer,
      [name]: value,
    });
  };

  const goToReview = () => {
    setStep(2);
  };

  const goBackToDetails = () => {
    setStep(1);
  };

  const placeOrder = () => {
    setOrderPlaced(true);
    setStep(3);
  };

  if (orderPlaced) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h1>Order Placed Successfully!</h1>

          <p>
            Thank you, {customer.firstName}.
          </p>

          <p>
            Your order has been successfully placed.
          </p>

          <h2>Order #ORD-1001</h2>

          <button
            onClick={() => {
              setOrderPlaced(false);
              setStep(1);
              setCustomer(initialCustomer);
            }}
          >
            Start New Order
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1>Checkout</h1>

        <p>
          Step {step} of 2
        </p>

        {step === 1 && (
          <section>
            <h2>Customer & Shipping Details</h2>

            <input
              name="firstName"
              placeholder="First Name"
              value={customer.firstName}
              onChange={handleChange}
            />

            <input
              name="lastName"
              placeholder="Last Name"
              value={customer.lastName}
              onChange={handleChange}
            />

            <input
              name="email"
              type="email"
              placeholder="Email"
              value={customer.email}
              onChange={handleChange}
            />

            <input
              name="phone"
              placeholder="Phone"
              value={customer.phone}
              onChange={handleChange}
            />

            <input
              name="address"
              placeholder="Address"
              value={customer.address}
              onChange={handleChange}
            />

            <input
              name="city"
              placeholder="City"
              value={customer.city}
              onChange={handleChange}
            />

            <input
              name="country"
              placeholder="Country"
              value={customer.country}
              onChange={handleChange}
            />

            <input
              name="postalCode"
              placeholder="Postal Code"
              value={customer.postalCode}
              onChange={handleChange}
            />

            <button onClick={goToReview}>
              Next
            </button>
          </section>
        )}

        {step === 2 && (
          <section>
            <h2>Review Order</h2>

            <h3>Customer Details</h3>

            <p>
              Name: {customer.firstName}{" "}
              {customer.lastName}
            </p>

            <p>
              Email: {customer.email}
            </p>

            <p>
              Phone: {customer.phone}
            </p>

            <p>
              Address: {customer.address},{" "}
              {customer.city},{" "}
              {customer.country}
            </p>

            <h3>Items</h3>

            {mockProducts.map((product) => (
              <div key={product.id}>
                <p>
                  {product.name} × {product.quantity}
                  {" — "}
                  $
                  {(
                    product.price *
                    product.quantity
                  ).toFixed(2)}
                </p>
              </div>
            ))}

            <hr />

            <p>
              Subtotal: $
              {subtotal.toFixed(2)}
            </p>

            <p>
              Shipping: $
              {shipping.toFixed(2)}
            </p>

            <p>
              Tax: $
              {tax.toFixed(2)}
            </p>

            <h2>
              Total: $
              {total.toFixed(2)}
            </h2>

            <button onClick={goBackToDetails}>
              Back
            </button>

            <button onClick={placeOrder}>
              Place Order
            </button>
          </section>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "700px",
    margin: "0 auto",
    padding: "30px",
    fontFamily: "Arial, sans-serif",
  },

  card: {
    border: "1px solid #ddd",
    borderRadius: "12px",
    padding: "30px",
  },

  input: {
    display: "block",
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    boxSizing: "border-box" as const,
  },
};

export default Checkout;