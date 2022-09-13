
import { createRoot } from 'react-dom/client';
import App from './App';

const container = /** @type {HTMLElement} */ (document.getElementById('app'));
const root = createRoot(container);

root.render(<App />);
