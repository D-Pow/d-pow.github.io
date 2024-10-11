import Anchor from '@/components/ui/Anchor';
import Image from '@/components/ui/Image';
import { LINKS } from '@/utils/Constants';

export const SRC_CODE = (
    <Anchor href={LINKS.SrcCode}>source code</Anchor>
);

export const ETRADE_LINK = (
    <Anchor href={LINKS.EtradeHome}>
        <Image image={'etrade_icon.png'} aria={{ style: { marginTop: '-1%' }}} />
        E-Trade
    </Anchor>
);

export const NEXTDOOR_LOGO = (
    <Anchor href={LINKS.NextdoorHome}>
        <Image image={'nextdoor_icon.svg'} className={'w-1-5e h-1-5e mb-3px'} />
        Nextdoor
    </Anchor>
);

export const HOME_DEPOT_LOGO = (
    <Anchor href={LINKS.HomeDepotHome}>
        <Image image={'home_depot.svg'} className={'w-1-5e h-1-5e mb-3px'} />
        The Home Depot
    </Anchor>
)

export function EasterEgg({ className = '', ...props }) {
    return (
        <h4 className={`d-inline-block margin-clear ${className}`} {...props}>🐣</h4>
    );
}
