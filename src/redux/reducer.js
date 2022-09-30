const initialState = {
  carts: [],
  pageCart: [],
  index: 0,
  initialTotal: 0,
  isOpenedSwitcher: false,
  isOverflow: false,
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
    const realState = {
      ...newState,
      carts: newState.carts?.map((item) => ({ ...item, qty: 1 })),
    };
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
  }

  if (action.type === "INITIAL TOTAL") {
    return {
      ...state,
      initialTotal: state.carts
        .reduce((a, b) => a + b.prices[state.index].amount, 0)
        .toFixed(2),
    };
  }

  if (action.type === "TOGGLE SWITCHER") {
    return { ...state, isOpenedSwitcher: !state.isOpenedSwitcher };
  }

  if (action.type === "CLOSE SWITCHER") {
    return { ...state, isOpenedSwitcher: false };
  }

  if (action.type === "REMOVE") {
    return {
      ...state,
      carts:
        state.carts.length === 1
          ? []
          : [...state.carts.filter((cart) => cart.id !== action.payload)],
    };
  }

  if (action.type === "OVERFLOW") {
    return { ...state, isOverflow: !state.isOverflow };
  }

  if (action.type === "WITH SELECTED ATTRIBUTES") {
    console.log(action.payload, "payy");
    console.log(state.carts, "che carts");

    let newState =
      state.carts.length === 0
        ? { ...state, carts: [...state.carts, action.payload] }
        : {
            ...state,
            carts: [
              ...state.carts.reduce((cart, val) => {
                if (val.id === action.payload.id) {
                  if (
                    val.attributes[0].value ===
                    action.payload.attributes[0].value
                  ) {
                    return cart.push(val);
                  } else {
                    return [...state.carts, action.payload];
                  }
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
    const realState = {
      ...newState,
      carts: newState.carts?.map((item) => ({ ...item, qty: 1 })),
    };
    return realState;
  }

  if (action.type === "ADD FROM MODAL") {
    let newState =
      state.pageCart.length === 0
        ? { ...state, pageCart: [...state.pageCart, ...action.payload] }
        : {
            ...state,
            pageCart: [
              ...state.pageCart.reduce((ar, item) => {
                if (action.payload.some((pay) => pay.id === item.id)) {
                  if (
                    action.payload.some(
                      (pay) =>
                        pay.attributes[0].value === item.attributes[0].value
                    )
                  ) {
                    return ar.push(item);
                  } else {
                    return [...state.pageCart, ...action.payload];
                    //  const newVal =
                    //    state.pageCart.length >= 1
                    //      ? [
                    //          ...action.payload.filter(
                    //            (pay) =>
                    //              pay.attributes[0].value !==
                    //              item.attributes[0].value
                    //          ),
                    //          item,
                    //        ]
                    //      : [...state.pageCart, ...action.payload];
                    //  return newVal;
                  }
                } else {
                  const newVal =
                    state.pageCart.length >= 2
                      ? [
                          ...state.pageCart.filter((item) =>
                            action.payload.some(
                              (pay) =>
                                pay.attributes[0].value !==
                                item.attributes[0].value
                            )
                          ),
                          ...action.payload,
                        ]
                      : [...state.pageCart, ...action.payload];
                  return newVal;
                }
              }, []),
            ],
          };

    const realState = {
      ...newState,
      pageCart: newState.pageCart?.map((item) => ({ ...item, qty: 1 })),
    };
    return realState;
  }

  return state;
}
