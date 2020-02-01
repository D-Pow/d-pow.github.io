import React from 'react';
import PropTypes from 'prop-types';
import 'styles/Animations/AtomOrbit.scss';

function AtomSpinner({ svg }) {
    if (svg) {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="200px"
                height="200px"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid"
            >
                <defs>
                    <path id="path" d="M50 15A15 35 0 0 1 50 85A15 35 0 0 1 50 15" fill="none" />
                    <path id="patha" d="M0 0A15 35 0 0 1 0 70A15 35 0 0 1 0 0" fill="none" />
                </defs>
                <g transform="rotate(0 50 50)">
                    <use href="#path" stroke="white" strokeWidth="3" />
                </g>
                <g transform="rotate(60 50 50)">
                    <use href="#path" stroke="white" strokeWidth="3" />
                </g>
                <g transform="rotate(120 50 50)">
                    <use href="#path" stroke="white" strokeWidth="3" />
                </g>
                <g transform="rotate(0 50 50)">
                    <circle cx="50" cy="15" r="9" fill="#012b7e">
                        <animateMotion dur="1s" repeatCount="indefinite" begin="0s">
                            <mpath href="#patha" />
                        </animateMotion>
                    </circle>
                </g>
                <g transform="rotate(60 50 50)">
                    <circle cx="50" cy="15" r="9" fill="#577cb4">
                        <animateMotion dur="1s" repeatCount="indefinite" begin="-0.16666666666666666s">
                            <mpath href="#patha" />
                        </animateMotion>
                    </circle>
                </g>
                <g transform="rotate(120 50 50)">
                    <circle cx="50" cy="15" r="9" fill="#7e91b6">
                        <animateMotion dur="1s" repeatCount="indefinite" begin="-0.3333333333333333s">
                            <mpath href="#patha" />
                        </animateMotion>
                    </circle>
                </g>
            </svg>
        );
    }

    const numElectrons = 3;
    const rotationDegrees = 180 / numElectrons;
    const electronColors = [ 'primary', 'secondary', 'tertiary' ];
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
                        transform: getRotationTransformProperty(i)
                    }}
                    key={i}
                />
            ))}
            {Array.from({ length: numElectrons }).map((nul, i) => (
                <div
                    className={'atom-orbit-path-invisible'}
                    style={{
                        transform: getRotationTransformProperty(i)
                    }}
                    key={i}
                >
                    <div
                        className={`atom-electron atom-electron-orbit ${getElectronBgColor(i)}`}
                        style={{
                            animationDelay: getAnimationDelay(i)
                        }}
                    />
                </div>
            ))}
        </div>
    );
}

AtomSpinner.propTypes = {
    svg: PropTypes.bool
};

AtomSpinner.defaultProps = {
    svg: false
};

export default AtomSpinner;
