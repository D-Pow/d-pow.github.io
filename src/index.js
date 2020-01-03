import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/App';
import registerServiceWorker from './registerServiceWorker';
import 'styles/index.scss';

const rootDiv = document.getElementById('root');

ReactDOM.render(
    <App />,
    rootDiv
);

registerServiceWorker();

// hot reloading
if (process.env.NODE_ENV !== 'production' && module.hot) {
    console.log('hot reloading active');
    module.hot.accept('components/App', () => {
        const NextApp = require('components/App').default;
        ReactDOM.render(
            <NextApp />,
            rootDiv
        )
    })
}
