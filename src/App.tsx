import './App.css';
import { Button } from './components/Button';
import { useRef } from 'react';

function App() {
  const variants = ['fill', 'outline', 'text'] as const;
  const sizes = ['s', 'm', 'l'] as const;

  const buttonRef = useRef<HTMLButtonElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

  return (
      <div className="app">
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
                  <Button variant={variant} size={size}>Кнопка</Button>
                  <Button variant={variant} size={size} data-hover>Кнопка</Button>
                  <Button variant={variant} size={size} data-active>Кнопка</Button>
                  <Button variant={variant} size={size} disabled>Кнопка</Button>
                </div>
            ))
        )}

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
            variant="outline"
            size="m"
          >
            Ссылка-кнопка
          </Button>
        </div>
      </div>
  );
}

export default App;