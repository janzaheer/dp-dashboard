const { createSlice } = require("@reduxjs/toolkit");

// Define the calculatePrice function
const provinceRates = {
  Punjab: {
    upTo0_5kg: 100,
    upTo1kg: 120,
    upTo5kg: 150,
    upTo30kg: 200,
  },
  Balochistan: {
    upTo0_5kg: 110,
    upTo1kg: 130,
    upTo5kg: 160,
    upTo30kg: 210,
  },
  Sindh: {
    upTo0_5kg: 120,
    upTo1kg: 140,
    upTo5kg: 170,
    upTo30kg: 220,
  },
  KPK: {
    upTo0_5kg: 130,
    upTo1kg: 150,
    upTo5kg: 180,
    upTo30kg: 230,
  },
};

// const calculateDeliveryCharge = (totalWeight, province = "Punjab") => {
//   let deliveryCharge = 0;
//   const rates = provinceRates[province];

//   if (totalWeight <= 0.5) {
//     deliveryCharge = rates.upTo0_5kg;
//   } else if (totalWeight <= 1) {
//     deliveryCharge = rates.upTo1kg;
//   } else if (totalWeight <= 5) {
//     deliveryCharge = rates.upTo5kg;
//   }

//   return deliveryCharge;
// };

const calculateDeliveryCharge = (totalWeight, province = "Punjab") => {
  const rates = provinceRates[province];

  if (totalWeight <= 0.5 && totalWeight >= 0.1) {
    return rates.upTo0_5kg;
  } else if (totalWeight <= 1 && totalWeight > 0.5) {
    return rates.upTo1kg;
  } else if (totalWeight <= 5 && totalWeight > 1) {
    return rates.upTo5kg;
  } else if (totalWeight <= 30 && totalWeight > 5) {
    return rates.upTo30kg;
  } else {
    return 0; // Default to 0 if the weight does not fall within any specified range
  }
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
    // toggleCartQty(state, action) {
    //   const { id, type } = action.payload;
    //   const item = state.data.find((item) => item.id === id);

    //   if (!item) {
    //     return;
    //   }

    //   const tempCart = state.data.map((cartItem) => {
    //     if (cartItem.id === id) {
    //       let tempQty = cartItem.quantity;

    //       if (type === "INC") {
    //         tempQty += 1;
    //       } else if (type === "DEC") {
    //         tempQty = Math.max(tempQty - 1, 1);
    //       }

    //       return { ...cartItem, quantity: tempQty };
    //     }
    //     return cartItem;
    //   });
    //   state.data = tempCart;
    // },
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
      state.deliveryCharge = calculateDeliveryCharge(totalWeight, province) * state.totalItems;
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
