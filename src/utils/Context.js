import React from 'react';
import { UseContext } from 'utils/Hooks';

/**
 * Creates both a Context and Provider for components to use.
 *
 * Creates a new Context each time this function is called so repeated
 * calls don't have to worry about stepping on each other's toes.
 *
 * Context follows the format:
 * { value: {anything}, setValue: {function} }
 *
 * @param defaultValue {*} Default value for Context.value to hold
 * @returns {{Context: Object, Provider: {React.Component} }} The newly-created Context and Value
 */
export default function ContextFactory(defaultValue = null) {
    const Context = React.createContext({
        value: defaultValue,
        setValue: () => {}
    });
    const Provider = props => (
        <UseContext Context={Context} defaultValue={defaultValue} {...props} />
    );

    return { Context, Provider };
};
