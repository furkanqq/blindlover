import { clsx } from 'clsx';
import Image from 'next/image';
import React from 'react';

interface HeartAnimationProps {
  topPX?: string;
  leftPX?: string;
  rightPX?: string;
  bottomPX?: string;
}

const HeartAnimation: React.FC<HeartAnimationProps> = ({ topPX, leftPX, rightPX, bottomPX }) => {
  return (
    <div
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      style={{
        top: topPX ? topPX : '50%',
        left: leftPX ? leftPX : '50%',
        right: rightPX,
        bottom: bottomPX,
      }}
    >
      <div className="relative w-16 h-16">
        <div
          className={clsx(
            `absolute top-0 left-0 w-full h-full clip-heart animate-jump animate-infinite animate-ease-out animate-alternate animate-duration-[2000ms]`
          )}
        >
          <Image src="/heart.png" alt="heart" layout="fill" objectFit="contain" />
        </div>
      </div>
    </div>
  );
};

export default HeartAnimation;
