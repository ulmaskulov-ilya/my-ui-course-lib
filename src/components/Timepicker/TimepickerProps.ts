import type { InputHTMLAttributes } from "react";

export type TimepickerVariant = 'fill' | 'outline';
export type TimepickerSize = 's' | 'm' | 'l';

export interface TimepickerProps extends InputHTMLAttributes<HTMLInputElement> {
    variant?: TimepickerVariant;
    size?: TimepickerSize;
}

