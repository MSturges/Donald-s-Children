import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import sideNavReducer from './sideNavReducer';
import dimensionsReducer from './dimensions';
import childrenReducer from './children';
import coinReducer from './coin';


const rootReducer = combineReducers({
  sideNav: sideNavReducer,
  dimenstions: dimensionsReducer,
  children: childrenReducer,
  coinData: coinReducer
});

export default rootReducer;
