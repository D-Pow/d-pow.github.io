import {
    useState,
    type PropsWithChildren,
    type ButtonHTMLAttributes, useEffect,
} from 'react';

import Modal from '@/components/ui/Modal';
import Anchor from '@/components/ui/Anchor';
import ResourceViewer from '@/components/ui/ResourceViewer';
import { LINKS, MimeTypes } from '@/utils/Constants';
import { fetchAsBase64 } from '@/utils/Network';

import { ReactComponent as PdfIcon } from '@/assets/pdf-icon.svg';


async function getResumePdfBase64() {
    // Octet stream causes the `<ResourceViewer/>` to attempt downloading the file upon load.
    // Prevent that by casting the MIME type to that of a PDF.
    const octetStreamBase64 = await fetchAsBase64(LINKS.ResumeFileBlobUrl) as string;
    const pdfBase64 = octetStreamBase64.replace(MimeTypes.STREAM, MimeTypes.PDF);
    // TODO - Since we're using Base64, Chrome will interpret the filename from the Base64 URI string.
    //  I don't think there's a way to fix that in Chromium browsers, e.g. this fails:
    //      `const pdfBase64WithCustomName = pdfBase64.replace(/(?<=\/)[^/]+$/, LINKS.ResumeGithubFilename)`
    //  but I think it could be fixed in Firefox via:
    //      `new FileReader([ blob ], 'My file name')`
    //  See: https://stackoverflow.com/questions/53548182/can-i-set-the-filename-of-a-pdf-object-displayed-in-chrome/53593453#53593453

    return pdfBase64;
}

export interface ResumeModalProps {
    children?: React.ReactNode;
    [propKey: string]: unknown;
}

export interface PdfIconButtonProps {
    type?: 'button' | 'link';
    onClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
    [propKey: string]: unknown;
}

export interface ResumeHyperlinkProps extends PropsWithChildren {
    onClick?: PdfIconButtonProps['onClick'];
    [propKey: string]: unknown;
}


export function ResumeGithubLink({
    onClick,
    children = 'GitHub (LaTeX)',
}: ResumeHyperlinkProps) {
    return (
        <Anchor
            href={LINKS.ResumeGithub}
            underlineText={false}
            onClick={onClick}
            key={LINKS.ResumeGithub}
        >
            {children}
        </Anchor>
    );
}

export function ResumeViewerLink({
    onClick,
    children = 'PDF',
}: ResumeHyperlinkProps) {
    return (
        <Anchor
            href={LINKS.ResumeFileViewer}
            underlineText={false}
            onClick={onClick}
            key={LINKS.ResumeFileViewer}
        >
            {children}
        </Anchor>
    );
}

export function PdfIconButton({
    type = 'button',
    onClick,
    ...props
}: PdfIconButtonProps) {
    const renderedIcon = (
        <>
            {/* <Image className={'w-60 mb-4'} image={'pdf-icon.svg'} /> */}
            <PdfIcon
                className={'w-60 mb4'}
                key={LINKS.ResumeFileViewer}
                {...props}
            >
                <text
                    x="2.65"
                    y="14.75"
                    style={{ fontSize: '0.15em' }}
                >
                    Resume
                </text>
            </PdfIcon>
        </>
    );

    if (type === 'button') {
        return (
            <button
                // Padding is unnecessary since we're using an image as the children rather than text
                className={'border-0 p-0'}
                onClick={onClick}
            >
                {renderedIcon}
            </button>
        );
    }

    return (
        <ResumeViewerLink onClick={onClick}>
            {renderedIcon}
        </ResumeViewerLink>
    );
}


export default function ResumeModal({
    children,
}: ResumeModalProps) {
    const [ pdfData, setPdfData ] = useState<string>();
    const [ modalShown, setModalShown ] = useState(false);

    useEffect(() => {
        if (!pdfData) {
            (async () => {
                const pdfBase64String = await getResumePdfBase64() as string;

                setPdfData(pdfBase64String);
            })();
        }
    }, []);

    return (
        <>
            {children || <PdfIconButton onClick={() => setModalShown(true)} />}

            <Modal
                title={(
                    <>
                        <ResumeGithubLink />
                        {'  --  '}
                        <ResumeViewerLink />
                    </>
                )}
                preventDocumentScrolling
                show={modalShown}
                onClose={() => setModalShown(false)}
                portalId
                sizeMax
            >
                <ResourceViewer
                    className={'w-100 h-100'}
                    src={pdfData as string}
                    altLinkText={LINKS.ResumeGithubFilename}
                    mimeType={MimeTypes.PDF}
                    key={LINKS.ResumeFileBlobUrl}
                    name={LINKS.ResumeGithubFilename}
                />
            </Modal>
        </>
    );
}
