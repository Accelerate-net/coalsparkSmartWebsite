const Storage = (cartItems) => {
    localStorage.setItem('cartItem', JSON.stringify(cartItems.length > 0 ? cartItems : []));
}

export const getItemCount = (basket) => (
    basket?.reduce((count, item) => item.itemCount + count, 0)

)

export const getInCount = (basket, itemCode) => (
    basket.map(itemI => (itemI.itemCode === itemCode ? itemI.itemCount : null)))

export const getBasketTotal = (basket) => (
    basket?.reduce((amount, item) => parseInt(item.itemPrice) + amount, 0)
)

const reducer = (state, action) => {

    switch (action.type) {
        case "ADD_TO_BASKET":
            // Logic for adding item to basket
            const bas = [...state.basket]

            let productAlready = false
            let itemIsCustom = action.item.isCustom
            if (itemIsCustom) {
                bas.forEach(item => {
                    if (item.customVariant === action.item.customVariant) {
                        productAlready = true;
                        item.itemCount = item.itemCount + 1;
                        item.itemPrice = item.itemCount * item.itemOriginalPrice
                    }
                });
                if (!productAlready) {
                    bas.push({
                        ...action.item,
                        itemCount: 1,
                        itemOriginalPrice: action.item.itemPrice,
                        itemOptions: action.item.customOpt
                    })
                }
            } else {
                bas.forEach(item => {
                    if (item.itemCode === action.item.itemCode) {
                        productAlready = true;
                        item.itemCount = item.itemCount + 1;
                        item.itemPrice = item.itemCount * item.itemOriginalPrice
                    }
                });
                if (!productAlready) {
                    bas.push({
                        ...action.item,
                        itemCount: 1,
                        itemOriginalPrice: action.item.itemPrice,
                        itemOptions: action.item.customOpt
                    })
                }
            }
            // localStorage.setItem("cartItem", JSON.stringify(bas))
            Storage(bas)
            return {
                ...state,
                basket: bas,
            };

        case "REMOVE_FROM_BASKET":
            // Logic to Removing item from basket
            let newBasket = [...state.basket];
            const index = state.basket.findIndex(
                (basketItem) => basketItem.itemCode === action.itemCode
            );

            if (index >= 0) {
                // item exists in basket, so remove
                newBasket.splice(index, 1);
            } else {
                console.warn(
                    "Cant remove product as its not in basket"
                );
            }
            return {
                ...state,
                basket: newBasket,
            };
        case "DECREASE_ITEM":
            let decreaseItemBasket = [...state.basket]
            let itemIsCustomDecrese = action.isCustom
            if (itemIsCustomDecrese) {
                decreaseItemBasket.forEach((item) => {
                    if (item.customVariant === action.customVariant) {
                        // item.itemCount === 1 ? item.itemCount = 1 : item.itemCount -= 1;
                        if (item.itemCount === 1) {
                            const index = state.basket.findIndex(
                                (basketItem) => basketItem.customVariant === action.customVariant
                            );
                            if (index >= 0) {
                                // item exists in basket, so remove
                                decreaseItemBasket.splice(index, 1);
                            } else {
                                console.warn(
                                    "Cant remove product as its not in basket"
                                );
                            }
                        } else {
                            item.itemCount -= 1
                            item.itemPrice = item.itemCount * item.itemOriginalPrice
                        }
                    }
                })
            } else {
                decreaseItemBasket.forEach((item) => {
                    if (item.itemCode === action.itemCode) {
                        // item.itemCount === 1 ? item.itemCount = 1 : item.itemCount -= 1;
                        if (item.itemCount === 1) {
                            const index = state.basket.findIndex(
                                (basketItem) => basketItem.itemCode === action.itemCode
                            );
                            if (index >= 0) {
                                // item exists in basket, so remove
                                decreaseItemBasket.splice(index, 1);
                            } else {
                                console.warn(
                                    "Cant remove product as its not in basket"
                                );
                            }
                        } else {
                            item.itemCount -= 1
                            item.itemPrice = item.itemCount * item.itemOriginalPrice
                        }
                    }
                })
            }
            Storage(decreaseItemBasket)
            return {
                ...state,
                basket: decreaseItemBasket
            };

        case "INCREASE_ITEM":
            let increaseItemBasket = [...state.basket]
            let itemIsCustomAdd = action.isCustom
            if (itemIsCustomAdd) {
                increaseItemBasket.forEach((item) => {
                    if (item.customVariant === action.customVariant) {
                        item.itemCount += 1;
                        item.itemPrice = item.itemCount * item.itemOriginalPrice
                    }
                })
            } else {
                increaseItemBasket.forEach((item) => {
                    if (item.itemCode === action.itemCode) {
                        item.itemCount += 1;
                        item.itemPrice = item.itemCount * item.itemOriginalPrice
                    }
                })
            }
            Storage(increaseItemBasket)
            return {
                ...state,
                basket: increaseItemBasket
            };
        case "CLEAN_BASKET":
            let newB = []
            return{
                ...state,
                basket: newB
            };

        default:
            return state;
    }
};

export default reducer;