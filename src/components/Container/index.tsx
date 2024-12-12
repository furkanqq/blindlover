import classNames from 'classnames';
import React from 'react';

type ContainerProps = {
  className?: string;
  children: React.ReactNode;
  right?: React.ReactNode;
  type?: 'mobile' | 'web';
  title?: string;
  mt?: number;
  mb?: number;
  py?: number;
  px?: number;
  ps?: number;
  pe?: number;
};

export const Container = (props: ContainerProps) => {
  const { type = 'web', className, children, title, right, mt, mb, py, px, ps, pe } = props;

  const dynamicStyle: React.CSSProperties = {
    paddingRight: pe ?? px,
    paddingLeft: ps ?? px,
    paddingBottom: py,
    marginBottom: mb,
    paddingTop: py,
    marginTop: mt,
  };

  if (type === 'web') {
    return (
      <div
        className={classNames(
          'w-full max-w-full mx-auto px-4 sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl',
          className
        )}
      >
        {children}
      </div>
    );
  } else {
    return (
      <div className={classNames('bg-light w-full max-w-full mx-auto px-4 py-4', className)} style={dynamicStyle}>
        <div className={classNames('flex items-center justify-between', !(px || ps || pe) && 'px-4')}>
          <div className="text-xl font-semibold">{title}</div>
          {right}
        </div>
        {children}
      </div>
    );
  }
};
