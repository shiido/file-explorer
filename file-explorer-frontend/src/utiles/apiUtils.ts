import { create } from 'apisauce';

// Constants
import { SERVER_API } from '@/config/constants';

const api = create({ baseURL: SERVER_API, timeout: 5000 });

export default api;