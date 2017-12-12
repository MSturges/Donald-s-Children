import { FETCH_CHILDREN } from '../actions/types';

const initialState = {
    children: [],
};


export default function (state = initialState , action) {
    switch (action.type) {
        case FETCH_CHILDREN:

          return { ...state, children: action.payload.data.result }
        default:
            return { ...state };
    }
};
