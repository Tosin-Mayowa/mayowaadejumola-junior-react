const initialState = {
  carts: [],
  index: 0,
  initialTotal:0
};

export default function reducer(state = initialState, action) {
  if (action.type === "ADD TO CART") {
    let newState =
      state.carts.length === 0
        ? { ...state, carts: [...state.carts, action.payload] }
        : {
            ...state,
            carts: [
              ...state.carts.reduce((cart, val) => {
                if (val.id === action.payload.id) {
                  return cart.push(val);
                } else {
                  const newVal =
                    state.carts.length >= 2
                      ? [
                          ...state.carts.filter(
                            (item) => item.id !== action.payload.id
                          ),
                          action.payload,
                        ]
                      : [...state.carts, action.payload];
                  return newVal;
                }
              }, []),
            ],
          };
          const realState={...newState,carts:newState.carts?.map(item=>({...item,qty:1}))};
    return realState;
  }

  if (action.type === "USD") {
    return { ...state, index: action.payload };
  }

  if (action.type === "GBP") {
    return { ...state, index: action.payload };
  }

  if (action.type === "AUD") {
    return { ...state, index: action.payload };
  }

  if (action.type === "JPY") {
    return { ...state, index: action.payload };
  }

  if (action.type === "RUB") {
    return { ...state, index: action.payload };
  };

  
  if (action.type === "INITIAL TOTAL") {
    return { ...state, initialTotal:state.carts.reduce((a, b) => a + b.prices[state.index].amount, 0).toFixed(2) };
  };




  return state;
}
