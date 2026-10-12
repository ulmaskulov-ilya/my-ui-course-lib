import type {ButtonHTMLAttributes, AnchorHTMLAttributes, ComponentPropsWithRef} from "react";

export type ButtonVariant = 'fill' | 'outline' | 'text';
export type ButtonSize = 's' | 'm' | 'l';

export interface BaseStyleProps {
    variant?: ButtonVariant;
    size?: ButtonSize;
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

export type ButtonProps = ButtonAsButtonProps | ButtonAsAnchorProps;