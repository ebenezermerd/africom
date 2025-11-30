import React from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-[#020202] text-white overflow-x-hidden antialiased">
            {children}
        </div>
    );
}
