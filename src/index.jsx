import { createRoot } from 'react-dom/client';

import App from '@/components/App';
import AppContext from '@/utils/AppContext';
import registerServiceWorker from '@/registerServiceWorker';
import '@/styles/index.scss';

const { Provider } = AppContext;
const renderedApp = (
    <Provider>
        <App />
    </Provider>
);
const rootDiv = document.getElementById('root');
const reactRoot = createRoot(rootDiv);

reactRoot.render(renderedApp);

registerServiceWorker();

// hot reloading
if (process.env.NODE_ENV !== 'production' && module.hot) {
    console.log('hot reloading active');
    module.hot.accept('@/components/App', () => {
        reactRoot.render(renderedApp);
    });
}
