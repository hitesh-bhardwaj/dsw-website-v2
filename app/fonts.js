import localFont from 'next/font/local';

export const neueMontreal = localFont({
    src: [
        {
            path: './fonts/NeueMontreal-Light.woff2',
            weight: '300',
            style: 'normal',
        },
        {
            path: './fonts/NeueMontreal-Regular.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: './fonts/NeueMontreal-Medium.woff2',
            weight: '500',
            style: 'normal',
        },
        {
            path: './fonts/NeueMontreal-Bold.woff2',
            weight: '700',
            style: 'normal',
        },
    ],
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
    variable: '--font-aspekta',
});
