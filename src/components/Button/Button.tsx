import type {ElementType} from 'react';
import type { ButtonTypes } from "./Button.types.ts";
import * as styles from "./Button.css.ts";

export const Button = (props: ButtonTypes) => {
  const {
    as = 'button',
    variant = 'fill',
    size = 's',
    icon,
    iconPosition = 'start',
    className,
    children,
    ref,
    ...restProps
  } = props;

  const Component = as as ElementType;

  const customClassName = [
    styles.button,
    styles.variant[variant],
    styles.size[size],
    icon
      ? iconPosition === 'end'
        ? styles.withIconEnd[size]
        : styles.withIconStart[size]
      : undefined,
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
      {icon && iconPosition === 'start' ? (
        <span className={styles.icon}>{icon}</span>
      ) : null}
      {children}
      {icon && iconPosition === 'end' ? (
        <span className={styles.icon}>{icon}</span>
      ) : null}
    </Component>
  );
};
