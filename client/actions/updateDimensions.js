import { UPDATE_DIMENSIONS } from './types';

export default function (height, width) {
    return {
        type: UPDATE_DIMENSIONS,
        payload: {
            height,
            width
        }
    };
}
