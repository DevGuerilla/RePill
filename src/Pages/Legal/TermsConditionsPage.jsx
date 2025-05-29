import React from "react";
import { ArrowLeft, FileText } from "lucide-react";
import { Link } from "react-router";
import AuthLayout from "../../Components/Layouts/Auth/AuthLayouts";

const TermsConditionsPage = () => {
  return (
    <AuthLayout
      title="Syarat dan Ketentuan"
      subtitle={
        <div className="text-sm text-slate-600 leading-relaxed">
          <strong>Ketentuan Penggunaan Sistem RePill</strong>
          <br />
          Silakan baca dengan seksama sebelum menggunakan layanan kami.
        </div>
      }
    >
      <div className="max-h-96 overflow-y-auto bg-slate-50 rounded-lg p-4 mb-6">
        <div className="prose prose-sm max-w-none">
          <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center">
            <FileText className="mr-2" size={20} />
            Syarat dan Ketentuan Penggunaan RePill
          </h3>

          <div className="space-y-4 text-slate-700">
            <section>
              <h4 className="font-semibold text-slate-800 mb-2">
                1. Penerimaan Ketentuan
              </h4>
              <p className="text-sm leading-relaxed">
                Dengan mengakses dan menggunakan sistem RePill, Anda menyetujui
                untuk terikat oleh syarat dan ketentuan ini. Jika Anda tidak
                menyetujui ketentuan ini, mohon untuk tidak menggunakan layanan
                kami.
              </p>
            </section>

            <section>
              <h4 className="font-semibold text-slate-800 mb-2">
                2. Definisi Layanan
              </h4>
              <p className="text-sm leading-relaxed">
                RePill adalah sistem manajemen stok obat yang dirancang khusus
                untuk Puskesmas guna membantu pengelolaan inventori obat-obatan
                secara digital dan efisien.
              </p>
            </section>

            <section>
              <h4 className="font-semibold text-slate-800 mb-2">
                3. Eligibilitas Pengguna
              </h4>
              <ul className="text-sm space-y-1 ml-4">
                <li>• Petugas kesehatan resmi yang bekerja di Puskesmas</li>
                <li>• Memiliki otorisasi dari kepala Puskesmas</li>
                <li>• Berusia minimal 18 tahun</li>
                <li>• Memiliki pemahaman dasar penggunaan sistem digital</li>
              </ul>
            </section>

            <section>
              <h4 className="font-semibold text-slate-800 mb-2">
                4. Tanggung Jawab Pengguna
              </h4>
              <ul className="text-sm space-y-1 ml-4">
                <li>• Menjaga kerahasiaan akun dan kata sandi</li>
                <li>
                  • Menggunakan sistem sesuai dengan prosedur yang berlaku
                </li>
                <li>• Melaporkan segera jika terjadi penyalahgunaan akun</li>
                <li>• Memastikan keakuratan data yang diinput</li>
                <li>
                  • Tidak menyalahgunakan sistem untuk kepentingan pribadi
                </li>
              </ul>
            </section>

            <section>
              <h4 className="font-semibold text-slate-800 mb-2">
                5. Keamanan Data
              </h4>
              <p className="text-sm leading-relaxed">
                Kami berkomitmen melindungi data medis dan inventori dengan
                standar keamanan tinggi. Data akan dienkripsi dan hanya dapat
                diakses oleh pengguna yang memiliki otorisasi.
              </p>
            </section>

            <section>
              <h4 className="font-semibold text-slate-800 mb-2">
                6. Privasi Informasi
              </h4>
              <p className="text-sm leading-relaxed">
                Informasi yang dikumpulkan akan digunakan sesuai dengan
                kebijakan privasi kami dan peraturan perlindungan data yang
                berlaku di Indonesia.
              </p>
            </section>

            <section>
              <h4 className="font-semibold text-slate-800 mb-2">
                7. Pembatasan Layanan
              </h4>
              <p className="text-sm leading-relaxed">
                Kami berhak untuk membatasi, menangguhkan, atau menghentikan
                akses pengguna yang melanggar ketentuan ini atau menggunakan
                sistem secara tidak wajar.
              </p>
            </section>

            <section>
              <h4 className="font-semibold text-slate-800 mb-2">
                8. Pemeliharaan Sistem
              </h4>
              <p className="text-sm leading-relaxed">
                Sistem dapat mengalami downtime untuk pemeliharaan terjadwal.
                Kami akan memberikan pemberitahuan sebelumnya untuk maintenance
                yang memerlukan waktu lama.
              </p>
            </section>

            <section>
              <h4 className="font-semibold text-slate-800 mb-2">
                9. Dukungan Teknis
              </h4>
              <p className="text-sm leading-relaxed">
                Tim dukungan teknis tersedia untuk membantu mengatasi masalah
                teknis dan memberikan pelatihan penggunaan sistem kepada
                pengguna baru.
              </p>
            </section>

            <section>
              <h4 className="font-semibold text-slate-800 mb-2">
                10. Perubahan Ketentuan
              </h4>
              <p className="text-sm leading-relaxed">
                Syarat dan ketentuan ini dapat diubah sewaktu-waktu. Pengguna
                akan diberitahu mengenai perubahan penting melalui email atau
                notifikasi sistem.
              </p>
            </section>

            <section>
              <h4 className="font-semibold text-slate-800 mb-2">
                11. Hukum yang Berlaku
              </h4>
              <p className="text-sm leading-relaxed">
                Syarat dan ketentuan ini tunduk pada hukum Republik Indonesia.
                Setiap sengketa akan diselesaikan melalui jalur hukum yang
                berlaku.
              </p>
            </section>

            <section>
              <h4 className="font-semibold text-slate-800 mb-2">12. Kontak</h4>
              <p className="text-sm leading-relaxed">
                Untuk pertanyaan mengenai syarat dan ketentuan ini, silakan
                hubungi tim dukungan RePill melalui email atau sistem tiket
                internal.
              </p>
            </section>
          </div>

          <div className="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-700">
              <strong>Terakhir diperbarui:</strong>{" "}
              {new Date().toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <Link
          to="/daftar"
          className="inline-flex items-center text-sm text-primary font-semibold hover:underline"
        >
          <ArrowLeft className="mr-1" size={16} />
          Kembali ke Pendaftaran
        </Link>
      </div>
    </AuthLayout>
  );
};

export default TermsConditionsPage;
