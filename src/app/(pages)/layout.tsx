import Header from "@/components/UI/Header";
import Sidebar from "@/components/sidebar/Sidebar";

export default function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Sidebar />
      <div className="flex flex-col gap-y-2 flex-1 ">
        <Header />
        <main className="flex flex-col gap-y-8 items-start justify-center  p-12">
          {children}
        </main>
      </div>
    </>
  );
}
