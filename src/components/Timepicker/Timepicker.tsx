import type { TimepickerProps } from "./TimepickerProps.ts";
import styles from './Timepicker.module.css';

export const Timepicker = (
    {
      variant = 'fill',
      size = 'm',
      className,
      type = 'time',
      ...restProps
    }: TimepickerProps) => {
  const customClassName = [
    styles.timepicker,
    styles[variant],
    styles[size],
    className
  ]
      .filter(Boolean)
      .join(' ');

  return <input type={type} className={customClassName} {...restProps} />;
};

