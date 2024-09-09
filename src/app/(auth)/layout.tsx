export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex justify-center items-center h-screen w-screen">
      {children}
    </main>
  );
}
