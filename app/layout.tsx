import './globals.css';
import { Toaster } from 'sonner';
import { ReactNode } from 'react';
import { Metadata } from 'next';

let title: string | undefined;
let description: string | undefined;

try {
    if (process.env.app_contents) {
        const contents = JSON.parse(process.env.app_contents);
        title = contents.title;
        description = contents.meta;
    }
} catch { }

export const metadata: Metadata = {
    title: title ?? 'QR Code Generator',
    description: description ?? 'A landing page for QR codes',
    authors: [
        {
            name: 'Alex3236',
            url: 'https://alex3236.top'
        }
    ],
    icons: {
        icon: '/favicon.png'
    }
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body>
                {children}
                <Toaster richColors position="top-center" />
            </body>
        </html>
    );
}
