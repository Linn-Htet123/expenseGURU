import Footer from "@/components/mobile/footer";
import Header from "@/components/mobile/header";

export default function MobileLayout({
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
