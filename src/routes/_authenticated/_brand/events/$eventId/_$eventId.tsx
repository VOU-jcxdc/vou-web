import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";

import SideBarItem from "@/components/molecules/side-bar-item";
import PaddingWrapper from "@/components/templates/padding-wrapper";

export const Route = createFileRoute("/_authenticated/_brand/events/$eventId/_$eventId")({
  component: EventDetailLayout,
});

function EventDetailLayout() {
  const { eventId } = Route.useParams<{ eventId: string }>();
  const urls = [
    {
      href: `/events/${eventId}`,
      title: "General information",
    },
    {
      href: `/events/${eventId}/vouchers`,
      title: "Vouchers",
    },
    {
      href: `/events/${eventId}/game`,
      title: "Game",
    },
  ];
  const {
    location: { pathname },
  } = useRouterState();
  return (
    <PaddingWrapper className="grid grid-cols-12 gap-4 pt-4">
      <div className="col-span-3 col-start-2 flex flex-col pt-10">
        {urls.map((url) => (
          <SideBarItem href={url.href} active={pathname === url.href}>
            {url.title}
          </SideBarItem>
        ))}
      </div>
      <div className="col-span-7 lg:col-span-full">
        <Outlet />
      </div>
    </PaddingWrapper>
  );
}
