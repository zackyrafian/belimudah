import { ArrowLeft, Edit } from "lucide-react";
import { Card } from "../../components";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function ProfileSetting() {
  const { user } = useAuth();
  const [viewMode, setViewMode] = useState('profile');
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    console.log(data);
  }
  return (
    <div>
      {viewMode === 'profile' ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex justify-between">
            <h1 className="text-2xl">Pengaturan Profile</h1>
            <button type="submit" className="flex gap-2 border rounded-xl border-blue-400 px-4 py-2 items center text-sm">
              <Edit />
              <span>Simpan</span>
            </button>
          </div>

          <Card className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="rounded-full w-20 h-20 bg-fuchsia-100 flex items-center justify-center">B</div>
              <span>Ganti Foto Profile</span>
            </div>

            <div className="flex flex-col w-full gap-1">
              <label htmlFor="">Nama Lengkap</label>
              <input name="full_name" defaultValue={user.fullname} type="text" className="border border-black/20 rounded-xl py-3 px-4" />
            </div>

            <div className="flex flex-col w-full gap-1">
              <label htmlFor="">Email</label>
              <input name="email" defaultValue={user.email} type="text" className="border border-black/20 rounded-xl py-3 px-4" />
            </div>

            <div className="flex flex-col w-full gap-1">
              <label htmlFor="">No Telepon</label>
              <input name="phone_number" type="text" className="border border-black/20 rounded-xl py-3 px-4" />
            </div>

            <div className="flex flex-col w-full gap-1">
              <label htmlFor="">Tanggal Lahir</label>
              <input name="date_of_birth" type="date" className="border border-black/20 rounded-xl py-3 px-4" />
            </div>

            <div className="flex flex-col w-full gap-1">
              <label htmlFor="">Jenis Kelamin</label>
              <select id="gender" name="gender" className="border border-black/20 rounded-xl py-3 px-4">
                <option value="">Select Gender</option>
                <option value="laki-laki">Laki Laki</option>
                <option value="perempuan">Perempuan</option>
              </select>
            </div>
          </Card>


          <Card className="flex flex-col gap-2">
            <span className="font-bold">Keamanan Akun</span>
            <span onClick={() => setViewMode('change-password')} className="cursor-pointer text-xs text-blue-500">Ubah Kata Sandi</span>
            <span className="text-xs text-blue-500">Aktifkan Verifikasi 2 Langkah</span>
          </Card>
        </form>
      ) : (
        <div className="flex flex-col gap-4">
          <div onClick={() => setViewMode('profile')} className="flex gap-2 items-center text-xs text-gray-700 cursor-pointer">
            <ArrowLeft size={14} />
            <span>Back Profile Setting</span>


          </div>
          <Card className="flex flex-col gap-4">
            <div className="flex flex-col w-full gap-1">
              <label htmlFor="">Password Lama</label>
              <input name="phone_number" type="text" className="border border-black/20 rounded-xl py-3 px-4" />
            </div>

            <div className="flex flex-col w-full gap-1">
              <label htmlFor="">Password Baru</label>
              <input name="phone_number" type="text" className="border border-black/20 rounded-xl py-3 px-4" />
            </div>

            <div className="flex flex-col w-full gap-1">
              <label htmlFor="">Confirm Password Baru</label>
              <input name="phone_number" type="text" className="border border-black/20 rounded-xl py-3 px-4" />
            </div>

            <button className="bg-blue-500 p-2 rounded-xl text-white">Save Password</button>
          </Card>

        </div>
      )}
    </div>
  )
}