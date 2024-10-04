'use client'

import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>MAITAKE MAITAKE GURUGURU GURUGURU</title>
      </head>
      <body style={{ backgroundColor: 'whitesmoke' }}>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
