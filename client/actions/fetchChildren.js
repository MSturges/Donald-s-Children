import { FETCH_CHILDREN } from './types';
import axios from 'axios';


export default function() {

  let response = axios.get('/api/internal/children');

  return { type: FETCH_CHILDREN, payload: response };
}
