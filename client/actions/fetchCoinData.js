import { FETCH_COIN_DATA } from './types';
import axios from 'axios';
import {devServer} from '../helpers/hostHelper';


export default function(name) {

  let response = axios.get(`${devServer}/internal/coin/${name}`);

  return { type: FETCH_COIN_DATA, payload: response };
}
