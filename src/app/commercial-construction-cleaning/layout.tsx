// Isolated funnel boundary: intentionally does NOT render the main site's
// Header, Footer, MobileCTABar, or nav. Only the root layout's <html>/<body>
// wraps this route — see src/app/layout.tsx.
export default function CommercialCleaningLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
