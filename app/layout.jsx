import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "ShortsEngine AI",
  description: "Генерирай вирусни сценарии за Reels, TikTok & Shorts за секунди",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="bg">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
