import React, { FC } from 'react';
import { ThemeProps } from '../Icon/Icon';
import { text } from '@fortawesome/fontawesome-svg-core';
export interface ProgressProps {
  percent: number;
  strokeHeight?: number;
  showText?: boolean;
  styles?: React.CSSProperties;
  theme?: ThemeProps;
}
export const Progress: FC<ProgressProps> = (props) => {
  const { percent, strokeHeight, showText, styles, theme } = props;
  return (
    <div className='r-parts-progress-bar' style={styles}>
      <div
        className='r-parts-progress-bar'
        style={{ height: `${strokeHeight}px` }}
      >
        <div
          className={`r-parts-progress-bar-inner color-${theme}`}
          style={{ width: `${percent}%` }}
        >
          {showText && <span className='inner-text'>{`${percent}%`}</span>}
        </div>
      </div>
    </div>
  );
};
Progress.defaultProps = {
  strokeHeight: 15,
  showText: true,
  theme: 'primary',
};
