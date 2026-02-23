import type { Metadata } from "next";
import { Inter, Orbitron, Rajdhani, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RobotManager } from "@/components/3d/RobotManager";
import { ChatBox } from "@/components/layout/ChatBox";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

const orbitron = Orbitron({ 
  subsets: ["latin"],
  variable: '--font-orbitron',
  display: 'swap',
});

const rajdhani = Rajdhani({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-rajdhani',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Ghostwire Systems | Advanced POS & ERP",
  description: "Next-generation Point of Sale and ERP system with cyberpunk aesthetics",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${orbitron.variable} ${rajdhani.variable} ${jetbrainsMono.variable} font-inter antialiased bg-deep-black text-ghost-white`}>
        <Navbar />
        {children}
        <Footer />
        <RobotManager />
        <ChatBox />
      </body>
    </html>
  );
}