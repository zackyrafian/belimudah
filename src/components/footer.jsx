
import { Headphones, Mail, MapPin, Phone, RefreshCcw, Shield, Truck } from "lucide-react";

function Footer() {
  return (
    <div className="flex w-full bg-[#111827] text-white flex-col px-4">
      <div className="flex w-full md:max-w-7xl md:mx-auto justify-between py-6 md:py-4 border-b border-b-white/20 gap-4 flex-wrap md:flex-nowrap ">

        <div className="flex items-center gap-2 w-full sm:w-1/2 md:flex-1 justify-center">
          <div className="rounded-full w-10 h-10 bg-blue-500/20 flex items-center justify-center shrink-0">
            <Truck size={18} className="text-blue-500" />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="font-semibold text-sm">Gratis Ongkir</div>
            <div className="text-xs">Pembayaran berhasil Rp 100.000</div>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-1/2 md:flex-1 justify-center">
          <div className="rounded-full w-10 h-10 bg-blue-500/20 flex items-center justify-center shrink-0">
            <Shield size={18} className="text-blue-500" />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="font-semibold text-sm">Pembayaran Aman</div>
            <div className="text-xs">SSL terenkripsi 256-bit</div>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-1/2 md:flex-1 justify-center">
          <div className="rounded-full w-10 h-10 bg-blue-500/20 flex items-center justify-center shrink-0">
            <RefreshCcw size={18} className="text-blue-500" />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="font-semibold text-sm">Pengembalian Mudah</div>
            <div className="text-xs">30 hari pengembalian gratis</div>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-1/2 md:flex-1 justify-center">
          <div className="rounded-full w-10 h-10 bg-blue-500/20 flex items-center justify-center shrink-0">
            <Headphones size={18} className="text-blue-500" />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="font-semibold text-sm">Dukungan 24/7</div>
            <div className="text-xs">Bantuan kapan saja</div>
          </div>
        </div>

      </div>

      <div className="flex w-full px-4 md:px-0 md:max-w-7xl md:mx-auto justify-between py-8 md:py-10 flex-col md:flex-row gap-8">
        
        <div className="flex flex-col gap-3 w-full md:w-auto">
          <div className="flex flex-row items-center gap-2">
            <div className="rounded-lg w-8 h-8 bg-blue-500 flex items-center justify-center shrink-0 font-semibold">B</div>
            <span className="font-semibold">BeliMudah</span>
          </div>
          <p className="text-sm leading-relaxed">Platform belanja online terpercaya dengan ribuan produk pilihan. Belanja mudah, aman, dan menyenangkan.</p>
          <div className="flex gap-2">
            <div className="w-8 h-8 rounded-full bg-white/20 items-center justify-center flex text-xs">A</div>
            <div className="w-8 h-8 rounded-full bg-white/20 items-center justify-center flex text-xs">A</div>
            <div className="w-8 h-8 rounded-full bg-white/20 items-center justify-center flex text-xs">A</div>
            <div className="w-8 h-8 rounded-full bg-white/20 items-center justify-center flex text-xs">A</div>
          </div>
        </div>

        <div className="flex flex-col gap-3 w-full sm:w-1/2 md:w-auto">
          <div className="font-semibold text-base">Layanan</div>
          <span className="text-sm">Tentang Kami</span>
          <span className="text-sm">Karier</span>
          <span className="text-sm">Blog</span>
          <span className="text-sm">Program Afliasi</span>
          <span className="text-sm">Jual di BeliMudah</span>
        </div>

        <div className="flex flex-col gap-3 w-full sm:w-1/2 md:w-auto">
          <div className="font-semibold text-base">Bantuan</div>
          <span className="text-sm">Cara Belanja</span>
          <span className="text-sm">Kebijakan Kembalian</span>
          <span className="text-sm">Lacak Pesanan</span>
          <span className="text-sm">FAQ</span>
          <span className="text-sm">Hubungi Kami</span>
        </div>

        <div className="flex flex-col gap-3 text-sm w-full md:w-auto">
          <div className="font-semibold text-base">Kontak</div>
          <div className="flex gap-2 items-start">
            <MapPin size={14} className="mt-1 shrink-0" />
            <span className="text-sm">Jl. Sudirman No. 1, Jakarta Selatan, DKI Jakarta 12190</span>
          </div>
          <div className="flex gap-2 items-center">
            <Phone size={14} className="shrink-0" />
            <span className="text-sm">0800-1234-5678 (Gratis)</span>
          </div>
          <div className="flex gap-2 items-center">
            <Mail size={14} className="shrink-0" />
            <span className="text-sm">bantuan@belimudah.id</span>
          </div>
          <div className="bg-[#1E2939] p-4 gap-3 flex flex-col rounded-xl mt-2">
            <span className="text-sm font-medium">Newsletter</span>
            <form className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1 border border-white/20 rounded-lg">
                <input
                  type="email"
                  placeholder="Email kamu"
                  className="w-full px-4 py-3 rounded-lg bg-transparent text-white placeholder:text-gray-400 outline-none text-sm"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-medium text-sm whitespace-nowrap"
              >
                Langganan
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="flex w-full px-4 md:px-0 md:max-w-7xl md:mx-auto justify-between text-xs text-gray-400 py-4 border-t border-white/20 flex-col md:flex-row gap-4">
        <div>© 2026 BeliMudah. Seluruh hak cipta dilindungi.</div>
        <div className="flex gap-4 flex-wrap">
          <div>Kebijakan Privasi</div>
          <div>Syarat & Ketentuan</div>
          <div>Admin</div>
        </div>
      </div>
    </div>
  );
}

export { Footer };
