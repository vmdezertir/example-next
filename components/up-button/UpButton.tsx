'use client';

import clsx from 'clsx';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { Icon } from '@/components/icon';

import styles from './styles.module.scss';

function scrollToTop(smooth: boolean = false) {
  if (smooth) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  } else {
    document.documentElement.scrollTop = 0;
  }
}

interface IUpButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  offsetTop?: number;
  smooth?: boolean;
  size?: number;
}

export const UpButton = ({ offsetTop = 300, className = '', smooth = false, size = 50 }: IUpButtonProps) => {
  const [visible, setVisible] = useState(false);

  const center = useMemo(() => size / 2, [size]);
  const radius = useMemo(() => size / 2 - 3 / 2, [size]);
  const circumference = useMemo(() => Math.PI * radius * 2, [radius]);

  const [progress, setProgress] = useState(circumference);

  const onScroll = useCallback(() => {
    const { clientHeight, scrollHeight, scrollTop } = document.documentElement;
    const { scrollY, pageYOffset } = window;

    const scroll = pageYOffset || scrollTop || scrollY;
    const percentage = scroll / (scrollHeight - clientHeight);
    const isVisible = scroll > offsetTop;

    setVisible(isVisible);
    setProgress(isVisible ? circumference - circumference * percentage : circumference);
  }, [setVisible, setProgress, circumference, offsetTop]);

  useEffect(() => {
    document.addEventListener('scroll', onScroll);
    return () => document.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      className={clsx(
        styles.wrapper,
        className,
        visible ? 'visible' : 'invisible',
        visible ? 'opacity-100' : 'opacity-0',
      )}
      onClick={() => scrollToTop(smooth)}
      role="button"
      tabIndex={0}
      aria-hidden="true"
    >
      <svg
        style={{
          display: 'block',
          transform: 'rotate(-90deg)',
        }}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        focusable="false"
      >
        {/* Background */}
        <circle
          fill="rgb(255 255 255 / 75%)"
          stroke="rgb(200 200 200 / 85%)"
          strokeWidth={3}
          r={radius}
          cx={center}
          cy={center}
        />
        {/* Progress */}
        <circle
          style={{
            transition: 'stroke-dashoffset 0.3s linear',
          }}
          fill="none"
          stroke="rgb(249 115 22)"
          strokeWidth={3}
          r={radius}
          cx={center}
          cy={center}
          strokeDasharray={circumference}
          strokeDashoffset={progress}
        />
      </svg>

      <span className={styles.icon}>
        <Icon className="h-[25px] w-[25px]" name={'FaAngleDoubleUp'} />
      </span>
    </button>
  );
};
