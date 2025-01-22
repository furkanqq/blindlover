import { CSSProperties } from 'react';
import { toast } from 'sonner';

type ToastType = 'success' | 'warning' | 'error';
interface ToastOptions {
  icon?: React.ReactNode;
  style?: CSSProperties;
  duration?: number;
  type?: ToastType;
  message: string;
}

export const showToast = ({ type = 'success', duration = 1500, message, style, icon }: ToastOptions) => {
  const baseStyle: CSSProperties = {
    fontSize: '13px',
    padding: '1rem',
    color: '#000',
    ...style,
  };

  const styleTag = document.createElement('style');
  document.head.appendChild(styleTag);

  switch (type) {
    case 'success':
      styleTag.innerHTML = '[data-sonner-toast] [data-icon] svg { color: green }';
      return toast.success(message, {
        style: {
          ...baseStyle,
          background: '#2eb053',
          color: '#fff',
        },
        duration,
        icon,
      });

    case 'error':
      styleTag.innerHTML = '[data-sonner-toast] [data-icon] svg { color: white }';
      return toast.error(message, {
        style: {
          ...baseStyle,
          background: '#FF133F',
          color: '#fff',
        },
        duration,
        icon,
      });
    case 'warning':
      styleTag.innerHTML = '[data-sonner-toast] [data-icon] svg { color: orange }';
      return toast.warning(message, {
        style: {
          ...baseStyle,
        },
        duration,
        icon,
      });

    default:
      return toast.success(message, {
        style: baseStyle,
        duration,
        icon,
      });
  }
};
