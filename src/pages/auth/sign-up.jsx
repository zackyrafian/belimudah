import { Mail } from "lucide-react"
import { Link } from "react-router"
import { AuthService } from "@/services/auth.service"
import { useState } from "react"

export default function SignUpPage() {
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")
  
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const form = new FormData(e.target);
      const data = Object.fromEntries(form.entries());
      AuthService.register(data);
      setError("");
      setSuccess("Berhasil daftar");
  
      setTimeout(() => {
        window.location.href = "/sign-in";
      }, 800);
  
    } catch (err) {
      setSuccess("");
      setError(err.message);
    }
  };
  
  return ( 
    <div className="flex min-h-screen">
      <div className="flex w-1/2 h-screen">
        <div className="relative w-full">
          <img
            src="/auth/shopping-bags.jpg"
            alt=""
            className="w-full h-full object-cover opacity-95"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#1447E6] to-[#312C85]/70" />

          <div className="absolute inset-0 z-10 p-12 text-white">
            <div className="flex flex-col justify-between h-full">
                <div className="flex items-center gap-4">
                <div className="bg-white/20 w-9 h-9 rounded-xl flex items-center justify-center">B</div>
                <span className="font-bold">BeliMudah</span>
              </div>

              <div className="w-xs flex flex-col gap-6">
                <div className="font-bold text-[32px]">Belanja lebih mudah, hidup lebih praktis</div>
                <div className="text-lg">Ribuan produk pilihan dengan harga terbaik, pengiriman cepat, dan <br />pembayaran yang aman.</div>
                <div className="flex gap-8">
                  <div>
                    <div className="text-xl font-bold">10Rb+</div>
                    <span className="text-xs">Produk</span>
                  </div>

                  <div>
                    <div className="text-xl font-bold">500Rb+</div>
                    <span className="text-xs">Pelanggan</span>
                  </div>

                  <div>
                    <div className="text-xl font-bold">4.8★</div>
                    <span className="text-xs">Rating</span>
                  </div>
                </div>
              </div>

              <div>© 2026 BeliMudah. Seluruh hak cipta dilindungi.</div>
            </div>
            
          </div>
        </div>
        
      </div>
      <div className="flex flex-col w-1/2 gap-4 bg-white max-h-screen lg:py-20 px-40">
        <div>
          <h1 className="font-bold text-2xl">Masuk ke Akun</h1>
          <span>Belum punya akun? <Link>Daftar gratis</Link></span>
        </div>

        <div className="flex bg-green-500 gap-4">
          <div className="rounded border p-4 flex-1 border-black/20 text-center">Google</div>
          <div className="rounded border p-4 flex-1 border-black/20 text-center">Facebook</div>
        </div>
        {success && (
          <div className="p-3 rounded-xl bg-green-100 text-green-700 border border-green-300">
            {success}
          </div>
        )}
        
        {error && (
          <div className="p-3 rounded-xl bg-red-100 text-red-700 border border-red-300">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="">Nama Lengkap</label>
            <div className="flex p-4 border border-black/20 rounded-xl items-center gap-2">
              <Mail size={20}/>
              <input name="full_name"  className="w-full h-full" type="text" placeholder="Nama Lengkap kamu"/>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="">Email</label>
            <div className="flex p-4 border border-black/20 rounded-xl items-center gap-2">
              <Mail size={20}/>
              <input name="email" className="w-full h-full" type="text" placeholder="@email.contoh.com"/>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="">Kata Sandi</label>
            <div className="flex p-4 border border-black/20 rounded-xl items-center gap-2">
              <Mail size={20}/>
              <input name="password" className="w-full h-full" type="text" placeholder="Nama Lengkap kamu"/>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="">Kata Sandi</label>
            <div className="flex p-4 border border-black/20 rounded-xl items-center gap-2">
              <Mail size={20}/>
              <input name="confirmPassword" className="w-full h-full" type="text" placeholder="Nama Lengkap kamu"/>
            </div>
          </div>
          
          <div className="flex gap-2">
            <input type="checkbox" />
            <span>Ingat saya selama 30 hari</span>
          </div>
          <button className="text-center bg-blue-500 w-full p-4 rounded-xl text-white" type="submit">Daftar Sekarang</button>
        </form>

        <div className="text-center">
          <div>Login aman dengan enskripsi SSL 256-bit</div>
          <div>Dengan masuk, kamu menyetujui Syarat & Ketentuan dan Kebijakan Privasi kami.</div>
        </div>

      </div>
    </div>
  )
}