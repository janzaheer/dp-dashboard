const { createSlice } = require("@reduxjs/toolkit");

// Define the calculatePrice function
// 150 80 60
// const provinceRates = {
//   Punjab: {
//     upTo0_5g: 160, // 150 0.1 to 4.9 rs
//     upTo1kg: 180, // 150
//     upTo5kg: 400, // 80 5gram to 9.9kg rs
//     upTo10kg: 600, // 60
//     above10kg: 600,
//   },
//   Balochistan: {
//     upTo0_5g: 200,
//     upTo1kg: 230,
//     upTo5kg: 400,
//     upTo10kg: 600,
//     above10kg: 600,
//   },
//   Sindh: {
//     upTo0_5g: 200,
//     upTo1kg: 230,
//     upTo5kg: 400,
//     upTo10kg: 600,
//     above10kg: 600,
//   },
//   KPK: {
//     upTo0_5g: 200,
//     upTo1kg: 230,
//     upTo5kg: 400,
//     upTo10kg: 600,
//     above10kg: 600,
//   },
// };

// const calculateDeliveryCharge = (totalWeight, province = "Punjab") => {
//   const rates = provinceRates[province];

//   if (totalWeight >= 0.1 && totalWeight <= 0.5) {
//     return rates.upTo0_5g;
//   } else if (totalWeight >= 0.6 && totalWeight <= 1.0) {
//     return rates.upTo1kg;
//   } else if (totalWeight >= 1.1 && totalWeight <= 5.0) {
//     return rates.upTo5kg;
//   } else if (totalWeight >= 5.1 && totalWeight <= 9.9) {
//     return rates.upTo10kg;
//   } else if (totalWeight >= 10) {
//     return rates.above10kg;
//   } else {
//     return 0; // Default to 0 if the weight does not fall within any specified range
//   }
// };

const provinceRates = {
  Punjab: {
    upTo0_5g: 160,
    upTo1kg: 180,
    additionalPerKgUpTo5kg: 120, // Each additional kg from 0.1 to 4.9 kg
    upTo5kg: 400, // For 5 kg
    additionalPer5kgUpTo10kg: 80, // Each additional kg from 5.0 to 9.9 kg
    upTo10kg: 600, // For 10 kg
    additionalPer10kg: 60, // Each additional kg above 10 kg
    above10kg: 600,
  },
  Balochistan: {
    upTo0_5g: 200,
    upTo1kg: 230,
    additionalPerKgUpTo5kg: 120,
    upTo5kg: 400,
    additionalPer5kgUpTo10kg: 80,
    upTo10kg: 600,
    additionalPer10kg: 60,
    above10kg: 600,
  },
  Sindh: {
    upTo0_5g: 200,
    upTo1kg: 230,
    additionalPerKgUpTo5kg: 120,
    upTo5kg: 400,
    additionalPer5kgUpTo10kg: 80,
    upTo10kg: 600,
    additionalPer10kg: 60,
    above10kg: 600,
  },
  KPK: {
    upTo0_5g: 200,
    upTo1kg: 230,
    additionalPerKgUpTo5kg: 120,
    upTo5kg: 400,
    additionalPer5kgUpTo10kg: 80,
    upTo10kg: 600,
    additionalPer10kg: 60,
    above10kg: 600,
  },
};

// const calculateDeliveryCharge = (totalWeight, totalItems, province = "Punjab") => {
//   const rates = provinceRates[province];
//   let deliveryCharge = 0;

//   if (totalWeight >= 0.1 && totalWeight <= 0.5) {
//     deliveryCharge = rates.upTo0_5g;
//   } else if (totalWeight >= 0.6 && totalWeight <= 1.0) {
//     deliveryCharge = rates.upTo1kg;
//   } else if (totalWeight > 1.0 && totalWeight <= 4.9) {
//     deliveryCharge = rates.upTo1kg + Math.ceil(totalWeight - 1) * rates.additionalPerKgUpTo5kg;
//   } else if (totalWeight >= 5.0 && totalWeight <= 9.9) {
//     deliveryCharge = rates.upTo5kg + Math.ceil(totalWeight - 5) * rates.additionalPer5kgUpTo10kg;
//   } else if (totalWeight >= 10) {
//     deliveryCharge = rates.upTo10kg + Math.ceil(totalWeight - 10) * rates.additionalPer10kg;
//   }

