import PropTypes from 'prop-types';

import '@/styles/Animations/AtomOrbit.scss';

function AtomSpinner({ numElectrons, electronColors }) {
    const rotationDegrees = 180 / numElectrons;
    const getRotationTransformProperty = electronIndex => `rotate(${rotationDegrees * electronIndex}deg)`;
    const getAnimationDelay = electronIndex => `-${electronIndex / (2 * numElectrons)}s`;
    const getElectronBgColor = electronIndex => `bg-${electronColors[electronIndex % electronColors.length]}`;

    // render atom orbit paths first, followed by the electrons so that the electrons are
    // naturally placed on top of all paths instead of only the path to which they are assigned
    return (
        <div className={'m-auto absolute-center atom-container'}>
            {Array.from({ length: numElectrons }).map((nul, i) => (
                <div
                    className={'atom-orbit-path'}
                    style={{
                        transform: getRotationTransformProperty(i),
                    }}
                    key={i}
                />
            ))}
            {Array.from({ length: numElectrons }).map((nul, i) => (
                <div
                    className={'atom-orbit-path-invisible'}
                    style={{
                        transform: getRotationTransformProperty(i),
                    }}
                    key={i}
                >
                    <div
                        className={`atom-electron atom-electron-orbit ${getElectronBgColor(i)}`}
                        style={{
                            animationDelay: getAnimationDelay(i),
                        }}
                    />
                </div>
            ))}
        </div>
    );
}

AtomSpinner.propTypes = {
    numElectrons: PropTypes.number,
    electronColors: PropTypes.arrayOf(PropTypes.string),
};

AtomSpinner.defaultProps = {
    numElectrons: 3,
    electronColors: [ 'primary', 'secondary', 'tertiary' ],
};

export default AtomSpinner;
