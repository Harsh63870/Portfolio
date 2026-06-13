import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../contexts/ThemeContext";
import ThemeToggle from "../components/ThemeToggle";
import Navigation from "../components/Navigation";
import ScrollToTop from "../components/ScrollToTop";
import SiteBackground from "../components/three/SiteBackground";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Harsh Vardhan Pandey - Portfolio",
  description: "Portfolio of Harsh Vardhan Pandey, an aspiring Software Developer.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme') || 'dark';
                document.documentElement.classList.toggle('dark', theme === 'dark');
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <SiteBackground />
          <ThemeToggle />
          {children}
          {/* <Navigation /> */}
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
