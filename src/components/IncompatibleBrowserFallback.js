import React from 'react';

function IncompatibleBrowserFallback(props) {
    return (
        <div className={'text-center position-absolute top-20 w-100'}>
            <h1 className={'w-80 m-auto'}>
                Please use a modern browser (e.g. Chrome, Firefox, Safari) to view this website.
            </h1>
        </div>
    );
}

export default IncompatibleBrowserFallback;
