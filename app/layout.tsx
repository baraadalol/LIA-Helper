export const metadata = {
  title: "LIA Helper",
  description: "Personal CRM for managing LIA applications",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
