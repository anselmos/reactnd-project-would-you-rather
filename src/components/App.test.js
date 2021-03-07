import { render, screen } from '@testing-library/react';
import App from './App';
import store from '../store';
describe('Testing App', () => {
  test('Renders loading app page', () => {
    render(<App store={store}/>);
    const linkElement = screen.getByText(/Loading/i);
    expect(linkElement).toBeInTheDocument();
  });
});