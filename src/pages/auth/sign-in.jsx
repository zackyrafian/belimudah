import { AlertTriangle, Lock, Mail } from "lucide-react"
import { Link, UNSAFE_NavigationContext, useNavigate } from "react-router"
import { AuthService } from "@/services/auth.service";
import { useAlert } from "@/hooks/useAlert";
import Alert from "@/components/ui/alert";

export default function SignIn () { 
  const navigate = useNavigate(); 
  const { alert, showSuccess, showError, clearAlert } = useAlert();

  const handleSubmit = (e) => { 
    e.preventDefault(); 
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try { 
      AuthService.login(data);
      showSuccess("You have successfully signed in.")
      setTimeout(() => { 
      navigate('/')
      }, [1000])
    } catch (err) { 
      showError(err.message);
    }
  }
  return ( 
    <div className="flex min-h-screen">
      {alert && ( 
        <Alert
          title={"Sign In"}
          key={new Date} 
          type={alert.type} 
          message={alert.message}
          onClose={() => clearAlert()}
        />
      )}
      <div className="lg:flex hidden w-1/2 min-h-screen">
        <div className="relative w-full">
          <img
            src="/auth/she-flexing.jpg"
            alt="wanita-flexing"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#1A73E8]/70 to-[#193CB8]/70" />
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
      <div className="flex flex-col w-full lg:w-1/2 gap-4 bg-white xl:px-40 lg:py-20 lg:px-20 px-20 justify-center">
        <div>
          <h1 className="font-bold text-2xl">Masuk ke Akun</h1>
          <span>Belum punya akun? <Link>Daftar gratis</Link></span>
        </div>

        <div className="flex gap-4">
          <div className="rounded-xl border p-4 flex-1 border-black/20 text-center">Google</div>
          <div className="rounded-xl border p-4 flex-1 border-black/20 text-center">Facebook</div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <div className="flex p-4 border border-black/20 rounded-xl items-center gap-2">
              <Mail size={20}/>
              <input name="email" className="w-full h-full outline-none" type="text" placeholder="email@contoh.com"/>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex justify-between">
              <label htmlFor="">Password</label>
              <Link to={"/forget-password"} className="text-blue-500">Lupa kata sandi?</Link>
            </div>
            <div className="flex p-4 border border-black/20 rounded-xl items-center gap-2">
              <Lock size={20}/>
              <input name="password" className="w-full h-full outline-none" type="password" placeholder="Masukan kata sandi"/>
            </div>
          </div>
          
          <div className="flex gap-2">
            <input type="checkbox" />
            <span>Ingat saya selama 30 hari</span>
          </div>
          <button className="text-center bg-blue-500 w-full p-4 rounded-xl text-white" type="submit">Masuk</button>
        </form>

        <div className="text-center">
          <div>Login aman dengan enskripsi SSL 256-bit</div>
          <div>Dengan masuk, kamu menyetujui Syarat & Ketentuan dan Kebijakan Privasi kami.</div>
        </div>

      </div>
    </div>
  )
}