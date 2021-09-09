import produce from 'immer';

// types
import Types from '@/redux/types/directoryTypes';

const initialState = {
   sample: {
      folders: [] as any,
   }
};

const reducer = (state = initialState, action: any) => {

   const { type, payload } = action;

   switch (type) {
      case Types.FILES_FIND: {
         state.sample.folders = payload.data;
         return;
      }
      default:
         return state;
   }

};

export default produce(reducer);