// Types
import Types from '@/redux/types/todoTypes';

export const onTodoFind = () => ({
   type: Types.TODO_FIND,
});

export const onTodoFindReceive = (data: any) => ({
   type: Types.TODO_FIND_RECEIVE,
   payload: { data }
});