//   // Multiply delivery charge by total items
//   return deliveryCharge * totalItems;
// };
const calculateDeliveryCharge = (itemWeight, quantity, province = "Punjab") => {
  const rates = provinceRates[province];
  let initialCharge = 0;
  let additionalCharge = 0;

  if (itemWeight <= 0.5) {
    initialCharge = rates.upTo0_5g;
    additionalCharge = rates.additionalPerKgUpTo5kg;
  } else if (itemWeight <= 1.0) {
    initialCharge = rates.upTo1kg;
    additionalCharge = rates.additionalPerKgUpTo5kg;
  } else if (itemWeight <= 4.9) {
    initialCharge = rates.upTo1kg + Math.ceil(itemWeight - 1) * rates.additionalPerKgUpTo5kg;
    additionalCharge = rates.additionalPerKgUpTo5kg;
  } else if (itemWeight <= 9.9) {
    initialCharge = rates.upTo5kg + Math.ceil(itemWeight - 5) * rates.additionalPer5kgUpTo10kg;
    additionalCharge = rates.additionalPer5kgUpTo10kg;
  } else {
    initialCharge = rates.above10kg;
    additionalCharge = rates.additionalPer10kg;
  }

  const totalDeliveryCharge = initialCharge + (quantity - 1) * additionalCharge;
  return totalDeliveryCharge;
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
    // getCartTotal(state, action) {
    //   const { province } = action.payload || {};
    //   // Calculate totalAmount, totalItems, and totalWeight
    //   let { totalAmount, totalItems, totalWeight,totalAmountItems } = state.data.reduce(
    //     (cartTotal, cartItem) => {
    //       const { quantity, price, weight, stock } = cartItem;
    //       // Determine the item total price
    //       let itemTotal;
    //       if (stock && stock.length > 0) {
    //         const { discount_price } = stock[0];
    //         itemTotal = discount_price !== undefined ? discount_price : price;
    //       } else {
    //         itemTotal = price;
    //       }
    //       // Accumulate totals
    //       cartTotal.totalAmountItems += itemTotal * quantity
    //       cartTotal.totalAmount += itemTotal * quantity;
    //       cartTotal.totalItems += quantity;
    //       cartTotal.totalWeight += weight * quantity;
    //       return cartTotal;
    //     },
    //     {
    //       totalAmount: 0,
    //       totalItems: 0,
    //       totalWeight: 0,
    //       totalAmountItems: 0
    //     }
    //   );
    //   // Update totalItems and totalAmount
    //   state.totalItems = totalItems;
    //   state.totalAmount = parseFloat((totalAmount).toFixed(2));
    //   state.totalAmountItems = parseFloat((totalAmountItems).toFixed(2))
    //   state.deliveryCharge = calculateDeliveryCharge(totalWeight, province) * state.totalItems;
    //   // Add delivery charge to the total amount
    //   state.totalAmount += state.deliveryCharge;
    // },
    getCartTotal(state, action) {
      const { province } = action.payload || {};
      const selectedProvince = province || state.selectedProvince;
      // Calculate totalAmount, totalItems, and totalWeight
      let { totalAmount, totalItems, totalWeight, totalAmountItems } = state.data.reduce(
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
          cartTotal.totalAmountItems += itemTotal * quantity;
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
      // Calculate delivery charge
      const deliveryCharge = calculateDeliveryCharge(totalWeight / totalItems, totalItems, selectedProvince);
      // Update totalItems and totalAmount
      state.totalItems = totalItems;
      state.totalAmount = parseFloat((totalAmount + deliveryCharge).toFixed(2));
      state.totalAmountItems = parseFloat(totalAmountItems.toFixed(2));
      state.deliveryCharge = deliveryCharge;
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

// const calculateDeliveryCharge = (totalWeight, province = "Punjab") => {
//   const rates = provinceRates[province];

//   if (totalWeight <= 0.5 && totalWeight >= 0.1) {
//     return rates.upTo0_5kg;
//   } else if (totalWeight <= 1 && totalWeight > 0.5) {
//     return rates.upTo1kg;
//   } else if (totalWeight <= 5 && totalWeight > 1) {
//     return rates.upTo5kg;
//   } else if (totalWeight <= 30 && totalWeight > 5) {
//     return rates.upTo30kg;
//   } else {
//     return 0; // Default to 0 if the weight does not fall within any specified range
//   }
// };
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