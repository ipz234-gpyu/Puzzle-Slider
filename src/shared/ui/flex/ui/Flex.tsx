import React, {type ElementType, type HTMLAttributes, forwardRef } from 'react';
import cls from './styles.module.css';

export type FlexJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
export type FlexAlign = 'start' | 'center' | 'end' | 'stretch';
export type FlexDirection = 'row' | 'column';
export type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

export interface FlexProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  className?: string;
  direction?: FlexDirection;
  justify?: FlexJustify;
  align?: FlexAlign;
  wrap?: FlexWrap;
  gap?: number | string;
  fullWidth?: boolean;
  fullHeight?: boolean;
  children?: React.ReactNode;
}

export const Flex = forwardRef<HTMLElement, FlexProps>(
  (
    {
      as: Tag = 'div',
      className = '',
      direction = 'row',
      justify = 'start',
      align = 'stretch',
      wrap = 'nowrap',
      gap,
      fullWidth,
      fullHeight,
      style,
      children,
      ...rest
    },
    ref
  ) => {
    const classes = [
      cls.flex,
      cls[`dir_${direction}`],
      cls[`justify_${justify}`],
      cls[`align_${align}`],
      cls[`wrap_${wrap}`],
      fullWidth ? cls.fullWidth : '',
      fullHeight ? cls.fullHeight : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const gapStyle = gap !== undefined ? { gap: typeof gap === 'number' ? `${gap}px` : gap } : undefined;

    return (
      <Tag ref={ref} className={classes} style={{ ...gapStyle, ...style }} {...rest}>
        {children}
      </Tag>
    );
  }
);

Flex.displayName = 'Flex';
