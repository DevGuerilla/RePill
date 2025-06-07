import {
  LayoutDashboard,
  Trophy,
  User,
  ClipboardList,
  UserCircle,
  Users,
  MapPin,
  Megaphone,
  Monitor,
  Briefcase,
} from "lucide-react";

export const sidebarItems = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/dashboard/profile", label: "Profile", icon: UserCircle },
  { path: "/dashboard/kompetisi", label: "Kompetisi", icon: ClipboardList },
  {
    path: "/dashboard/KategoriKompetisi",
    label: "Kategori Kompetisi",
    icon: ClipboardList,
  },
  {
    path: "/dashboard/kehadiran",
    label: "Manajemen Presensi",
    icon: MapPin,
  },
  { path: "/dashboard/pengumuman", label: "Pengumuman", icon: Megaphone },
  { path: "/dashboard/cbt", label: "CBT", icon: Monitor },
  { path: "/dashboard/aktifitas", label: "Aktifitas", icon: ClipboardList },
  { path: "/dashboard/lowongan", label: "Lowongan", icon: Briefcase },
  { path: "/dashboard/user", label: "User", icon: Users },
];
