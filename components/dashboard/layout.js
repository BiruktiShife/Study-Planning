/* eslint-disable @next/next/no-sync-scripts */
export default function DashboardLayout({ children }) {
  return (
    <div>
      <script src="./node_modules/preline/dist/preline.ts"></script>
      {children}
    </div>
  );
}
