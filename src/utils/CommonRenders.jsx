import Link from '@/components/ui/Link';
import Image from '@/components/ui/Image';
import { LINKS } from '@/utils/Constants';

export const SRC_CODE = (
    <Link href={LINKS.SrcCode}>source code</Link>
);

export const ETRADE_LINK = (
    <Link href={LINKS.EtradeHome}>
        <Image image={'etrade_icon.png'} aria={{ style: { marginTop: '-1%' }}} />
        E-Trade
    </Link>
);

export const NEXTDOOR_LOGO = (
    <Link href={LINKS.NextdoorHome}>
        <Image image={'nextdoor_icon.svg'} className={'w-7 h-7 mb-5px'} />
        Nextdoor
    </Link>
);

export function EasterEgg({ className = '', ...props }) {
    return (
        <h4 className={`d-inline-block margin-clear ${className}`} {...props}>🐣</h4>
    );
}
