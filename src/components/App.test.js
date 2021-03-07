import { render, screen } from '@testing-library/react';
import App from './App';
import store from '../store';
import {BrowserRouter} from "react-router-dom";
describe('Testing App', () => {
  test('Renders loading app page', () => {
    render(
      <BrowserRouter>
        <App store={store}/>
      </BrowserRouter>
      );
    const linkElement = screen.getByText(/Loading/i);
    expect(linkElement).toBeInTheDocument();
  });
});