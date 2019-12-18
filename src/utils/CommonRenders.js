import React from 'react';
import Link from 'components/ui/Link';
import { LINKS } from 'utils/Constants';

export const ETRADE_LINK = (
    <Link href={LINKS.EtradeHome}>
        <img
            alt={'e-trade-icon'}
            src={LINKS.EtradeIcon}
            style={{ marginTop: '-1%' }}
        />
        E-Trade
    </Link>
);
