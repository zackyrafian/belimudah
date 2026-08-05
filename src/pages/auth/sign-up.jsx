import { Mail, Lock, User } from "lucide-react"
import { Link, useNavigate } from "react-router"
import { AuthService } from "@/services/auth.service"
import Alert from "@/components/ui/alert"
import { useAlert } from "@/hooks/useAlert"
import { FaGoogle, FaFacebook } from "react-icons/fa"
import { useForm } from 'react-hook-form'
import Input from "@/components/ui/input"

const RegisterForm = [
  {
    label: "Nama Lengkap",
    name: "fullname",
    placeholder: "Nama Lengkap kamu",
    type: "text",
    icon: User,
  },
  {
    label: "Email",
    name: "email",
    placeholder: "@email.contoh.com",
    type: "email",
    icon: Mail,
  },
  {
    label: "Kata Sandi",
    name: "password",
    placeholder: "Password",
    type: "password",
    icon: Lock,
  },
  {
    label: "Konfirmasi Password",
    name: "confirmPassword",
    placeholder: "Confirm Password",
    type: "password",
    icon: Lock,
  },
];

export default function SignUpPage() {
  const { alert, showError, showSuccess, clearAlert } = useAlert();
  const { register, handleSubmit } = useForm(); 
  const navigate = useNavigate()

  const onSubmit = async (data) => { 
    try { 
      await AuthService.register(data); 
      showSuccess("You have successfully signed in.")
      setTimeout(() => { 
        navigate('/sign-in')
      }, [500])
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
      <div className="lg:w-1/2 md:w-1/2 md:flex hidden max-h-screen lg:flex">
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
      <div className="
          flex flex-col
          w-full md:w-1/2 lg:w-1/2
          justify-center gap-4
          bg-white
          min-h-screen
      
          px-6
          sm:px-8
          md:px-12
          lg:px-16
          xl:px-24
      
          py-10
          md:py-14">
        <div>
          <h1 className="font-bold text-2xl">Masuk ke Akun</h1>
          <span>Belum punya akun? <Link to={'/sign-in'}>Daftar gratis</Link></span>
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
          {RegisterForm.map((field) => ( 
            <Input
              key={field.name}
              {...field}
              register={register}
            />
          ))}
          <div className="flex gap-2">
            <input type="checkbox" />
            <span className="text-xs">Ingat saya selama 30 hari</span>
          </div>
          <button className="text-center bg-blue-500 w-full py-3 px-4 rounded-xl text-white" type="submit">Daftar Sekarang</button>
        </form>

        <div className="text-center text-xs">
          <div>Login aman dengan enskripsi SSL 256-bit</div>
          <div>Dengan masuk, kamu menyetujui Syarat & Ketentuan dan Kebijakan Privasi kami.</div>
        </div>

      </div>
    </div>
  )
}