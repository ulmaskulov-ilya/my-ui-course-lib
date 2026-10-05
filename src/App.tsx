import './App.css';
import { Button } from './components/Button';
import { Timepicker } from './components/Timepicker';

function App() {
  const buttonVariants = ['fill', 'outline', 'text'] as const;
  const buttonSizes = ['s', 'm', 'l'] as const;
  const timepickerVariants = ['fill', 'outline'] as const;
  const timepickerSizes = ['s', 'm', 'l'] as const;

  return (
      <div className="app">
        <section>
          <h2>Button Component</h2>
          <div className="header">
            <span>Variant / Size</span>
            <span>Default</span>
            <span>Hover</span>
            <span>Active</span>
            <span>Disabled</span>
          </div>

          {buttonVariants.map((variant) =>
              buttonSizes.map((size) => (
                  <div key={`button-${variant}-${size}`} className="row">
                    <span className="row-label">{`${variant} / ${size}`}</span>
                    <Button variant={variant} size={size}>Кнопка</Button>
                    <Button variant={variant} size={size} data-hover>Кнопка</Button>
                    <Button variant={variant} size={size} data-active>Кнопка</Button>
                    <Button variant={variant} size={size} disabled>Кнопка</Button>
                  </div>
              ))
          )}
        </section>

        <section>
          <h2>Timepicker Component</h2>
          <div className="header">
            <span>Variant / Size</span>
            <span>Default</span>
            <span>Hover</span>
            <span>Active</span>
            <span>Disabled</span>
          </div>

          {timepickerVariants.map((variant) =>
              timepickerSizes.map((size) => (
                  <div key={`timepicker-${variant}-${size}`} className="row">
                    <span className="row-label">{`${variant} / ${size}`}</span>
                    <Timepicker variant={variant} size={size} defaultValue="12:00" />
                    <Timepicker variant={variant} size={size} data-hover defaultValue="12:00" />
                    <Timepicker variant={variant} size={size} data-active defaultValue="12:00" />
                    <Timepicker variant={variant} size={size} disabled defaultValue="12:00" />
                  </div>
              ))
          )}
        </section>
      </div>
  );
}

export default App;