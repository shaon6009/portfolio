import './globals.css'; // Next.js imports tailwind directives through here

export const metadata = {
  title: 'MD RAKIBUL HASAN SHAON | BI & Analytics Portfolio',
  description: 'Enterprise Business Intelligence & Supply Chain Analytics Portfolio',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-slate-50 text-slate-900 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}