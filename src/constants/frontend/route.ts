import { Route } from "@/enums/route";
import Home from "../../../public/footerIcon/home.svg";
import HomeActive from "../../../public/footerIcon/home-active.svg";
import BarChart from "../../../public/footerIcon/bar-chart.svg";
import BarChartActive from "../../../public/footerIcon/bar-chart-active.svg";
import Wallet from "../../../public/footerIcon/wallet.svg";
import WalletActive from "../../../public/footerIcon/wallet-active.svg";
import User from "../../../public/footerIcon/user.svg";
import UserActive from "../../../public/footerIcon/user-active.svg";
import AddIcon from "../../../public/footerIcon/add-icon.svg";
import {
  FileIcon,
  HomeIcon,
  LayersIcon,
  LayoutGridIcon,
  SettingsIcon,
} from "@/components/desktop/icon";

export const MOBILE_HOME_PAGE = "/mobile";
export const DESKTOP_HOME_PAGE = "/";
export const API_ROUTE = "/api";
export const TEST_MOBILE_REGEX =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

export const MOBILE_FOOTER = [
  {
    name: "home",
    route: Route.HOME,
    icon: Home,
    activeIcon: HomeActive,
  },
  {
    name: "statistic",
    route: Route.STATISTIC,
    icon: BarChart,
    activeIcon: BarChartActive,
  },
  {
    name: "add",
    route: Route.ADD,
    icon: AddIcon,
  },
  {
    name: "wallet",
    route: Route.WALLET,
    icon: Wallet,
    activeIcon: WalletActive,
  },
  {
    name: "profile",
    route: Route.PROFILE,
    icon: User,
    activeIcon: UserActive,
  },
];

export const DESKTOP_SIDE_MENU = [
  {
    name: "Home",
    route: Route.HOME,
    icon: HomeIcon,
  },
  {
    name: "Pages",
    route: Route.HOME,
    icon: FileIcon,
  },
  {
    name: "Components",
    route: Route.HOME,
    icon: LayoutGridIcon,
  },
  {
    name: "Layouts",
    route: Route.HOME,
    icon: LayersIcon,
  },
  {
    name: "Settings",
    route: Route.HOME,
    icon: SettingsIcon,
  },
];
