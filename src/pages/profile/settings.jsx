import { ArrowLeft, Edit } from "lucide-react";
import { Card } from "../../components";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useRef } from "react";

const API = import.meta.env.VITE_SERVER_URL

export default function ProfileSetting() {
  const { user } = useAuth();
  const [viewMode, setViewMode] = useState('profile');
  const [userData, setUserData] = useState();
  const photoRef = useRef(null);
  const [formData, setFormData] = useState({})
  const [prewviewPhoto, setPreviewPhoto] = useState(null);
  
  useEffect(() => { 
    const fetchData = async () => { 
      try { 
        const res = await fetch(`${API}/users/profile`, { 
          headers: {
            Authorization: `Bearer ${user.token}`
          },
        }); 
        const data = await res.json(); 
        console.log(data.result)
        setUserData(data.result)
        setFormData(data.result)
      } catch (error) { 
        console.log(error.message)
      }
    }
    fetchData();
  }, [])

  const handlePhotoChange = (e) => { 
    const file = e.target.files[0]; 
    if (!file) return; 
    setPreviewPhoto(URL.createObjectURL(file))
  } 

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => { 
    e.preventDefault(); 

    const changes = Object.keys(formData).reduce((acc, key) => {
      if (formData[key] !== userData[key]) {
        acc[key] = formData[key];
      }
      return acc;
    }, {});

    const photoFile = photoRef.current?.files[0];
    const payload = new FormData();

    if (!photoFile && Object.keys(changes).length === 0) { 
      return;
    }

    Object.entries(changes).forEach(([key, value]) => { 
      payload.append(key, value)
    })
    if (photoFile) { 
      payload.append('picture', photoFile)
    }

    try { 
      const res = await fetch(`${API}/users/profile`, {
        method: 'PATCH', 
        headers: {
          Authorization: `Bearer ${user.token}`
        },
        body: payload, 
      })
      setUserData(prev => ({ ...prev, ...changes}))
      const data = await res.json();
      console.log(data);
    } catch (error) { 
      console.log("FAILED", error)
    }
  }
  console.log(prewviewPhoto)
  // console.log(`${API}/${userData?.image_profile}`)
  return (
    <div>
      {viewMode === 'profile' ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex justify-between">
            <h1 className="text-2xl">Pengaturan Profile</h1>
            <button type="submit" className="flex gap-2 border rounded-xl border-black/20 bg-white px-4 py-1 items-center text-sm justify-center">
              <Edit size={14} />
              <span>Simpan</span>
            </button>
          </div>

          <Card className="flex flex-col gap-4 text-sm">
            <div className="flex items-center gap-4">
              {/* <div className="rounded-full w-20 h-20 bg-fuchsia-100 flex items-center justify-center"></div>*/}
              <div onClick={() => {
                photoRef.current.click();
              }} className="rounded-full w-20 h-20 items-center bg-blue-500 justify-center flex overflow-hidden">
                {prewviewPhoto ? (
                  <img src={prewviewPhoto} alt="preview" className="w-full h-full object-cover" />
                ) : userData?.image_profile ? (
                  <img src={`${API}/${userData.image_profile}`} alt="profile" className="w-full h-full object-cover" />
                ) : (
                      <span className="text-2xl font-bold text-white">{userData?.fullname[0]}</span>
                )}
                
                <input className="hidden" ref={photoRef} type="file" accept="image/*" onChange={handlePhotoChange}/>
              </div>
              <span>Ganti Foto Profile</span>
            </div>

            <div className="flex flex-col w-full gap-1">
              <label htmlFor="">Nama Lengkap</label>
              <input onChange={handleChange} name="full_name" defaultValue={formData.fullname || ''} type="text" className="border border-black/20 rounded-xl py-3 px-4" />
            </div>

            <div className="flex flex-col w-full gap-1">
              <label htmlFor="">Email</label>
              <input onChange={handleChange} name="email" defaultValue={formData.email || ''} type="text" className="border border-black/20 rounded-xl py-3 px-4" />
            </div>

            <div className="flex flex-col w-full gap-1">
              <label htmlFor="">No Telepon</label>
              <input onChange={handleChange} defaultValue={formData.phone_number || ''} name="phone_number" type="text" className="border border-black/20 rounded-xl py-3 px-4" />
            </div>

            <div className="flex flex-col w-full gap-1">
              <label htmlFor="">Tanggal Lahir</label>
              <input onChange={handleChange} defaultValue={formData.date_of_birth ?? ''} name="date_of_birth" type="date" className="border border-black/20 rounded-xl py-3 px-4" />
            </div>

            <div className="flex flex-col w-full gap-1">
              <label htmlFor="gender">Jenis Kelamin</label>
              <div className="relative w-full">
                <select
                  id="gender"
                  name="gender"
                  onChange={handleChange}
                  defaultValue={formData.gender || ''}
                  className="w-full appearance-none border border-black/20 rounded-xl py-3 px-4 pr-10 bg-white"
                >
                  <option value="">Select Gender</option>
                  <option value="laki-laki">Laki Laki</option>
                  <option value="perempuan">Perempuan</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
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