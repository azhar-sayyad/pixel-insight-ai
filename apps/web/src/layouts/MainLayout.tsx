import type { ReactNode } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useTheme } from "../hooks/useTheme";

export default function MainLayout({ children }: { children: ReactNode }) {
  useTheme(); // applies dark/light class to <html> on mount + on toggle
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
