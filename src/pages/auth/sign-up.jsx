import { Mail, Lock, User } from "lucide-react"
import { Link } from "react-router"
import { AuthService } from "@/services/auth.service"
import Alert from "@/components/ui/alert"
import { useAlert } from "@/hooks/useAlert"
import { FaGoogle, FaFacebook } from "react-icons/fa"
import { useForm } from 'react-hook-form'

export default function SignUpPage() {
  const { alert, showError, showSuccess, clearAlert } = useAlert();
  const { register, handleSubmit } = useForm(); 

  const onSubmit = (data) => { 
    try { 
      AuthService.register(data); 
      showSuccess("You have successfully signed in.")
    } catch (err) { 
      showError(err.message);
    }
  }
  
  return ( 
    <div className="flex min-h-screen">
      {alert && (
        <Alert
          title={"Register"}
          key={new Date}
          type={alert.type}
          message={alert.message}
          onClose={() => clearAlert()}
        />
      )}
      <div className="lg:w-1/2 hidden max-h-screen lg:flex">
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
                <Link to={'/'} className="font-bold">BeliMudah</Link>
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
      <div className="flex flex-col lg:w-1/2 gap-4 bg-white max-h-screen justify-center xl:px-40 lg:py-20 lg:px-20 px-20 w-full">
        <div>
          <h1 className="font-bold text-2xl">Masuk ke Akun</h1>
          <span>Belum punya akun? <Link>Daftar gratis</Link></span>
        </div>

        <div className="flex gap-2">
          <div className="flex gap-4 text-center rounded-xl border px-4 py-2 flex-1 border-black/20 items-center justify-center">
            <FaGoogle/>
            <span>Google</span>
          </div>
          <div className="flex min-w-1/2 gap-4 items-center justify-center rounded-xl border py-2 flex-1 border-black/20 text-center">
           <FaFacebook/>
            <span>Facebook</span>
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="">Nama Lengkap</label>
            <div className="flex p-4 border border-black/20 rounded-xl items-center gap-2">
              <User className="text-gray-500" size={20}/>
              <input {...register('fullname')} className="w-full h-full outline-none" type="text" placeholder="Nama Lengkap kamu"/>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="">Email</label>
            <div className="flex p-4 border border-black/20 rounded-xl items-center gap-2">
              <Mail className="text-gray-500" size={20}/>
              <input {...register('email')} className="w-full h-full outline-none" type="text" placeholder="@email.contoh.com"/>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="">Kata Sandi</label>
            <div className="flex px-4 py-3 border border-black/20 rounded-xl items-center gap-2">
              <Lock className="text-gray-500" size={20}/>
              <input {...register('password')} className="w-full h-full outline-none" type="password" placeholder="Password"/>
            </div>
          </div>

          <div className="flex flex-col gap-1 text-sm">
            <label htmlFor="">Kata Sandi</label>
            <div className="flex px-4 py-3 border border-black/20 rounded-xl items-center gap-2">
              <Lock className="text-gray-500" size={20}/>
              <input {...register('confirmPassword')} className="w-full h-full outline-none" type="password" placeholder="Confirm Password"/>
            </div>
          </div>
          <div className="flex gap-2">
            <input type="checkbox" />
            <span>Ingat saya selama 30 hari</span>
          </div>
          <button className="text-center bg-blue-500 w-full p-4 rounded-xl text-white" type="submit">Daftar Sekarang</button>
        </form>

        <div className="text-center text-xs">
          <div>Login aman dengan enskripsi SSL 256-bit</div>
          <div>Dengan masuk, kamu menyetujui Syarat & Ketentuan dan Kebijakan Privasi kami.</div>
        </div>

      </div>
    </div>
  )
}