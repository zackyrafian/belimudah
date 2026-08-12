import { MainLayout } from "@/components/layouts"
import { Card } from "@/components"
import { MapPin, Truck, CircleCheckBig, ArrowRight, Tags, PackageSearch, GalleryVerticalEndIcon, Search, DollarSign } from "lucide-react"
import { formatIDR } from "@/utils/format";
import { Link } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";

const API = import.meta.env.VITE_SERVER_URL

export default function CheckoutSuccessPage() { 
  const { user } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(order)

  useEffect(() => {
    if (!user?.token) return;
    fetch(`${API}/users/orders`, {
      headers: { Authorization: `Bearer ${user.token}` }
    })
      .then(res => res.json())
      .then(data => {
        const orders = data.results || [];
        setOrder(orders[0] || null);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <span className="text-gray-500">Memuat data pesanan...</span>
        </div>
      </MainLayout>
    );
  }

  if (!order) {
    return (
      <MainLayout>
        <div className="min-h-screen flex gap-4 items-center justify-center flex-col">
          <CircleCheckBig size={64} className="text-gray-400" />
          <h3 className="text-xl font-medium text-gray-600">Data pesanan tidak ditemukan</h3>
          <Link to="/" className="border px-6 py-2 rounded-xl bg-blue-500 text-white">Kembali ke Beranda</Link>
        </div>
      </MainLayout>
    );
  }


  return ( 
    <MainLayout>
      <div className="flex gap-4">
        <Card className="flex-1 flex items-center justify-center flex-col gap-4">
          <CircleCheckBig size={48} />
          <div className="flex flex-col items-center">
            <h1>Pembayaran Berhasil</h1>  
            <span className="text-sm">Terima kasih telah berbelanja di BeliMudah Pesananmu sedang diproses.</span>
          </div>
        </Card>
        <Card className="flex-1 flex flex-col gap-4">
          <div className="flex text-xl font-medium">Detail Pesanan</div>
          <div className="flex gap-2 flex-col">
            <div className="flex justify-between">
              <div className="flex gap-2 items-center">
                <Tags size={18} />
                <h2 className="font-medium text-md">No Pesanan</h2>
              </div>
              <span># {order.id}</span>
            </div>
            
            <div>
              {order.items.map((item) => ( 
                <div className="flex text-sm justify-between">
                  <span className="pl-6">{item.product_name}</span>
                  <span>{formatIDR(item.price)}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between">
              <div className="flex gap-2 items-center">
                <DollarSign size={18} />
                <h2 className="font-medium text-md">Total Pesanan</h2>
              </div>
              <span>{formatIDR(order.total_price)}</span>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex gap-2 items-center ">
                <MapPin size={18} />
                <h1 className="font-medium text-md">Alamat Penerima</h1>
              </div>
              <div className="flex flex-col pl-6">
                <div className="flex gap-2 items-center"> 
                  <span className="text-sm">{order.address.recipient_name}</span>
                  <span className="text-xs">{order.address.phone_number}</span>
                </div>
                <span className="text-xs text-gray-500">{order.address.recipient_address_full}</span>
                <span className="text-xs font text-gray-400">{order.address.recipient_city}, {order.address.recipient_province} - {order.address.zip_code}</span>
              </div>
            </div>
            
            
            <div className="flex gap-2">
              <div className="flex-1 flex justify-center items-center border border-black/20 py-2 px-4 rounded-lg text-xs gap-2">
                <PackageSearch size={16}/>
                <span>Lacak Pesanan</span>
              </div>

              <div className="flex-1 flex justify-center items-center border border-black/20 py-2 px-4 rounded-lg text-xs gap-2">
                <GalleryVerticalEndIcon size={16}/>
                <span>Riwayat Pesanan</span>
              </div>

              <div className="flex-1 flex justify-center items-center border border-black/20 py-2 px-4 rounded-lg text-xs gap-2">
                <Search size={16}/>
                <span>Lanjut Belanja</span>
              </div>
              
              {/* <div className="flex-1 border border-black/20 py-2 px-4 rounded-lg text-xs">Riwayat Pesanan</div>
              <div className="flex-1 border border-black/20 py-2 px-4 rounded-lg text-xs">Lanjut Belanja</div>*/}
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  )
  // return (
  //   <MainLayout>
  //       <div className="min-h-screen flex gap-4 items-center justify-center flex-col">
  //       <div className="w-24 h-24 rounded-full bg-green-200 flex items-center justify-center">
  //         <CircleCheckBig size={48}/>
  //       </div>

  //       <div className="text-2xl">Pembayaran Berhasil</div>
  //       <span>Terima kasih telah berbelanja di BeliMudah. Pesananmu sedang diproses.</span>
  //       <Card className="w-160 p-8 flex flex-col gap-4">
  //         <div>
  //           <div className="flex justify-between">
  //             <span>Nomer Pesanan</span>
  //             <span>Total Pembayaran</span>
  //           </div>
  //           <div className="flex justify-between">
  //             <span>#{order.id}</span>
  //             <span>{formatIDR(order.payment?.total_amount ?? order.total_price)}</span>
  //           </div>
  //         </div>

  //         <div className="flex flex-col gap-2 border-t border-t-black/20 pt-4">
  //           <div className="flex gap-2">
  //             <div className="pt-1.5">
  //               <Truck size={18} />
  //             </div>
  //             <div className="flex flex-col">
  //               <span className="text-sm">JNE Regular</span>
  //               <span className="text-xs">Estimasi tiba: 2-3 Juni 2026</span>
  //             </div>
  //           </div>
  //           <div className="flex gap-2">
  //             <div className="pt-1.5">
  //               <MapPin size={18} />
  //             </div>
  //             <div className="flex flex-col">
  //               <span className="text-sm">Alamat Pengiriman</span>
  //               <span className="text-xs">{order.shipping_address?.recipient_address_full}</span>
  //               <span className="text-xs">{order.shipping_address?.recipient_city}, {order.shipping_address?.recipient_province} - {order.shipping_address?.zip_code}</span>
  //             </div>
  //           </div>
  //         </div>
  //       </Card>

  //       <Card className="w-160 p-8 flex flex-col gap-4">
  //         <h3 className="text-lg">Status Pesanan</h3>
  //         <div>
  //           <div className="flex gap-4 items-center">
  //             <div className="w-9 h-9 bg-green-200 flex items-center justify-center rounded-full p-2">
  //               <CircleCheckBig size={15} />
  //             </div>
  //             <div className="flex flex-col ">
  //               <span>Pesanan Diterima</span>
  //               <span>Baru saja</span>
  //             </div>
  //           </div>
  //         </div>

  //         <div>
  //           <div className="flex gap-4 items-center">
  //             <div className="w-9 h-9 bg-green-200 flex items-center justify-center rounded-full p-2">
  //               <CircleCheckBig size={15} />
  //             </div>
  //             <div className="flex flex-col ">
  //               <span>Pesanan Diterima</span>
  //               <span>Baru saja</span>
  //             </div>
  //           </div>
  //         </div>

  //         <div>
  //           <div className="flex gap-4 items-center">
  //             <div className="w-9 h-9 bg-green-200 flex items-center justify-center rounded-full p-2">
  //               <CircleCheckBig size={15} />
  //             </div>
  //             <div className="flex flex-col ">
  //               <span>Pesanan Diterima</span>
  //               <span>Baru saja</span>
  //             </div>
  //           </div>
  //         </div>

  //         <div>
  //           <div className="flex gap-4 items-center">
  //             <div className="w-9 h-9 bg-green-200 flex items-center justify-center rounded-full p-2">
  //               <CircleCheckBig size={15} />
  //             </div>
  //             <div className="flex flex-col ">
  //               <span>Pesanan Diterima</span>
  //               <span>Baru saja</span>
  //             </div>
  //           </div>
  //         </div>
  //       </Card>

  //       <div className="w-160 flex gap-2">
  //         <div className="flex-1 rounded-xl bg-blue-500 text-white shadow-sm flex items-center justify-center p-3">Lacak Pesanan</div>
  //         <Link to={'/profile'} className="flex-1 rounded-xl border border-black/20 shadow-sm flex items-center justify-center p-3">Lihat Riwayat Pesanan</Link>
  //         <div className="flex-1 rounded-xl text-blue-500 flex items-center justify-center p-3 gap-2">
  //           <span>Lanjut Belanja</span>
  //           <ArrowRight size={14} className="pt-0.5 text-blue-500"/> 
  //         </div>
          
  //       </div>
  //       </div>
        
  //   </MainLayout>
  // )
}


// address
// : 
// id
// : 
// 1
// phone_number
// : 
// "08999993758"
// recipient_address_full
// : 
// "Perumahan Mega Regency Blok D 55 No 24 RT 002 RW 015"
// recipient_city
// : 
// "Bekasi"
// recipient_email
// : 
// "zackyrafianfawwauzy@mail.com"
// recipient_name
// : 
// "Zacky Rafian Fawwauzy"
// recipient_province
// : 
// "Jawa Barat"
// zip_code
// : 
// "17730"