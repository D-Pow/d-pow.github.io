import React from 'react';
import Link from 'components/ui/Link';
import Image from 'components/ui/Image';
import { LINKS } from 'utils/Constants';

export const SRC_CODE = (
    <Link href={LINKS.SrcCode}>source code</Link>
);

export const ETRADE_LINK = (
    <Link href={LINKS.EtradeHome}>
        <Image image={'etrade_icon.png'} aria={{ style: { marginTop: '-1%' }}} />
        E-Trade
    </Link>
);

export function EasterEgg({ className = '', ...props }) {
    return (
        <h4 className={`d-inline-block margin-clear ${className}`} {...props}>🐣</h4>
    );
}
