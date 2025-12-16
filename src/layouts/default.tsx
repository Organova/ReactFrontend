import { Link } from "@heroui/link";

import { Navbar } from "@/components/navbar";
import Sidebar from "@/components/Sidebar.tsx";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-shrink-0">
          <Sidebar />
        </div>
        <main className="flex-1 min-w-0 overflow-y-auto px-6 py-16">
          {children}
        </main>
      </div>
      <footer className="w-full flex items-center justify-center py-3">
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href="https://heroui.com"
          title="heroui.com homepage"
        >
          <span className="text-default-600">Powered by</span>
          <p className="text-primary">HeroUI</p>
        </Link>
      </footer>
    </div>
  );
}
