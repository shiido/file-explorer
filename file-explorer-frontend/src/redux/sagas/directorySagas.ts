import { takeLatest } from 'redux-saga/effects';

// types
import Types from '@/redux/types/directoryTypes';

// eslint-disable-next-line
function* fetch() {
   try {

      // yield put someAction ---> (in this app it's wasn't necessary implement)

   } catch (e) {
      console.warn(e);
   }

}

export default [
   takeLatest(Types.FILES_FIND, fetch)
];