import Footer from "@/components/mobile/footer";
import Header from "@/components/mobile/header";

export default function MobileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
