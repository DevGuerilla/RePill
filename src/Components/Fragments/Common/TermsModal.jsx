import React from "react";
import { X, FileText } from "lucide-react";

const TermsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center">
            <FileText className="mr-2 text-primary" size={20} />
            <h3 className="text-lg font-semibold text-slate-800">
              Syarat dan Ketentuan
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
                  1. Penerimaan Ketentuan
                </h4>
                <p className="text-sm leading-relaxed">
                  Dengan mengakses dan menggunakan sistem RePill, Anda
                  menyetujui untuk terikat oleh syarat dan ketentuan ini. Jika
                  Anda tidak menyetujui ketentuan ini, mohon untuk tidak
                  menggunakan layanan kami.
                </p>
              </section>

              <section>
                <h4 className="font-semibold text-slate-800 mb-2">
                  2. Definisi Layanan
                </h4>
                <p className="text-sm leading-relaxed">
                  RePill adalah sistem manajemen stok obat yang dirancang khusus
                  untuk Puskesmas guna membantu pengelolaan inventori
                  obat-obatan secara digital dan efisien.
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
                  6. Pembatasan Layanan
                </h4>
                <p className="text-sm leading-relaxed">
                  Kami berhak untuk membatasi, menangguhkan, atau menghentikan
                  akses pengguna yang melanggar ketentuan ini atau menggunakan
                  sistem secara tidak wajar.
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

export default TermsModal;
