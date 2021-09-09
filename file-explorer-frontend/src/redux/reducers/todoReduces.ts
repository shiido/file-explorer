import produce from 'immer';
// Types
import Types from '@/redux/types/todoTypes';

const initialState = {
   data: {
      all: [],
   },
   loading: {
      all: false,
   },
   sample: {
      folders: [] as any,
   }
};

const reducer = (state = initialState, action) => {
   const { type, payload } = action;

   switch (type) {
      case Types.TODO_FIND_RECEIVE: {
         state.data.all = payload.data;
         return;
      }
      case Types.FILES_FIND: {
         state.sample.folders = payload.data;
         return;
      }
      default:
         return state;
   }

};

export default produce(reducer);