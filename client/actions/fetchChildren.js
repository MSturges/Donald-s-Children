import { FETCH_CHILDREN } from './types';
import axios from 'axios';
import {devServer} from '../helpers/hostHelper';


export default function() {


  let response = axios.get(`${devServer}/internal/children`);

  return { type: FETCH_CHILDREN, payload: response };
}
