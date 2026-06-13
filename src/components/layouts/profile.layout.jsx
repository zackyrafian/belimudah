import { ArrowRight, Heart } from "lucide-react"
import { MainLayout } from "../../components/layouts"
import { Link } from "react-router"


const listElement = [
  {
    title: "Pesanan Saya",
    href: "/profile",
    icon: <Heart size={16} />,
  },
  {
    title: "Wishlist",
    href: "/profile/wishlist",
    icon: <Heart size={16} />,
  },
  {
    title: "Alamat",
    href: "/profile/address",
    icon: <Heart size={16} />,
  },
];

export default function ProfileLayout({children}) { 
  return (
    <MainLayout>
      <div className="flex flex-row gap-8">
        <div className="w-1/5 flex flex-col gap-4">
          <div className="flex flex-col gap-2 rounded-xl items-center justify-center bg-white border-black/20 p-4">
            <div className="rounded-full w-16 h-16 bg-blue-500 flex justify-center items-center">B</div>
            <div>Budi Santoso</div>
            <div>budi@email.com</div>
          </div>

          <div className="bg-white rounded-xl flex flex-col gap-1">
            {listElement.map((item) => { 
              return(
              <Link key={item.href} to={item.href} className="flex items-center text-sm justify-between px-4 py-3.5 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-2">
                  {item.icon} 
                  <span>{item.title}</span>
                </div>
                <ArrowRight size={16}/>
              </Link>
              )
            })}
          </div>
        </div>
        <div className="flex-1">
          {children}
        </div>
      </div>
    </MainLayout>
  )
}