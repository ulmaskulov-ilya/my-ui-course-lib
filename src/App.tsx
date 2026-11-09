import './App.css';
import { useRef, useState } from 'react';

import {
  Calendar,
  LocaleContext,
  allLocales,
  type Locale,
} from './components/Calendar';
import { Button } from './components/Button';
import { ThemeProvider, type Theme } from './theme/ThemeContext.tsx';
import { vars } from './theme/theme.css.ts';

const INITIAL_VALUE = new Date(2026, 10, 17);
const INITIAL_MONTH = new Date(2026, 10, 1);
const MIN_DATE = new Date(2026, 10, 3);
const MAX_DATE = new Date(2026, 11, 25);

const variants = ['fill', 'outline', 'text'] as const;
const sizes = ['s', 'm', 'l'] as const;

const localeNames: Record<string, string> = {
  'ru-RU': 'Русский',
  'en-US': 'English',
  'ar-EG': 'العربية',
};

const panelStyle = {
  background: vars.calendarBg,
  border: vars.calendarBorder,
  borderRadius: vars.calendarRadius,
  padding: vars.calendarPadding,
  color: vars.calendarText,
};

const toLocalDateString = (date: Date): string =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
    date.getDate(),
  ).padStart(2, '0')}`;

function App() {
  const [calendarTheme, setCalendarTheme] = useState<Theme>('light');
  const [calendarLocale, setCalendarLocale] = useState<Locale>(allLocales[0]);
  const [value, setValue] = useState<Date | null>(INITIAL_VALUE);
  const [month, setMonth] = useState<Date>(INITIAL_MONTH);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

  return (
    <ThemeProvider theme="light">
      <main
        className="page"
        style={{
          backgroundColor: vars.calendarPageBg,
          color: vars.calendarPageText,
        }}
      >
        <ThemeProvider theme={calendarTheme} className="calendar-theme-scope">
          <LocaleContext.Provider value={calendarLocale}>
            <section
              className="section"
              style={panelStyle}
              dir={calendarLocale.dir}
              aria-labelledby="calendar-title"
            >
              <h2 id="calendar-title" className="section-title">
                Календарь
              </h2>

              <div className="calendar-controls">
                <div
                  className="group"
                  role="group"
                  aria-label="Язык календаря"
                >
                  {allLocales.map((item) => (
                    <Button
                      key={item.locale}
                      variant={
                        item.locale === calendarLocale.locale ? 'fill' : 'outline'
                      }
                      size="s"
                      onClick={() => setCalendarLocale(item)}
                    >
                      {localeNames[item.locale] ?? item.locale}
                    </Button>
                  ))}
                </div>

                <div
                  className="group"
                  role="group"
                  aria-label="Тема календаря"
                >
                  <Button
                    variant={calendarTheme === 'light' ? 'fill' : 'outline'}
                    size="s"
                    onClick={() => setCalendarTheme('light')}
                  >
                    Светлая
                  </Button>
                  <Button
                    variant={calendarTheme === 'dark' ? 'fill' : 'outline'}
                    size="s"
                    onClick={() => setCalendarTheme('dark')}
                  >
                    Тёмная
                  </Button>
                </div>
              </div>

              <div className="calendar-demo">
                <Calendar
                  value={value}
                  onValueChange={setValue}
                  month={month}
                  onMonthChange={setMonth}
                  minDate={MIN_DATE}
                  maxDate={MAX_DATE}
                  isDateDisabled={(date) => date.getDate() === 13}
                  autoFocus
                />
              </div>

              <p className="value-label">
                value: {value ? toLocalDateString(value) : 'null'}
              </p>
            </section>
          </LocaleContext.Provider>
        </ThemeProvider>

        <section
          className="section"
          style={panelStyle}
          aria-labelledby="buttons-title"
        >
          <h2 id="buttons-title" className="section-title">
            Кнопки
          </h2>

          <div className="button-table">
            <div className="header">
              <span>Variant / Size</span>
              <span>Default</span>
              <span>Hover</span>
              <span>Active</span>
              <span>Disabled</span>
            </div>

            {variants.map((variant) =>
              sizes.map((size) => (
                <div key={`${variant}-${size}`} className="row">
                  <span className="row-label">{`${variant} / ${size}`}</span>
                  <div className="row-states">
                    <div className="state">
                      <span className="state-label">Default</span>
                      <Button variant={variant} size={size}>
                        Кнопка
                      </Button>
                    </div>
                    <div className="state">
                      <span className="state-label">Hover</span>
                      <Button variant={variant} size={size} data-hover>
                        Кнопка
                      </Button>
                    </div>
                    <div className="state">
                      <span className="state-label">Active</span>
                      <Button variant={variant} size={size} data-active>
                        Кнопка
                      </Button>
                    </div>
                    <div className="state">
                      <span className="state-label">Disabled</span>
                      <Button variant={variant} size={size} disabled>
                        Кнопка
                      </Button>
                    </div>
                  </div>
                </div>
              )),
            )}
          </div>

          <div className="polymorph">
            <Button
              ref={buttonRef}
              variant="fill"
              size="m"
              onClick={() => console.log('Button clicked')}
            >
              Обычная кнопка
            </Button>

            <Button
              ref={linkRef}
              as="a"
              href="https://example.com"
              target="_blank"
              rel="noreferrer"
              variant="outline"
              size="m"
            >
              Ссылка-кнопка
            </Button>
          </div>
          <div className="divider" />
          <div className="custom-demo">
            <ThemeProvider
              theme="light"
              tokens={{
                buttonFillBg: 'green',
                buttonFillBgHover: 'darkgreen',
                buttonFillBgActive: 'lightgreen',
              }}
            >
              <Button>Кастомная кнопочка</Button>
            </ThemeProvider>

            <ThemeProvider
              theme="light"
              tokens={{
                buttonOutlineColor: 'crimson',
                buttonOutlineBorder: '1px solid crimson',
                buttonOutlineBgHover: '#ffe4e6',
                buttonOutlineBgActive: '#fecdd3',
              }}
            >
              <Button variant="outline">Еще одна кастомная кнопка</Button>
            </ThemeProvider>
          </div>
        </section>
      </main>
    </ThemeProvider>
  );
}

export default App;
