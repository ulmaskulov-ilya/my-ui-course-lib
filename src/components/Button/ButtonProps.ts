import type { ButtonHTMLAttributes } from "react";

export type ButtonVariant = 'fill' | 'outline' | 'text';
export type ButtonSize = 's' | 'm' | 'l';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
}