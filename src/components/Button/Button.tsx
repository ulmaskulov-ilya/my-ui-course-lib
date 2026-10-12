import type {ElementType} from 'react';
import type { ButtonProps } from "./ButtonProps.ts";
import styles from './Button.module.css';

export const Button = (props: ButtonProps) => {
  const {
    as = 'button',
    variant = 'fill',
    size = 's',
    className,
    children,
    ref,
    ...restProps
  } = props;

  const Component = as as ElementType;
  
  const customClassName = [
    styles.button,
    styles[variant],
    styles[size],
    className
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Component
      className={customClassName}
      ref={ref}
      {...restProps}
    >
      {children}
    </Component>
  );
};
