'use client';

import clsx from 'clsx';
import { useCallback, useEffect, useState } from 'react';
import React from 'react';

import styles from './styles.module.scss';

interface IRefreshButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  size?: number;
  initialSeconds?: number;
}

export const RefreshButton = ({
  className = '',
  size = 100,
  initialSeconds = 60,
  onClick,
  ...props
}: IRefreshButtonProps) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setSeconds(prevSeconds => --prevSeconds);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      !!onClick && onClick(event);
      window.location.reload();
    },
    [onClick],
  );

  return (
    <button
      className={clsx(styles.wrapper, className)}
      style={{ width: `${size}px`, height: `${size}px` }}
      role="button"
      tabIndex={0}
      aria-hidden="true"
      onClick={handleClick}
      {...props}
    >
      {seconds <= 0 ? 'Refresh' : seconds}
    </button>
  );
};
