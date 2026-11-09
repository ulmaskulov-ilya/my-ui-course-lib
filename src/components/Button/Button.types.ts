import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ComponentPropsWithRef,
  ReactNode,
} from 'react';

export type ButtonVariant = 'fill' | 'outline' | 'text';
export type ButtonSize = 's' | 'm' | 'l';
export type ButtonIconPosition = 'start' | 'end';

export interface BaseStyleProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconPosition?: ButtonIconPosition;
}

export type ButtonAsButtonProps = BaseStyleProps &
  ButtonHTMLAttributes<HTMLButtonElement> &
  ComponentPropsWithRef<'button'> & {
    as?: 'button';
  };

export type ButtonAsAnchorProps = BaseStyleProps &
  AnchorHTMLAttributes<HTMLAnchorElement> &
  ComponentPropsWithRef<'a'> & {
    as: 'a';
  };

export type ButtonTypes = ButtonAsButtonProps | ButtonAsAnchorProps;
