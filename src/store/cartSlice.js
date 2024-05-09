const { createSlice } = require("@reduxjs/toolkit");

// Define the calculatePrice function
const provinceRates = {
  Punjab: {
    upTo0_5kg: 150,
    upTo1kg: 200,
    upTo5kg: 300,
  },
  Balochistan: {
    upTo0_5kg: 160,
    upTo1kg: 210,
    upTo5kg: 310,
  },
  Sindh: {
    upTo0_5kg: 170,
    upTo1kg: 220,
    upTo5kg: 320,
  },
  KPK: {
    upTo0_5kg: 180,
    upTo1kg: 230,
    upTo5kg: 330,
  },
};

const calculateDeliveryCharge = (totalWeight, province = "Punjab") => {
  let deliveryCharge = 0;
  const rates = provinceRates[province];

  if (totalWeight <= 0.5) {
    deliveryCharge = rates.upTo0_5kg;
  } else if (totalWeight <= 1) {
    deliveryCharge = rates.upTo1kg;
  } else if (totalWeight <= 5) {
    deliveryCharge = rates.upTo5kg;
  }

  return deliveryCharge;
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    data: [],
    totalItems: 0,
    totalAmount: 0,
    totalAmountItems: 0,
    deliveryCharge: 0,
    selectedProvince: "Punjab",
  },
  reducers: {

    add(state, action) {
      const tempItem = state.data.find((item) => item.id === action.payload.id);
      if (tempItem) {
        const tempCart = state.data.map((item) => {
          if (item.id === action.payload.id) {
            let newQty = item.quantity + action.payload.quantity;

            const stockItem =
              item.stock && item.stock.length > 0 ? item.stock[0] : null;
            const pricePerItem = stockItem
              ? parseFloat(stockItem.discount_price)
              : item.price;

            let newTotalPrice = newQty * pricePerItem;

            return { ...item, quantity: newQty, totalPrice: newTotalPrice };
          } else {
            return item;
          }
        });

        state.data = tempCart;
      } else {
        state.data.push(action.payload);
      }
    },
    remove(state, action) {
      const tempCart = state.data.filter((item) => item.id !== action.payload);
      state.data = tempCart;
    },
    clearCart(state) {
      state.data = [];
      state.totalItems = 0;
    },
    toggleCartQty(state, action) {
      const tempCart = state.data.map((item) => {
        if (item.id === action.payload.id) {
          let tempQty = item.quantity;
          let tempTotalPrice = item.totalPrice;

          if (action.payload.type === "INC" || action.payload.type === "DEC") {
            tempQty = action.payload.type === "INC" ? tempQty + 1 : tempQty - 1;
            if (tempQty < 1) tempQty = 1;

            const stockItem =
              item.stock && item.stock.length > 0 ? item.stock[0] : null;
            const pricePerItem = stockItem
              ? parseFloat(stockItem.discount_price)
              : item.price;

            tempTotalPrice = tempQty * pricePerItem;
          }

          return { ...item, quantity: tempQty, totalPrice: tempTotalPrice };
        } else {
          return item;
        }
      });

      state.data = tempCart;
    },
    getCartTotal(state, action) {
      const { province } = action.payload || {};
      // Calculate totalAmount, totalItems, and totalWeight
      let { totalAmount, totalItems, totalWeight,totalAmountItems } = state.data.reduce(
        (cartTotal, cartItem) => {
          const { quantity, price, weight, stock } = cartItem;
          // Determine the item total price
          let itemTotal;
          if (stock && stock.length > 0) {
            const { discount_price } = stock[0];
            itemTotal = discount_price !== undefined ? discount_price : price;
          } else {
            itemTotal = price;
          }
          // Accumulate totals
          cartTotal.totalAmountItems += itemTotal * quantity
          cartTotal.totalAmount += itemTotal * quantity;
          cartTotal.totalItems += quantity;
          cartTotal.totalWeight += weight * quantity;
          return cartTotal;
        },
        {
          totalAmount: 0,
          totalItems: 0,
          totalWeight: 0,
          totalAmountItems: 0
        }
      );
      // Update totalItems and totalAmount
      state.totalItems = totalItems;
      state.totalAmount = parseFloat((totalAmount).toFixed(2));
      state.totalAmountItems = parseFloat((totalAmountItems).toFixed(2))
      // Calculate delivery charge based on the selected province and total weight
      state.deliveryCharge = calculateDeliveryCharge(totalWeight, province);
      // Add delivery charge to the total amount
      state.totalAmount += state.deliveryCharge;
    },
  },
});

export const {
  add,
  remove,
  toggleCartQty,
  getCartTotal,
  clearCart,
  resetCart,
} = cartSlice.actions;
export default cartSlice.reducer;
