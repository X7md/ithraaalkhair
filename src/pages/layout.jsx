import { Layout } from "@/components/Layout";
import { Outlet } from "react-router-dom";
export function RootLayout() {
  return (
    <Layout className="flex flex-col h-screen">
        <Outlet />
    </Layout>
  );
}
