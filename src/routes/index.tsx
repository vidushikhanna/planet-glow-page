import { createFileRoute, redirect } from "@tanstack/react-router";

// The landing page is a standalone static build (public/site/index.html + style.css + script.js).
// "/" simply forwards to it so the preview opens the real page.
export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ href: "/site/index.html" });
  },
  component: () => null,
});
