import { toast, ToastOptions } from 'react-hot-toast';

type ToastType = 'success' | 'error';

interface ToastConfig {
  duration?: number;
  position?: 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left';
}

export const useToast = () => {
  const defaultConfig: ToastConfig = {
    duration: 3000,
    position: 'top-right',
  };

  const showToast = (message: string, type: ToastType, config?: ToastConfig) => {
    const options: ToastOptions = {
      duration: config?.duration || defaultConfig.duration,
      position: config?.position || defaultConfig.position,
      style: {
        background: type === 'success' ? '#10B981' : '#EF4444',
        color: '#fff',
        padding: '16px',
        borderRadius: '8px',
      },
    };

    return toast(message, options);
  };

  return {
    success: (message: string, config?: ToastConfig) => showToast(message, 'success', config),
    error: (message: string, config?: ToastConfig) => showToast(message, 'error', config),
  };
};