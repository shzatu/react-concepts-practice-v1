import { useRef } from "react";

type CustomerInfo = {
  ownerName: string;
  email: string;
  phone1: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

type CheckoutProps = {
  customer: CustomerInfo;
  setCustomer: React.Dispatch<
    React.SetStateAction<CustomerInfo>
  >;
  onNext: () => void;
};

function Checkout({
  customer,
  setCustomer,
  onNext,
}: CheckoutProps) {
  const nameInputRef =
    useRef<HTMLInputElement>(null);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setCustomer((previousCustomer) => ({
      ...previousCustomer,
      [name]: value,
    }));
  };

  const isCustomerComplete =
    customer.ownerName &&
    customer.email &&
    customer.phone1 &&
    customer.address &&
    customer.city &&
    customer.state &&
    customer.postalCode &&
    customer.country;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>
              Checkout
            </h1>

            <p style={styles.subtitle}>
              Enter your customer details
              and shipping information
            </p>
          </div>

          <div style={styles.stepBadge}>
            Step 1
          </div>
        </div>

        <div style={styles.stepLine}>
          <div style={styles.activeStep}>
            1. Customer Details
          </div>

          <div style={styles.inactiveStep}>
            2. Products
          </div>

          <div style={styles.inactiveStep}>
            3. Cart
          </div>

          <div style={styles.inactiveStep}>
            4. Summary
          </div>
        </div>

        <section style={styles.section}>
          <h2>Customer Details</h2>

          <div style={styles.formGrid}>
            <div style={styles.field}>
              <label>Full Name</label>

              <input
                ref={nameInputRef}
                name="ownerName"
                value={customer.ownerName}
                onChange={handleChange}
                placeholder="Enter full name"
                style={styles.input}
              />
            </div>

            <div style={styles.field}>
              <label>Email Address</label>

              <input
                name="email"
                type="email"
                value={customer.email}
                onChange={handleChange}
                placeholder="Enter email address"
                style={styles.input}
              />
            </div>

            <div style={styles.field}>
              <label>Phone Number</label>

              <input
                name="phone1"
                value={customer.phone1}
                onChange={handleChange}
                placeholder="Enter phone number"
                style={styles.input}
              />
            </div>
          </div>
        </section>

        <section style={styles.section}>
          <h2>Shipping Address</h2>

          <div style={styles.field}>
            <label>Address</label>

            <input
              name="address"
              value={customer.address}
              onChange={handleChange}
              placeholder="Street address"
              style={styles.input}
            />
          </div>

          <div style={styles.formGrid}>
            <div style={styles.field}>
              <label>City</label>

              <input
                name="city"
                value={customer.city}
                onChange={handleChange}
                placeholder="City"
                style={styles.input}
              />
            </div>

            <div style={styles.field}>
              <label>Province</label>

              <input
                name="state"
                value={customer.state}
                onChange={handleChange}
                placeholder="Province"
                style={styles.input}
              />
            </div>

            <div style={styles.field}>
              <label>Postal Code</label>

              <input
                name="postalCode"
                value={customer.postalCode}
                onChange={handleChange}
                placeholder="Postal Code"
                style={styles.input}
              />
            </div>

            <div style={styles.field}>
              <label>Country</label>

              <input
                name="country"
                value={customer.country}
                onChange={handleChange}
                placeholder="Country"
                style={styles.input}
              />
            </div>
          </div>
        </section>

        <button
          onClick={onNext}
          disabled={!isCustomerComplete}
          style={{
            ...styles.primaryButton,
            opacity: isCustomerComplete
              ? 1
              : 0.5,
          }}
        >
          Continue to Products →
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    minHeight: "100vh",
    padding: "40px 20px",
    boxSizing: "border-box" as const,
    fontFamily: "Arial, sans-serif",
    background: "#f7f7f7",
  },

  card: {
    maxWidth: "1200px",
    margin: "0 auto",
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: "14px",
    padding: "35px",
    boxSizing: "border-box" as const,
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
  },

  title: {
    marginBottom: "5px",
  },

  subtitle: {
    marginTop: "0",
    color: "#666",
  },

  stepBadge: {
    border: "1px solid #ccc",
    borderRadius: "20px",
    padding: "8px 15px",
    whiteSpace: "nowrap" as const,
  },

  stepLine: {
    display: "grid",
    gridTemplateColumns:
      "repeat(4, 1fr)",
    margin: "30px 0",
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden" as const,
  },

  activeStep: {
    padding: "14px",
    textAlign: "center" as const,
    fontWeight: "bold",
    borderRight: "1px solid #ddd",
  },

  inactiveStep: {
    padding: "14px",
    textAlign: "center" as const,
    color: "#888",
    borderRight: "1px solid #ddd",
  },

  section: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "25px",
    marginBottom: "25px",
  },

  formGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(2, minmax(0, 1fr))",
    gap: "18px",
  },

  field: {
    marginBottom: "15px",
  },

  input: {
    display: "block",
    width: "100%",
    boxSizing: "border-box" as const,
    padding: "12px",
    marginTop: "7px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "15px",
  },

  primaryButton: {
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "7px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  },
};

export default Checkout;