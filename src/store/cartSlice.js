
const { createSlice } = require('@reduxjs/toolkit');

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        data: [],
        totalItems: 0,
        totalAmount: 0,
        deliveryCharge: 0
    },
    reducers: {
        add(state, action) {
            const tempItem = state.data.find(item => item.id === action.payload.id);
            if (tempItem) {
                const tempCart = state.data.map(item => {
                    if (item.id === action.payload.id) {
                        let newQty = item.quantity + action.payload.quantity;
                        let newTotalPrice = newQty * item.price;
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
            const tempCart = state.data.filter(item => item.id !== action.payload);
            state.data = tempCart;
        },
        clearCart(state) {
            state.data = [];
        },
       
        toggleCartQty(state, action) {
            const tempCart = state.data.map(item => {
                if (item.id === action.payload.id) {
                    let tempQty = item.quantity;
                    let tempTotalPrice = item.totalPrice;
                    if (action.payload.type === "INC") {
                        tempQty++;
                        tempTotalPrice = tempQty * item.price;
                    }
                    if (action.payload.type === "DEC") {
                        tempQty--;
                        if (tempQty < 1) tempQty = 1;
                        tempTotalPrice = tempQty * item.price;
                    }
                    return { ...item, quantity: tempQty, totalPrice: tempTotalPrice };
                } else {
                    return item;
                }
            });
            state.data = tempCart;
        },
        getCartTotal(state) {
            let {totalAmount,totalItems} = state.data.reduce((cartTotal, cartItem) => {
                const { price, quantity } = cartItem
                const itemTotal = price * quantity;
                cartTotal.totalAmount += itemTotal;
                cartTotal.totalItems += quantity;
                return cartTotal
            }, {
                totalAmount:0,
              totalItems: 0,
            });
            state.totalItems = totalItems;
            state.totalAmount = parseInt(totalAmount.toFixed(2))
        },
    },
});

export const { add, remove, toggleCartQty, getCartTotal, clearCart } = cartSlice.actions;
export default cartSlice.reducer;