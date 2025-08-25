import { createFileRoute, redirect } from "@tanstack/react-router";
import { CreateUrlForm } from "./-components/create-url-form";
import { ShortenUrls } from "./-components/shorten-urls";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: () => {
    const user = localStorage.getItem("auth-user");

    if (!user) {
      return redirect({
        to: "/auth/login",
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-8">
      <h1 className="text-2xl">Dashboard</h1>

      <CreateUrlForm />

      <ShortenUrls />
    </div>
  );
}
