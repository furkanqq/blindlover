import { Toaster as SonnerToaster } from 'sonner';

interface IProps {
  position?: 'bottom-center' | 'bottom-right' | 'bottom-left' | 'top-center' | 'top-right' | 'top-left';
}

export const Toaster: React.FC<IProps> = ({ position }) => {
  return <SonnerToaster position={position} visibleToasts={5} expand={false} theme="light" offset={20} />;
};
