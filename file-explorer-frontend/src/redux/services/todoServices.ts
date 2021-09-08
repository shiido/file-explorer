// Utils
import api from '@/utiles/apiUtils';

export const todoFinder = async () => {
   try {
      return await api.get('/todos');
   } catch (e: any) {
      throw new Error(e);
   }
};