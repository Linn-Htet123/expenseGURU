import Footer from "@/components/desktop/footer";
import Header from "@/components/desktop/header";
import SideMenu from "@/components/desktop/side-menu";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function DesktopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex flex-col h-dvh">
        <Header />
        <div className="flex h-[calc(100dvh-64px)]">
          <SideMenu />
          <ScrollArea className="grow h-full">{children}</ScrollArea>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}
