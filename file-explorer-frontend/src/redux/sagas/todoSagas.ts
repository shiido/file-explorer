import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

// Types
import Types from '@/redux/types/todoTypes';

// Actions
import { onTodoFindReceive } from '@/redux/actions/todoActions';

// Services
import { todoFinder } from '@/redux/services/todoServices';

// Utils
import helper from '@/utiles/helperUtil';

function* fetchTodoFinder() {
   try {

      const res = yield call(todoFinder);
      // const res = yield call(todoFinder, payload);

      const data = helper(res, { message: 'Toasts' });

      if (data) {
         yield put(onTodoFindReceive(data));
      }

   } catch (e) {
      console.warn(e);
   }

}

export default [
   takeLatest(Types.TODO_FIND, fetchTodoFinder)
];

