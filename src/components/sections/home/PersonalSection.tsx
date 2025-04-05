"use client"
import Link from "next/link";
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu,SidebarMenuButton,SidebarMenuItem } from "@/components/ui/sidebar";
import { personalItems } from "@/constants";
const PersonalSection = () => {
  return <SidebarGroup>
    <SidebarGroupLabel>
        You
    </SidebarGroupLabel>
    <SidebarGroupContent>
        <SidebarMenu>
          {personalItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                asChild
                isActive={false}
                onClick={() => {}}
              >
                <Link href={item.url} className="flex items-center gap-4">
                  <item.icon />
                  <span className="text-sm">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>

  </SidebarGroup>
};
export default PersonalSection;