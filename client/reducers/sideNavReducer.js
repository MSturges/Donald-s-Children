import { TOGGLE_SIDE_NAV } from '../actions/types';

const initialState = {
    sideNavOpen: false
};

export default function (state = initialState , action) {
    switch (action.type) {
        case TOGGLE_SIDE_NAV:

            return { ...state, sideNavOpen: action.payload !== undefined ? action.payload : !state.sideNavOpen };
        default:
            return { ...state };
    }
};
