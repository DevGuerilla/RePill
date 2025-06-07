import React from "react";
import { X, Shield } from "lucide-react";

const PrivacyModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-20 bg-black/60 backdrop-blur-xs bg- flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center">
            <Shield className="mr-2 text-primary" size={20} />
            <h3 className="text-lg font-semibold text-slate-800">
              Kebijakan Privasi
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="prose prose-sm max-w-none">
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
                  <li>• Mematuhi persyaratan hukum dan regulasi</li>
                </ul>
              </section>

              <section>
                <h4 className="font-semibold text-slate-800 mb-2">
                  3. Keamanan Data
                </h4>
                <p className="text-sm leading-relaxed">
                  Kami menerapkan langkah-langkah keamanan yang sesuai untuk
                  melindungi informasi pribadi Anda dari akses yang tidak sah,
                  perubahan, pengungkapan, atau penghancuran.
                </p>
              </section>

              <section>
                <h4 className="font-semibold text-slate-800 mb-2">
                  4. Berbagi Informasi
                </h4>
                <p className="text-sm leading-relaxed">
                  Kami tidak akan menjual, menyewakan, atau membagikan informasi
                  pribadi Anda kepada pihak ketiga tanpa persetujuan Anda,
                  kecuali diwajibkan oleh hukum.
                </p>
              </section>

              <section>
                <h4 className="font-semibold text-slate-800 mb-2">
                  5. Penyimpanan Data
                </h4>
                <p className="text-sm leading-relaxed">
                  Data akan disimpan selama diperlukan untuk tujuan yang
                  dijelaskan dalam kebijakan ini atau sesuai dengan persyaratan
                  hukum yang berlaku.
                </p>
              </section>

              <section>
                <h4 className="font-semibold text-slate-800 mb-2">
                  6. Hak Pengguna
                </h4>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• Mengakses informasi pribadi yang kami simpan</li>
                  <li>• Meminta koreksi data yang tidak akurat</li>
                  <li>• Meminta penghapusan data pribadi</li>
                  <li>• Menolak pemrosesan data untuk tujuan tertentu</li>
                </ul>
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

        <div className="p-4 border-t border-gray-200 bg-slate-50">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyModal;
