import localFont from 'next/font/local';

export const neueMontreal = localFont({
    src: [
        {
            path: './fonts/ppneuemontreal-thin.woff2',
            weight: '300',
            style: 'normal',
        },
        {
            path: './fonts/ppneuemontreal-book.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: './fonts/ppneuemontreal-medium.woff2',
            weight: '500',
            style: 'normal',
        },
        {
            path: './fonts/ppneuemontreal-bold.woff2',
            weight: '700',
            style: 'normal',
        },
    ],
    preload: true,
    variable: '--font-neue-montreal',
});

export const aspekta = localFont({
    src: [
        {
            path: './fonts/Aspekta-300.woff2',
            weight: '300',
            style: 'normal',
        },
        {
            path: './fonts/Aspekta-400.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: './fonts/Aspekta-500.woff2',
            weight: '500',
            style: 'normal',
        },
        {
            path: './fonts/Aspekta-700.woff2',
            weight: '700',
            style: 'normal',
        },
    ],
    preload: true,
    variable: '--font-aspekta',
});
