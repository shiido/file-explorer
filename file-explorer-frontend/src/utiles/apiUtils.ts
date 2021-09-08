import { create } from 'apisauce';
// Store
import { store } from '@/redux/store';

// Constants
import { SERVER_API } from '@/config/constants';

console.log("api", SERVER_API)

const api = create({ baseURL: SERVER_API, timeout: 5000 });

export default api;