import { Metadata, Viewport } from 'next';
import { ThirdwebProviderWrapper } from '@/components/ThirdwebProviderWrapper';

export const viewport: Viewport = {
    themeColor: '#dc2626',
};

export const metadata: Metadata = {
    title: 'RedKey DAO — Community Investment & Lending',
    description: 'Decentralized investment and lending protocol governed by community consensus.',
    icons: {
        icon: '/images/redkey-icon-192.png',
    },
    manifest: '/dao-manifest.json',
    openGraph: {
        title: 'RedKey DAO',
        description: 'A decentralized governance platform for community-driven investment and lending.',
        siteName: 'RedKey DAO',
        locale: 'en_US',
        type: 'website',
    },
};

import DaoFooter from './components/DaoFooter';

export default function DaoLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ThirdwebProviderWrapper>
            <div className="flex flex-col min-h-screen bg-[#060608]">
                <div className="flex-1 flex flex-col min-h-0">
                    {children}
                </div>
                <DaoFooter />
            </div>
        </ThirdwebProviderWrapper>
    );
}
