import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  decrement,
  removeFromCart,
  clearCart,
} from "@/store/slices/counterSlice";
import styles from "../styles/Kart.module.scss";

const Kart = () => {
  const cartItems = useSelector((state) => state.counter.cartItems || []);
  const dispatch = useDispatch();

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseInt(item.price.replace(/[^\d]/g, ""));
      return total + price * item.quantity;
    }, 0);
  };

  const handleIncrement = (itemId) => {
    dispatch(increment(itemId));
  };

  const handleDecrement = (itemId) => {
    dispatch(decrement(itemId));
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      dispatch(clearCart());
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    alert("Thank you for your order! We'll contact you soon.");
    dispatch(clearCart());
  };

  const formatPrice = (price) => {
    return `₹${price.toLocaleString()}`;
  };

  if (cartItems.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <div className={styles.emptyCartContent}>
          <div className={styles.emptyCartIcon}>🛒</div>
          <h2>Your Cart is Empty</h2>
          <p>Looks like you haven't added any packages to your cart yet.</p>
          <button
            onClick={() => (window.location.href = "/shopping")}
            className={styles.shopNowButton}
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cartPage}>
      <div className={styles.cartHeader}>
        <h1>Shopping Cart</h1>
        <p>
          {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} in your
          cart
        </p>
      </div>

      <div className={styles.cartContainer}>
        <div className={styles.cartItems}>
          {cartItems.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <div className={styles.itemImage}>
                <img src={item.image} alt={item.name} />
              </div>

              <div className={styles.itemDetails}>
                <h3 className={styles.itemName}>{item.name}</h3>
                <p className={styles.itemDescription}>{item.description}</p>
                <p className={styles.itemPrice}>{item.price}</p>

                <div className={styles.itemFeatures}>
                  <h4>Features:</h4>
                  <ul>
                    {item.features?.slice(0, 3).map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className={styles.itemActions}>
                <div className={styles.quantityControl}>
                  <button
                    onClick={() => handleDecrement(item.id)}
                    className={styles.quantityBtn}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className={styles.quantity}>{item.quantity}</span>
                  <button
                    onClick={() => handleIncrement(item.id)}
                    className={styles.quantityBtn}
                  >
                    +
                  </button>
                </div>

                <div className={styles.itemTotal}>
                  <span>
                    Total:{" "}
                    {formatPrice(
                      parseInt(item.price.replace(/[^\d]/g, "")) * item.quantity
                    )}
                  </span>
                </div>

                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className={styles.removeButton}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.cartSummary}>
          <h3>Order Summary</h3>

          <div className={styles.summaryItem}>
            <span>Subtotal:</span>
            <span>{formatPrice(calculateTotal())}</span>
          </div>

          <div className={styles.summaryItem}>
            <span>Service Charge:</span>
            <span>{formatPrice(500)}</span>
          </div>

          <div className={styles.summaryItem}>
            <span>Tax:</span>
            <span>{formatPrice(Math.round(calculateTotal() * 0.18))}</span>
          </div>

          <div className={styles.summaryTotal}>
            <span>Total Amount:</span>
            <span>
              {formatPrice(
                calculateTotal() + 500 + Math.round(calculateTotal() * 0.18)
              )}
            </span>
          </div>

          <div className={styles.cartActions}>
            <button onClick={handleCheckout} className={styles.checkoutButton}>
              Proceed to Checkout
            </button>

            <button
              onClick={handleClearCart}
              className={styles.clearCartButton}
            >
              Clear Cart
            </button>

            <button
              onClick={() => (window.location.href = "/shopping")}
              className={styles.continueShoppingButton}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kart;
