import './globals.css';
import { Toaster } from 'sonner';
import { ReactNode } from 'react';
import { Metadata } from 'next';

let title: string | undefined;

try {
    if (process.env.app_contents) title = JSON.parse(process.env.app_contents).title;
} catch {}

export const metadata: Metadata = {
    title: title || 'QR Code Generator',
    description: 'A landing page for QR codes',
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
