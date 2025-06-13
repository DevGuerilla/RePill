import {
  LayoutDashboard,
  UserCircle,
  Users,
  Truck,
  Pill,
  Package,
  Activity,
  TrendingUp,
} from "lucide-react";

export const sidebarItems = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/dashboard/profile", label: "Profil", icon: UserCircle },
  { path: "/dashboard/user", label: "Pengguna", icon: Users },
  { path: "/dashboard/drug-report", label: "Penggunaan Obat", icon: Activity },
  {
    path: "/dashboard/stock-predictions",
    label: "Prediksi Stok",
    icon: TrendingUp,
  },
  { path: "/dashboard/supplier", label: "Supplier", icon: Truck },
  { path: "/dashboard/medicine", label: "Obat", icon: Pill },
  { path: "/dashboard/stock", label: "Stok", icon: Package },
];
