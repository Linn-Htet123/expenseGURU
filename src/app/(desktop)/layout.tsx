import Footer from "@/components/desktop/footer";
import Header from "@/components/desktop/header";

export default function DesktopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 overflow-auto">{children}</div>
      <Footer />
    </div>
  );
}
