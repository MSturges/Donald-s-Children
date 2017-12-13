import { FETCH_COIN_DATA } from './types';
import axios from 'axios';


export default function(name) {

  let response = axios.get(`/api/internal/coin/${name}`);

  return { type: FETCH_COIN_DATA, payload: response };
}
