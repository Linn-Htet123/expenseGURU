import Footer from "@/components/mobile/footer";

export default function MobileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
