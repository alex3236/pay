'use client';

import { redirect, RedirectType } from 'next/navigation'


const env = process.env.exposed ? JSON.parse(process.env.exposed) : {};

export default function Main({ params }: { params: { platform: string } }) {
    if (params.platform != 'unknown') {
        const platforms = env['platforms'] !== undefined ? JSON.parse(env['platforms']) : {};
        const settings = platforms[params.platform];

        redirect(settings.redirect, RedirectType.push);
    }
    redirect('/');
}