export const metadata = {
  title: "ShortsEngine AI",
  description: "Генерирай вирусни сценарии за Reels, TikTok & Shorts за секунди",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bg">
      <body>
        <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
