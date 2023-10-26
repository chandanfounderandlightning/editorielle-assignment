import {
  useMemo, useState,
} from 'react';
import {
  AlertErrorIcon, AlertSuccessIcon,
} from "../../icons";
import type { AlertProps } from './types';
import { Typography } from '../../atoms/typography';

const getAlertTextColor = (type: AlertProps['type']) => type === 'success' ? 'text-green-800' : 'text-red-800';
const getAlertVisibility = (show: AlertProps['show']) => show ? 'flex' : 'hidden';
const getAlertColor = (type: AlertProps['type']) => type === 'success' ? 'bg-green-50' : 'bg-red-50';

export const useAlert = () => {
  const [alertState, setAlertState] = useState<AlertProps>({
    show: false,
    type: 'success',
    title: '',
    content: '',
  });
  const computedClasses = useMemo(() => {
    const alertTextColorClasses = getAlertTextColor(alertState.type);
    const alertColorClasses = getAlertColor(alertState.type);
    const alertVisibilityClasses = getAlertVisibility(alertState.show);

    return {
      alertTextColorClasses,
      alertColorClasses,
      alertVisibilityClasses,
    };
  }, [alertState]);
  const Alert = () => {
    return (
      <div
        className={`mt-3 p-4 rounded-md items-center ${computedClasses.alertColorClasses} ${computedClasses.alertVisibilityClasses}`}
        data-cy="alert-popup"
      >
        {alertState.type === 'success' && <AlertSuccessIcon className="text-white fill-green-400 mr-3" />}
        {alertState.type === 'error' && <AlertErrorIcon className="text-white fill-red-400 mr-3" />}
        {alertState.title !== '' && (
          <Typography variant="body-sm" classes={`mb-2 ${computedClasses.alertTextColorClasses}`}>
            {alertState.title}
          </Typography>
        )}
        <Typography variant="body-sm" classes={computedClasses.alertTextColorClasses} data-cy="alert-content">
          {alertState.content}
        </Typography>
      </div>
    );
  };

  return {
    setAlertState,
    Alert,
  };
};

export default useAlert;
