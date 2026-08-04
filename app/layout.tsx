import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.sun-beach-house.com'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
