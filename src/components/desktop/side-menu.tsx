import Link from "next/link";
import { Button } from "../ui/button";
import {
  FileIcon,
  HomeIcon,
  LayersIcon,
  LayoutGridIcon,
  SettingsIcon,
} from "./icon";
import { DESKTOP_SIDE_MENU } from "@/constants/frontend/route";

const SideMenu = () => {
  return (
    <div className="group flex flex-col gap-4 py-2 w-[25%] h-full border-r border-secondary">
      <nav className="flex flex-col justify-between h-full">
        <div className="grid px-2">
          {DESKTOP_SIDE_MENU.map((menu) => (
            <Button
              variant="ghost"
              size="sm"
              className="justify-start gap-2"
              asChild
              key={menu.route}
            >
              <Link
                href={menu.route}
                className="gap-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                prefetch={false}
              >
                <menu.icon className="w-4 h-4" />
                {menu.name}
              </Link>
            </Button>
          ))}
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="justify-start gap-2 px-[20px]"
          asChild
        >
          <Link
            href="#"
            className="gap-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            prefetch={false}
          >
            <SettingsIcon className="w-4 h-4" />
            Logout
          </Link>
        </Button>
      </nav>
    </div>
  );
};

export default SideMenu;
