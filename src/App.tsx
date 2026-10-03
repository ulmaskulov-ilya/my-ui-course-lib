import './App.css';
import { Button } from './components/Button';

function App() {
  const variants = ['fill', 'outline', 'text'] as const;
  const sizes = ['s', 'm', 'l'] as const;

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
      </div>
  );
}

export default App;