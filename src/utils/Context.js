import React from 'react';
import { UseContext } from 'utils/Hooks';

/**
 * Creates a new Context and returns both the related Consumer and Provider for component use.
 * Creates a new Context each time this function is called so repeated calls don't have to worry
 * about stepping on each other's toes.
 *
 * The context created uses both a `value` field and `setValue` function so the consuming components
 * can update the context's state.
 *
 * Consumer takes a function as children:
 * <Consumer>
 *     {({ value, setValue }) => (
 *         {children}
 *     )}
 * </Consumer
 *
 * @param {*} defaultValue - Default value for the context
 * @returns {{Consumer: React.Component, Provider: React.Component, Context: Object }} - The newly-created Context-related objects
 */
export default function ContextFactory(defaultValue = null) {
    const Context = React.createContext({
        contextState: defaultValue,
        setContextState: () => {}
    });
    const Provider = props => (
        <UseContext Context={Context} defaultValue={defaultValue} {...props} />
    );
    const { Consumer } = Context;

    return { Consumer, Provider, Context };
};
