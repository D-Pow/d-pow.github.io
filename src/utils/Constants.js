/**
 * Mappings from file extension to MIME type (aka Media type).
 * Also contains some other common keys (like FORM_DATA).
 *
 * Only includes some MIME types since the number of both native and vendor types is huge.
 *
 * @type {Object<string, string>}
 * @see [MDN docs]{@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types}
 * @see [Wikipedia docs]{@link https://en.wikipedia.org/wiki/Media_type}
 */
export const MimeTypes = {
    // Web assets
    HTML: 'text/html',
    CSS: 'text/css',
    JS: 'application/javascript',
    // Text
    JSON: 'application/json',
    XML: 'application/xml',
    TEXT: 'text/plain;charset=utf-8',
    TXT: 'text/plain',
    CSV: 'text/csv',
    // Requests
    FORM_DATA: 'application/x-www-form-urlencoded', // Use this instead of FORM_DATA_BINARY if binary data is Base64-encoded
    FORM_DATA_BINARY: 'multipart/form-data', // Technically could also be FORM_DATA but formatted differently than a URL (somewhat uncommon nowadays)
    // Photos
    SVG: 'image/svg+xml',
    PNG: 'image/png',
    JPEG: 'image/jpeg',
    GIF: 'image/gif',
    WEBP: 'image/webp',
    ICO: 'image/x-icon',
    // Audio
    MP3: 'audio/mp3',
    WAV: 'audio/wav',
    // Video
    MP4: 'video/mp4',
    // Binary
    STREAM: 'application/octet-stream',
    ZIP: 'application/zip',
    EXECUTABLE: 'application/x-executable',
    // Documents (specific binaries)
    PDF: 'application/pdf',
    ODT: 'application/vnd.oasis.opendocument.text',
    DOC: 'application/msword',
    DOCX: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    XLS: 'application/vnd.ms-excel',
    XLSX: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    PPT: 'application/vnd.ms-powerpoint',
    PPTX: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
};

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
    'sandybrown',
];

export const SHOW_ELEMENT_SCROLL_THRESHOLD = 3/4;

const mobileBrowserRegexBase = '(android|bb\\d+|meego){}|avantgo|bada\\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\\.(browser|link)|vodafone|wap|windows ce|xda|xiino';
export const MOBILE_BROWSER_REGEX = new RegExp(mobileBrowserRegexBase.replace('{}', '.+mobile'), 'i');
export const MOBILE_OR_TABLET_REGEX = new RegExp(mobileBrowserRegexBase.replace('{}', '|ipad'), 'i');

// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email#Basic_validation
export const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export const LINKS = {
    SrcCode: 'https://github.com/D-Pow/d-pow.github.io',
    LinkedIn: 'https://www.linkedin.com/in/devon-powell/',
    GitHub: 'https://github.com',
    get GitHubProfile() {
        return `${this.GitHub}/D-Pow`;
    },
    GitHubRawFileDomain: 'https://raw.githubusercontent.com',
    EmbeddedFileViewerGoogle: 'https://docs.google.com/viewer?embedded=true&url=',
    EmbeddedFileViewerMicrosoft: 'http://view.officeapps.live.com/op/view.aspx?src=',
    BadgeShieldGenerator: 'https://img.shields.io/badge',
    MutualFundsHome: 'https://us.etrade.com/what-we-offer/investment-choices/mutual-funds',
    PrebuiltPortfolios: 'https://us.etrade.com/etx/wm/prebuiltmutualfundportfolios',
    AutomaticInvesting: 'https://us.etrade.com/etx/wm/automaticinvesting',
    EtradeAndroidApp: 'https://play.google.com/store/apps/details?id=com.etrade.mobilepro.activity',
    MockRequests: 'https://www.npmjs.com/package/mock-requests',
    AnimeAtsumeGitHub: 'https://github.com/D-Pow/anime-atsume',
    AnimeAtsumeLive: 'https://d-pow.github.io/anime-atsume',
    ResumeGithub: 'https://github.com/D-Pow/resume',
    ResumeGithubFilename: 'Resume - Devon Powell.pdf',
    get ResumeFileUrl() {
        return `${this.ResumeGithub}/raw/master/${encodeURIComponent(this.ResumeGithubFilename)}`;
    },
    get ResumeFileBlobUrl() {
        // `github.com` domain doesn't allow CORS, but `raw.githubusercontent.com` does
        return this.ResumeFileUrl.replace(this.GitHub, this.GitHubRawFileDomain).replace('/raw/', '/');
    },
    get ResumeFileViewer() {
        return `${this.EmbeddedFileViewerGoogle}${this.ResumeFileUrl}`;
    },
    AtomsOfConfusion: 'https://atomsofconfusion.com',
    AnticancerPeptides: 'https://www.ncbi.nlm.nih.gov/pubmed/29897657',
    TardigradeStratification: 'https://bioone.org/journals/Transactions-of-the-Kansas-Academy-of-Science/volume-118/issue-3-4/062.118.0306/Tardigrades-of-the-Canopy-Evidence-of-Stratification/10.1660/062.118.0306.short',
    EtradeHome: 'https://etrade.com',
    EtradeIcon: 'https://cdn.etrade.net/1/19042220580.0/aempros/etc/designs/responsive-etrade/pagemeta/images/favicon-16x16.png',
    NextdoorHome: 'https://nextdoor.com',
    HomeDepotHome: 'https://www.homedepot.com',
};

// Submit contact requests to FormSpree so bots can't scan for my email address
export const CONTACT_FORM_URL = 'https://formspree.io/xkdoqyjm';

export const UPDATE_BROADCAST = 'UPDATE';
