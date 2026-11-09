import {
  createContext,
  useMemo,
  type CSSProperties,
  type ReactNode,
} from 'react';
import { assignInlineVars } from '@vanilla-extract/dynamic';

import { vars, type ThemeTokens } from './theme.css';

export type Theme = 'light' | 'dark';

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext<Theme>('light');

export interface ThemeProviderProps {
  theme: Theme;
  tokens?: Partial<ThemeTokens>;
  className?: string;
  children: ReactNode;
}

export function ThemeProvider({
  theme,
  tokens,
  className,
  children,
}: ThemeProviderProps) {
  const style = useMemo(() => {
    if (!tokens) {
      return undefined;
    }

    return assignInlineVars(
      Object.fromEntries(
        Object.entries(tokens)
          .filter(([, value]) => value != null)
          .map(([key, value]) => [
            vars[key as keyof ThemeTokens],
            value as string,
          ]),
      ),
    ) as CSSProperties;
  }, [tokens]);

  return (
    <ThemeContext.Provider value={theme}>
      <div data-theme={theme} style={style} className={className}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
