// Store
import { store } from '@/redux/store';

// Utils
import notify from '@/utiles/toastUtil';

const optionsDefault = {
   duration: 2000,
   message: '',
   display: true,
   returnData: false,
};

const helper = (response, options) => {
   const { problem, status, data } = response;
   options = { ...optionsDefault, ...options };
   let output = 's';

   switch (problem) {
      // 400-499 (Any non-specific 400 series error.)
      case 'CLIENT_ERROR':
         switch (status) {
            case 401:
               //output = i18next.t('notify_error_client_401');
               //store.dispatch(onSetAuthLogout());
               break;
            case 403:
               //output = i18next.t('notify_error_client_403');
               break;
            case 404:
               //output = i18next.t('notify_error_client_404');
               break;
            default:
               //output = i18next.t('notify_error_client_default');
               break;
         }
         break;
      // 500-599 (Any 500 series error.)
      case 'SERVER_ERROR':
         switch (status) {
            case 500:
               // output = data?.message ? i18next.t(data.message) : 'Error';
               output = data?.err?.message || 'Error';
               break;
            default:
               //output = i18next.t('notify_error_server_default');
               break;
         }
         break;
      // Server didn't respond in time.
      case 'TIMEOUT_ERROR':
         //output = i18next.t('notify_error_timeout_error');
         break;
      // Server not available, bad dns.
      case 'CONNECTION_ERROR':
         //output = i18next.t('notify_error_connection_error');
         break;
      // Network not available.
      case 'NETWORK_ERROR':
         //output = i18next.t('notify_error_network_error');
         break;
      //  Request has been cancelled. Only possible if cancelToken is provided in config, see axios Cancellation.
      case 'CANCEL_ERROR':
         //output = i18next.t('notify_error_cancel_error');
         break;

      default:
         //output = i18next.t('notify_error_unknown');
         break;
   }

   // show?
   if (
      problem === 'TIMEOUT_ERROR' ||
      problem === 'NETWORK_ERROR' ||
      (options.display === true && problem !== null)
   ) {
      notify({
         status: 'error',
         title: output,
         duration: options.duration,
      });
   }

   // 200-299 (No problems.)
   if (problem === 'NONE' || problem === null) {
      if (options.message) {
         notify({
            status: 'success',
            title: options.message,
            duration: options.duration,
         });
      }
      return data || true;
   } else {
      return options.returnData === false ? false : data;
   }
};

export default helper;