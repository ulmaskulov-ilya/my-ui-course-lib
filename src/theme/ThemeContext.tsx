import type { CSSProperties, ReactNode } from 'react';
import { assignInlineVars } from '@vanilla-extract/dynamic';

import {type ThemeTokens, vars} from './theme.css';

export interface ThemeContextProps {
  tokens: Partial<ThemeTokens>;
  children: ReactNode;
}

export function ThemeContext({
                               tokens,
                               children,
                             }: ThemeContextProps) {
  const style = assignInlineVars(
      Object.fromEntries(
          Object.entries(tokens).map(([key, value]) => [
            vars[key as keyof ThemeTokens],
            value,
          ]),
      ),
  ) as CSSProperties;

  return (
      <div style={style}>
        {children}
      </div>
  );
}