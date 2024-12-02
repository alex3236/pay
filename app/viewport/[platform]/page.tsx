import Home from '../../components/home';

const env = process.env.exposed ? JSON.parse(process.env.exposed) : {};

export default function Main({ params }: { params: { platform: string } }) {
    const platforms = env['platforms'] !== undefined ? JSON.parse(env['platforms']) : {};
    const settings = platforms[params.platform];
    return <Home url={settings.url} tip={settings.tip} />;
}