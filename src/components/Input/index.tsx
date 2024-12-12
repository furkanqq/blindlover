import * as React from 'react';
import { useEffect, useState } from 'react';

import { IconEye } from '@/assets/IconEye';
import { IconEyeOff } from '@/assets/IconEyeOff';
import { cn } from '@/utils/cn';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    const [changeType, setChangeType] = useState('');

    useEffect(() => {
      if (type) {
        setChangeType(type);
      } else {
        setChangeType('text');
      }
    }, []);

    return (
      <div className="relative flex items-center justify-center">
        <input
          type={changeType}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            className
          )}
          ref={ref}
          {...props}
        />
        {type === 'password' && (
          <div className="absolute right-3 top-[50%] translate-y-[-50%] text-gray-500 cursor-pointer">
            {changeType !== 'text' ? (
              <div onClick={() => setChangeType('text')}>
                <IconEye width={16} height={16} />
              </div>
            ) : (
              <div onClick={() => setChangeType('password')}>
                <IconEyeOff width={16} height={16} />
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
