import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { AdminShell } from "@/components/admin/AdminShell";

export const Route = createFileRoute("/admin")({
  ssr: false,
  beforeLoad: async ({ location }) => {
    if (location.pathname.startsWith("/admin/login")) return;
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({ to: "/admin/login" });
    const { data: isAdmin } = await supabase.rpc("is_admin");
    if (!isAdmin) throw redirect({ to: "/admin/login", search: { denied: true } });
  },
  head: () => ({
    meta: [
      { title: "Administration — AT SAFETY PRIVE" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminLayout,
});

function AdminLayout() {
  const pathname = Route.useRouteContext as unknown as never;
  void pathname;
  return <Outlet />;
}

export { AdminShell };
