import { Headphones, Mail, MapPin, Phone, RefreshCcw, Shield, Truck } from "lucide-react";

function Footer() {
  return (
    <div className="flex w-full bg-[#111827] text-white flex-col">
      <div className="flex w-7xl m-auto justify-between py-4 border-b border-b-white/20">

        <div className="flex items-center gap-2 w-73.5">
          <div className="rounded-full w-10 h-10 bg-blue-500/20 flex items-center justify-center">
            <Truck size={18} className="text-blue-500" />
          </div>
          <div className="flex flex-col">
            <div className="font-semibold text-sm">Gratis Ongkir</div>
            <div className="text-xs">Pembayaran berhasil Rp 100.000</div>
          </div>
        </div>

        <div className="flex items-center gap-2 w-73.5">
          <div className="rounded-full w-10 h-10 bg-blue-500/20 flex items-center justify-center">
            <Shield size={18} className="text-blue-500" />
          </div>
          <div className="flex flex-col">
            <div className="font-semibold text-sm">Pembayaran Aman</div>
            <div className="text-xs">SSL terenkripsi 256-bit</div>
          </div>
        </div>

        <div className="flex items-center gap-2 w-73.5">
          <div className="rounded-full w-10 h-10 bg-blue-500/20 flex items-center justify-center">
            <RefreshCcw size={18} className="text-blue-500" />
          </div>
          <div className="flex flex-col">
            <div className="font-semibold text-sm">Pengembalian Mudah</div>
            <div className="text-xs">30 hari pengembalian gratis</div>
          </div>
        </div>

        <div className="flex items-center gap-2 w-73.5">
          <div className="rounded-full w-10 h-10 bg-blue-500/20 flex items-center justify-center">
            <Headphones size={18} className="text-blue-500" />
          </div>
          <div className="flex flex-col">
            <div className="font-semibold text-sm">Dukungan 24/7</div>
            <div className="text-xs">Bantuan kapan saja</div>
          </div>
        </div>

      </div>

      <div className="flex w-7xl m-auto justify-between py-10">
        <div className="flex flex-col gap-3">
          <div className="flex flex-row items-center gap-2">
            <div className="rounded-lg w-8 h-8 bg-blue-500 flex items-center justify-center">B</div>
            <span>BeliMudah</span>
          </div>
          <p className="text-sm">Platform belanja online terpercaya dengan <br></br>
          ribuan produk pilihan. Belanja mudah, <br></br>
          aman, dan menyenangkan.</p>
          <div className="flex gap-2">
            <div className="w-8 h-8 rounded-full bg-white/20 items-center justify-center flex">A</div>
            <div className="w-8 h-8 rounded-full bg-white/20 items-center justify-center flex">A</div>
            <div className="w-8 h-8 rounded-full bg-white/20 items-center justify-center flex">A</div>
            <div className="w-8 h-8 rounded-full bg-white/20 items-center justify-center flex">A</div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="font-semibold text-[16px]">Layanan</div>
          <span className="text-sm">Tentang Kami</span>
          <span className="text-sm">Karier</span>
          <span className="text-sm">Blog</span>
          <span className="text-sm">Program Afliasi</span>
          <span className="text-sm">Jual di BeliMudah</span>
        </div>

        <div className="flex flex-col gap-3">
          <div className="font-semibold text-[16px]">Bantuan</div>
          <span className="text-sm">Cara Belanja</span>
          <span className="text-sm">Kebijakan Kembalian</span>
          <span className="text-sm">Lacak Pesanan</span>
          <span className="text-sm">FAQ</span>
          <span className="text-sm">Hubungi Kami</span>
        </div>

        <div className="flex flex-col gap-3 text-sm">
          <div className="font-semibold text-[16px]">Kontak</div>
          <div className="flex place-items-start gap-2">
            <MapPin size={14} className="mt-1"/>
            <span>Jl. Sudirman No. 1, Jakarta Selatan, DKI<br></br>
            Jakarta 12190</span>
          </div>
          <div className="flex gap-2 items-center">
            <Phone size={14} />
            <span>0800-1234-5678 (Gratis)</span>
          </div>
          <div className="flex gap-2 items-center">
            <Mail size={14} />
            <span>bantuan@belimudah.id</span>
          </div>
          <div className="bg-[#1E2939] p-4 gap-2 flex flex-col rounded-xl">
            <span>Newsletter</span>
            <form className="flex gap-2">
              <div className="flex-1 border border-white/20 rounded-lg">
                <input
                  type="email"
                  placeholder="Email kamu"
                  className="w-full px-4 py-3 rounded-lg bg-transparent text-white placeholder:text-gray-400 outline-none"
                />
              </div>

              <button
                type="submit"
                className="px-4 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-medium"
              >
                Langganan
              </button>
            </form>
          </div>
        </div>
      </div>


      <div className="flex w-7xl m-auto justify-between text-xs text-gray-400 py-4 border-t border-white/20 ">
        <div>© 2026 BeliMudah. Seluruh hak cipta dilindungi.</div>
        <div className="flex gap-2">
          <div>Kebijakan Privasi</div>
          <div>Syarat & Ketentuan</div>
          <div>Admin</div>
        </div>
      </div>
    </div>
  );
}

export { Footer };
