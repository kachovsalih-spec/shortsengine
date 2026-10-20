export default function RootLayout({ children }) {
  return (
    <html lang="bg">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className="bg-slate-950 text-white min-h-screen font-sans">
        {children}
      </body>
    </html>
  );
}
