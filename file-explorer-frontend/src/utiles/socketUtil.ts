import { io } from 'socket.io-client';

import { SERVER_WEBSOCKET } from '@/config/constants';

const socket = io(`${SERVER_WEBSOCKET}`, {
   transports: ['websocket', 'polling'],
});

export default socket;