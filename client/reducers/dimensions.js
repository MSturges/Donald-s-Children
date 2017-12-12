import { UPDATE_DIMENSIONS } from '../actions/types';

const initialState = {
    dimensions: {
        height: 0,
        width: 0
    }
};

export default function (state = initialState , action) {
    switch (action.type) {
        case UPDATE_DIMENSIONS:
            return {
                ...state,
                dimensions: {
                    height: action.payload.height,
                    width: action.payload.width
                }
            };

        default:
            return { ...state };
    }
};
