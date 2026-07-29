import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/training/$slug")({
  beforeLoad: ({ params }) => {
    throw redirect({ to: "/formations/$slug", params: { slug: params.slug } });
  },
  component: () => null,
});
