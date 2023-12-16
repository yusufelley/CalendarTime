// Main.test.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../src/App';
jest.mock('react-dom/client', () => ({
  createRoot: jest.fn(),
}));

describe('Main', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    div.id = 'root';
    document.body.appendChild(div);

    require('../src/main'); 

    expect(ReactDOM.createRoot).toHaveBeenCalledWith(div);
    expect(ReactDOM.createRoot().render).toHaveBeenCalledWith(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );

    // Clean up
    document.body.removeChild(div);
  });
});
