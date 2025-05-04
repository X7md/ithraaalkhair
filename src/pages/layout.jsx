import { Layout } from "@/components/Layout";
import { Outlet, useMatches } from "react-router-dom";

export function RootLayout() {
  const matches = useMatches();
  const routeHandle = matches.findLast((match) => match.handle?.tab)?.handle;
  const currentTab = routeHandle?.tab;
  return (
    <Layout className="flex flex-col h-screen" activeTab={currentTab}>
        <Outlet />
    </Layout>
  );
}
