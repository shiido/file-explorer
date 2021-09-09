// types
import Types from '@/redux/types/directoryTypes';

export const onFilesFind = (data: any[]) => ({
   type: Types.FILES_FIND,
   payload: { data }
});