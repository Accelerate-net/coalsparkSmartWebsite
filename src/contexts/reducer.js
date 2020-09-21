const Storage = (cartItems) => {
    localStorage.setItem('cartItem', JSON.stringify(cartItems.length > 0 ? cartItems : []));
}

export const getItemCount = (basket) => (
    basket?.reduce((count, item) => item.itemCount + count, 0)

)

export const getBasketTotal = (basket) => (
    basket?.reduce((amount, item) => item.itemPrice + amount, 0)
)

const reducer = (state, action) => {

    console.log(action);
    switch (action.type) {
        case "ADD_TO_BASKET":
            // Logic for adding item to basket
            // console.log('added')
            const bas = [...state.basket]

            let productAlready = false
            bas.forEach(item => {
                console.log(item.itemCount)
                if (item.itemCode === action.item.itemCode) {
                    productAlready = true;
                    item.itemCount = item.itemCount + 1;
                    item.itemPrice = item.itemCount * item.itemOriginalPrice
                }
                console.log(item.itemCount)
            });
            if (!productAlready) {
                bas.push({
                    ...action.item,
                    itemCount: 1,
                    itemOriginalPrice: action.item.itemPrice
                })
            }
            // localStorage.setItem("cartItem", JSON.stringify(bas))
            // console.log(bas)
            Storage(bas)
            return {
                ...state,
                basket: bas
            };

        case "REMOVE_FROM_BASKET":
            // Logic to Removing item from basket
            let newBasket = [...state.basket];
            const index = state.basket.findIndex(
                (basketItem) => basketItem.itemCode === action.itemCode
            );
            //   console.log(index);

            if (index >= 0) {
                // item exists in basket, so remove
                newBasket.splice(index, 1);
            } else {
                console.warn(
                    "Cant remove product (id: ${action.itemCode}) as its not in basket"
                );
            }
            return {
                ...state,
                basket: newBasket,
            };
        case "DECREASE_ITEM":
            console.log('clicked')
            let decreaseItemBasket = [...state.basket]
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
                                "Cant remove product (id: ${action.itemCode}) as its not in basket"
                            );
                        }
                    } else {
                        item.itemCount -= 1
                        item.itemPrice = item.itemCount * item.itemOriginalPrice
                    }
                }
            })
            Storage(decreaseItemBasket)
            // localStorage.setItem("cartItem", decreaseItemBasket)
            return {
                ...state,
                basket: decreaseItemBasket
            };

        case "INCREASE_ITEM":
            console.log('clicked')
            let increaseItemBasket = [...state.basket]
            increaseItemBasket.forEach((item) => {
                if (item.itemCode === action.itemCode) {
                    item.itemCount += 1;
                    item.itemPrice = item.itemCount * item.itemOriginalPrice
                }
            })
            Storage(increaseItemBasket)
            return {
                ...state,
                basket: increaseItemBasket
            };


        default:
            return state;
    }
};

export default reducer;