import { createStore } from 'redux';
import reducer from '../reducer';

// const initialStore={
//     carts:[],
//     index:0
// }


export const store = createStore(reducer);