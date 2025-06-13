import {
  LayoutDashboard,
  UserCircle,
  Users,
  Truck,
  Pill,
  Package,
  Activity,
} from "lucide-react";

export const sidebarItems = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/dashboard/profile", label: "Profile", icon: UserCircle },
  { path: "/dashboard/user", label: "User", icon: Users },
  { path: "/dashboard/drug-report", label: "Penggunaan Obat", icon: Activity },
  { path: "/dashboard/supplier", label: "Supplier", icon: Truck },
  { path: "/dashboard/medicine", label: "Medicine", icon: Pill },
  { path: "/dashboard/stock", label: "Stock", icon: Package },
];
