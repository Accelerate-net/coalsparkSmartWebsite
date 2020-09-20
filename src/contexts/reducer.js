export const initialState = {
    basket: [],
};

export const getBasketTotal = (basket) =>
    basket?.reduce((amount, item) => item.itemPrice + amount, 0);

const reducer = (state, action) => {

    console.log(action);
    switch (action.type) {
        case "ADD_TO_BASKET":
            // Logic for adding item to basket

            const bas = [...state.basket]

            let productAlready = false
            bas.forEach(item => {
                console.log(action.item.itemCode)
                if (item.itemCode === action.item.itemCode) {
                    productAlready = true;
                    item.itemCount++;
                    item.itemPrice = item.itemCount * item.itemOriginalPrice
                }
            });
            if (!productAlready) {
                bas.push({
                    ...action.item,
                    itemCount: 1,
                    itemOriginalPrice: action.item.itemPrice
                })
            }

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
        default:
            return state;
    }
};

export default reducer;