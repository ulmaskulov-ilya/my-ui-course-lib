import type {ButtonProps} from "./ButtonProps.ts";
import styles from './Button.module.css';

export const Button = (
    {
      variant = 'fill',
      size = 's',
      className,
      children,
      ...restProps
    }: ButtonProps) => {
  const customClassName = [
    styles.button,
    styles[variant],
    styles[size],
    className
  ]
      .filter(Boolean)
      .join(' ');

  return <button className={customClassName} {...restProps}>{children}</button>;
};
