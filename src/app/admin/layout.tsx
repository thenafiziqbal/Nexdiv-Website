// Admin pages share the root layout (which already wraps with AuthProvider).
// SiteShell automatically hides the user-site Navbar/Footer/Notice for /admin paths.
export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
