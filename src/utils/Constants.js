export const COLORS = [
    'red',
    'blue',
    'purple',
    'pink',
    'orange',
    'green',
    'yellow',
    'gray',
    'teal',
    'cyan',
    'indigo',
    'darkblue',
    'deepskyblue',
    'lawngreen',
    'maroon',
    'magenta',
    'rosybrown',
    'royalblue',
    'salmon',
    'sandybrown'
];

export const SHOW_ELEMENT_SCROLL_THRESHOLD = 3/4;

const mobileBrowserRegexBase = '(android|bb\\d+|meego){}|avantgo|bada\\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\\.(browser|link)|vodafone|wap|windows ce|xda|xiino';
export const MOBILE_BROWSER_REGEX = new RegExp(mobileBrowserRegexBase.replace('{}', '.+mobile'), 'i');
export const MOBILE_OR_TABLET_REGEX = new RegExp(mobileBrowserRegexBase.replace('{}', '|ipad'), 'i');

// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email#Basic_validation
export const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export const LINKS = {
    SrcCode: 'https://github.com/D-Pow/website',
    LinkedIn: 'https://www.linkedin.com/in/devon-powell/',
    GitHub: 'https://github.com/D-Pow',
    MutualFundsHome: 'https://us.etrade.com/what-we-offer/investment-choices/mutual-funds',
    PrebuiltPortfolios: 'https://us.etrade.com/etx/wm/prebuiltmutualfundportfolios',
    AutomaticInvesting: 'https://us.etrade.com/etx/wm/automaticinvesting',
    EtradeAndroidApp: 'https://play.google.com/store/apps/details?id=com.etrade.mobilepro.activity',
    MockRequests: 'https://www.npmjs.com/package/mock-requests',
    AnimeAtsume: 'https://github.com/D-Pow/anime-atsume',
    AtomsOfConfusion: 'https://atomsofconfusion.com',
    AnticancerPeptides: 'https://www.ncbi.nlm.nih.gov/pubmed/29897657',
    TardigradeStratification: 'https://bioone.org/journals/Transactions-of-the-Kansas-Academy-of-Science/volume-118/issue-3-4/062.118.0306/Tardigrades-of-the-Canopy-Evidence-of-Stratification/10.1660/062.118.0306.short',
    EtradeHome: 'https://etrade.com',
    EtradeIcon: 'https://cdn.etrade.net/1/19042220580.0/aempros/etc/designs/responsive-etrade/pagemeta/images/favicon-16x16.png'
};

// Submit contact requests to FormSpree so bots can't scan for my email address
export const CONTACT_FORM_URL = 'https://formspree.io/xkdoqyjm';

export const UPDATE_BROADCAST = 'UPDATE';
