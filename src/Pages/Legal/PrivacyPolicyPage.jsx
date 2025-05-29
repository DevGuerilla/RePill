import React from "react";
import { ArrowLeft, Shield } from "lucide-react";
import { Link } from "react-router";
import AuthLayout from "../../Components/Layouts/Auth/AuthLayouts";

const PrivacyPolicyPage = () => {
  return (
    <AuthLayout
      title="Kebijakan Privasi"
      subtitle={
        <div className="text-sm text-slate-600 leading-relaxed">
          <strong>Perlindungan Data dan Privasi RePill</strong>
          <br />
          Komitmen kami untuk melindungi informasi pribadi Anda.
        </div>
      }
    >
      <div className="max-h-96 overflow-y-auto bg-slate-50 rounded-lg p-4 mb-6">
        <div className="prose prose-sm max-w-none">
          <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center">
            <Shield className="mr-2" size={20} />
            Kebijakan Privasi Sistem RePill
          </h3>

          <div className="space-y-4 text-slate-700">
            <section>
              <h4 className="font-semibold text-slate-800 mb-2">
                1. Informasi yang Kami Kumpulkan
              </h4>
              <p className="text-sm leading-relaxed">
                Kami mengumpulkan informasi yang Anda berikan secara langsung,
                termasuk nama, username, email, dan data terkait aktivitas
                pengelolaan stok obat di Puskesmas.
              </p>
            </section>

            <section>
              <h4 className="font-semibold text-slate-800 mb-2">
                2. Penggunaan Informasi
              </h4>
              <ul className="text-sm space-y-1 ml-4">
                <li>• Menyediakan dan memelihara layanan sistem RePill</li>
                <li>• Memproses dan melacak inventori obat</li>
                <li>• Memberikan dukungan teknis kepada pengguna</li>
                <li>• Meningkatkan kualitas layanan sistem</li>
                <li>• Mematuhi persyaratan hukum dan regulasi kesehatan</li>
              </ul>
            </section>

            <section>
              <h4 className="font-semibold text-slate-800 mb-2">
                3. Keamanan Data
              </h4>
              <p className="text-sm leading-relaxed">
                Kami menerapkan langkah-langkah keamanan yang sesuai untuk
                melindungi informasi pribadi Anda dari akses yang tidak sah,
                perubahan, pengungkapan, atau penghancuran. Semua data
                dienkripsi dan disimpan dengan aman.
              </p>
            </section>

            <section>
              <h4 className="font-semibold text-slate-800 mb-2">
                4. Berbagi Informasi
              </h4>
              <p className="text-sm leading-relaxed">
                Kami tidak akan menjual, menyewakan, atau membagikan informasi
                pribadi Anda kepada pihak ketiga tanpa persetujuan Anda, kecuali
                diwajibkan oleh hukum atau untuk kepentingan kesehatan
                masyarakat.
              </p>
            </section>

            <section>
              <h4 className="font-semibold text-slate-800 mb-2">
                5. Penyimpanan Data
              </h4>
              <p className="text-sm leading-relaxed">
                Data akan disimpan selama diperlukan untuk tujuan yang
                dijelaskan dalam kebijakan ini atau sesuai dengan persyaratan
                hukum yang berlaku di bidang kesehatan.
              </p>
            </section>

            <section>
              <h4 className="font-semibold text-slate-800 mb-2">
                6. Hak Pengguna
              </h4>
              <ul className="text-sm space-y-1 ml-4">
                <li>• Mengakses informasi pribadi yang kami simpan</li>
                <li>• Meminta koreksi data yang tidak akurat</li>
                <li>• Meminta penghapusan data pribadi (sesuai regulasi)</li>
                <li>• Menolak pemrosesan data untuk tujuan tertentu</li>
                <li>• Portabilitas data sesuai peraturan yang berlaku</li>
              </ul>
            </section>

            <section>
              <h4 className="font-semibold text-slate-800 mb-2">
                7. Cookies dan Teknologi Pelacakan
              </h4>
              <p className="text-sm leading-relaxed">
                Kami menggunakan cookies untuk meningkatkan pengalaman pengguna
                dan menjaga keamanan sesi. Anda dapat mengatur preferensi
                cookies melalui pengaturan browser Anda.
              </p>
            </section>

            <section>
              <h4 className="font-semibold text-slate-800 mb-2">
                8. Perubahan Kebijakan
              </h4>
              <p className="text-sm leading-relaxed">
                Kebijakan privasi ini dapat diperbarui dari waktu ke waktu. Kami
                akan memberitahu Anda tentang perubahan signifikan melalui email
                atau notifikasi sistem.
              </p>
            </section>

            <section>
              <h4 className="font-semibold text-slate-800 mb-2">9. Kontak</h4>
              <p className="text-sm leading-relaxed">
                Jika Anda memiliki pertanyaan tentang kebijakan privasi ini atau
                ingin menggunakan hak Anda, silakan hubungi tim dukungan RePill.
              </p>
            </section>
          </div>

          <div className="mt-6 p-3 bg-green-50 rounded-lg border border-green-200">
            <p className="text-xs text-green-700">
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

export default PrivacyPolicyPage;
