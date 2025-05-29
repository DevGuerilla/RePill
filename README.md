# SAPA - Sistem Aplikasi Presensi Aktif

SAPA adalah sistem aplikasi presensi aktif berbasis web yang dibangun menggunakan React.js dan Vite. Aplikasi ini dirancang untuk memudahkan pengelolaan presensi karyawan atau siswa dengan interface yang modern dan responsif.

## 🚀 Fitur Utama

### 📋 Manajemen Presensi

- **Presensi Real-time**: Sistem presensi dengan timestamp akurat
- **Check-in/Check-out**: Fitur masuk dan keluar dengan validasi
- **Riwayat Presensi**: Melihat history presensi dengan filter tanggal
- **Status Presensi**: Hadir, Terlambat, Izin, Sakit, Alpha

### 👤 Manajemen User

- **Autentikasi**: Login/logout dengan validasi
- **Profile Management**: Kelola data profil pengguna
- **Role-based Access**: Akses berbeda untuk admin dan user
- **User Dashboard**: Dashboard khusus untuk setiap user

### 📊 Dashboard & Reporting

- **Dashboard Analytics**: Statistik presensi harian, mingguan, bulanan
- **Visual Reports**: Grafik dan chart presensi
- **Export Data**: Download laporan dalam format Excel/PDF
- **Real-time Updates**: Update data secara real-time

### 🔧 Fitur Administrasi

- **User Management**: CRUD pengguna dan role management
- **Setting Aplikasi**: Konfigurasi jam kerja, hari libur
- **Backup Data**: Sistem backup dan restore data
- **Audit Log**: Log aktivitas sistem

## 🛠️ Teknologi yang Digunakan

- **Frontend**: React 19.1.0 + Vite 6.3.5
- **State Management**: Redux Toolkit 2.8.2
- **Routing**: React Router 7.6.0
- **Styling**: Tailwind CSS 4.1.7
- **HTTP Client**: Axios 1.9.0
- **Icons**: Lucide React 0.511.0
- **Build Tool**: Vite dengan ESBuild

## 📋 Prasyarat

Pastikan Anda telah menginstall:

- **Node.js** (versi 18.0.0 atau lebih tinggi)
- **npm** (versi 8.0.0 atau lebih tinggi) atau **yarn**
- **Git** untuk version control

## 🚀 Instalasi

### 1. Clone Repository

```bash
git clone <repository-url>
cd SAPA-FE
```

### 2. Install Dependencies

```bash
# Menggunakan npm
npm install

# Atau menggunakan yarn
yarn install
```

### 3. Konfigurasi Environment

Buat file `.env` di root project:

```bash
cp .env.example .env
```

Edit file `.env` sesuai konfigurasi Anda:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_NAME=SAPA
VITE_APP_VERSION=1.0.0
```

### 4. Jalankan Development Server

```bash
# Menggunakan npm
npm run dev

# Atau menggunakan yarn
yarn dev
```

Aplikasi akan berjalan di `http://localhost:5173`

## 📖 Cara Penggunaan

### Login ke Sistem

1. Buka browser dan akses `http://localhost:5173`
2. Masukkan username dan password
3. Klik tombol "Login"

### Melakukan Presensi

1. Setelah login, klik menu "Presensi"
2. Klik tombol "Check In" untuk masuk
3. Klik tombol "Check Out" untuk keluar
4. Status presensi akan otomatis terupdate

### Melihat Riwayat Presensi

1. Pilih menu "Riwayat Presensi"
2. Gunakan filter tanggal untuk melihat periode tertentu
3. Klik "Export" untuk download laporan

### Dashboard Admin

1. Login sebagai admin
2. Akses menu "Dashboard Admin"
3. Kelola user, setting, dan laporan

## 🏗️ Struktur Project

```
SAPA-FE/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable components
│   │   ├── common/         # Common UI components
│   │   ├── layout/         # Layout components
│   │   └── forms/          # Form components
│   ├── pages/              # Page components
│   │   ├── auth/           # Authentication pages
│   │   ├── dashboard/      # Dashboard pages
│   │   ├── presensi/       # Presensi pages
│   │   └── admin/          # Admin pages
│   ├── store/              # Redux store
│   │   ├── slices/         # Redux slices
│   │   └── index.js        # Store configuration
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Utility functions
│   ├── services/           # API services
│   ├── styles/             # Global styles
│   └── main.jsx            # Entry point
├── package.json
└── README.md
```

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
```

## 🎨 Styling Guide

Project menggunakan Tailwind CSS untuk styling:

- **Colors**: Primary colors sudah dikonfigurasi
- **Components**: Gunakan utility classes Tailwind
- **Responsive**: Mobile-first approach
- **Dark Mode**: Support untuk dark/light theme

Contoh penggunaan:

```jsx
<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Button
</button>
```

## 🔧 Konfigurasi

### Tailwind CSS

Konfigurasi Tailwind ada di `tailwind.config.js`:

```javascript
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {...},
        secondary: {...}
      }
    }
  }
}
```

### Vite Configuration

Konfigurasi Vite ada di `vite.config.js`:

```javascript
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    host: true,
  },
});
```

## 📚 Panduan Development

### Component Development

1. Buat component di folder `src/components/`
2. Gunakan naming convention PascalCase
3. Export default component
4. Tambahkan PropTypes untuk type checking

### State Management

1. Gunakan Redux Toolkit untuk global state
2. Buat slice untuk setiap feature
3. Gunakan RTK Query untuk API calls
4. Implement proper error handling

### API Integration

1. Gunakan Axios untuk HTTP requests
2. Buat service layer di `src/services/`
3. Implement interceptors untuk auth
4. Handle loading dan error states

## 🚀 Deployment

### Build Production

```bash
npm run build
```

### Deploy ke Server

1. Upload folder `dist/` ke web server
2. Konfigurasi web server untuk SPA
3. Set environment variables
4. Test aplikasi

### Environment Variables

```env
# Production
VITE_API_BASE_URL=https://api.sapa.com
VITE_APP_ENV=production
```

## 🤝 Contributing

1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📝 Changelog

### Version 1.0.0

- ✨ Initial release
- 🎉 Basic presensi functionality
- 👤 User authentication
- 📊 Dashboard analytics

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Contact

Project Link: [https://github.com/username/SAPA-FE](https://github.com/username/SAPA-FE)

## 🙏 Acknowledgments

- [React.js](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Lucide Icons](https://lucide.dev/)
