import {
  BarChart3,
  LineChart,
  ArrowRightLeft,
  Eye,
  Briefcase,
  PieChart,
  Cuboid,
  Layout,
  type LucideIcon,
  CarFront,
  Amphora,
  House
} from "lucide-react";

export type SiteConfig = typeof siteConfig;
export type Navigation = {
  icon: LucideIcon;
  name: string;
  href: string;
};

export const siteConfig = {
  title: "Metafin",
  description: "Your Personal Finance Assistant",
};

export const navigations: Navigation[] = [
  {
    icon: Layout,
    name: "Dashboard",
    href: "/",
  },
  {
    icon: PieChart,
    name: "Mutual Funds",
    href: "/mutualFund",
  },
  {
    icon: Cuboid,
    name: "Gold",
    href: "/gold",
  },
  {
    icon: CarFront,
    name: "Luxury Cars",
    href: "/luxury",
  },
  {
    icon: Amphora,
    name: "Fine Arts",
    href: "/arts",
  },
  {
    icon: House,
    name: "Real Estate",
    href: "/real",
  },
  {
    icon: ArrowRightLeft,
    name: "Stock Comparison",
    href: "/compare",
  },
  {
    icon: Eye,
    name: "My Watchlist",
    href: "/watchlist",
  },
  {
    icon: Briefcase,
    name: "Holdings",
    href: "/holdings",
  }
];