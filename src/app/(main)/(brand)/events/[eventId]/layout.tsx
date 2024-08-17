"use client";
import { usePathname } from "next/navigation";
import React from "react";

import SideBarItem from "@/components/molecules/side-bar-item";
import PaddingWrapper from "@/components/templates/padding-wrapper";

export default function EventDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { eventId: string };
}) {
  const eventId = params.eventId;
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
  const pathname = usePathname();
  return (
    <PaddingWrapper className="grid grid-cols-12 gap-4 pt-4">
      <div className="col-start-2 col-span-3 flex flex-col pt-10">
        {urls.map((url) => (
          <SideBarItem href={url.href} active={pathname === url.href}>
            {url.title}
          </SideBarItem>
        ))}
      </div>
      <div className="col-span-7 lg:col-span-full">{children}</div>
    </PaddingWrapper>
  );
}
