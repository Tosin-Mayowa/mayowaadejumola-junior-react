export const addToCart = (value) => ({ type: 'ADD TO CART',payload:value });
export const addToCartWithSelectedAtt= (value) => ({ type: 'WITH SELECTED ATTRIBUTES',payload:value });
export const addToCartFromDesc= (value) => ({ type: 'ADD FROM PRODUCT DESCRIPTION',payload:value });
export const usd= ()=>({ type: 'USD',payload:0});
export const gbp= ()=>({ type: 'GBP',payload:1});
export const aud= ()=>({ type: 'AUD',payload:2});
export const jpy= ()=>({ type: 'JPY',payload:3});
export const rub= ()=>({ type: 'RUB',payload:4});
export const initialTotal= ()=>({ type: 'INITIAL TOTAL'});
export const isCloseSwitcher=()=>({ type: 'CLOSE SWITCHER'});
export const isToggle= ()=>({ type: 'TOGGLE SWITCHER'});
export const removeProduct=(id)=>({ type:'REMOVE', payload:id});
export const setOverflow=()=>({ type:'OVERFLOW'});
export const addFromModal= (value) => ({ type: 'ADD FROM MODAL',payload:value });
export const removeFromModal=(id)=>({ type:'REMOVE FROM MODAL', payload:id});
export const removeFromCartPage=(id)=>({ type:'REMOVE FROM CARTPAGE', payload:id})