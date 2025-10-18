import { AppHeader } from "@/components/app-header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <main className="flex-1 container py-8">{children}</main>
    </div>
  );
}
