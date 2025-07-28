import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      if (existingItem) {
        existingItem.quantity += 1;
        Swal.fire({
          position: window.innerWidth < 768 ? "center" : "top-end",
          icon: "success",
          title: "Quantity increased!",
          showConfirmButton: false,
          timer: 1500,
          width: window.innerWidth < 768 ? "80%" : undefined,
        });
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
        Swal.fire({
          position: window.innerWidth < 768 ? "center" : "top-end",
          icon: "success",
          title: "Added to cart!",
          showConfirmButton: false,
          timer: 1500,
          width: window.innerWidth < 768 ? "80%" : undefined,
        });
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      Swal.fire({
        position: window.innerWidth < 768 ? "center" : "top-end",
        icon: "success",
        title: "Item removed",
        showConfirmButton: false,
        timer: 1500,
        width: window.innerWidth < 768 ? "80%" : undefined,
      });
    },
    clearCart: (state) => {
      state.cartItems = [];
      Swal.fire({
        position: window.innerWidth < 768 ? "center" : "top-end",
        icon: "success",
        title: "Cart cleared!",
        showConfirmButton: false,
        timer: 1500,
        width: window.innerWidth < 768 ? "80%" : undefined,
      });
    },
    incrementQuantity: (state, action) => {
      const item = state.cartItems.find((item) => item._id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.cartItems.find((item) => item._id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else if (item && item.quantity === 1) {
        Swal.fire({
          title: "Remove item?",
          text: "This will remove the item from your cart",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Remove",
          cancelButtonText: "Keep it",
          width: window.innerWidth < 768 ? "80%" : undefined,
        }).then((result) => {
          if (result.isConfirmed) {
            state.cartItems = state.cartItems.filter(
              (cartItem) => cartItem._id !== action.payload
            );
            Swal.fire({
              position: window.innerWidth < 768 ? "center" : "top-end",
              icon: "success",
              title: "Item removed",
              showConfirmButton: false,
              timer: 1500,
              width: window.innerWidth < 768 ? "80%" : undefined,
            });
          }
        });
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
