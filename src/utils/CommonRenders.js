import React from 'react';
import Link from 'components/ui/Link';
import Image from 'components/ui/Image';
import { LINKS } from 'utils/Constants';

export const ETRADE_LINK = (
    <Link href={LINKS.EtradeHome}>
        <Image image={'etrade_icon.png'} aria={{ style: { marginTop: '-1%' }}} />
        E-Trade
    </Link>
);

export const EASTER_EGG = (
    <h4 className={'d-inline-block margin-clear'}>🐣</h4>
);
