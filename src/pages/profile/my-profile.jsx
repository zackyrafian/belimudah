import { formatIDR, formatDate } from "@/utils/format";
import { Card } from "../../components";
import { useNavigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { ImageOff, ScanEye } from "lucide-react";


const API = import.meta.env.VITE_SERVER_URL

export default function MyProfile() { 
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [modalPreview, setModalPreview] = useState(false);

  console.log(selectedOrder.items);
  const [orders, setOrders] = useState([]); 
  useEffect(() => { 
    const fetchData = async () => { 
      const res = await fetch(`${API}/users/orders`, { 
        headers: { Authorization: `Bearer ${user.token}` }
      })
      const data = await res.json(); 
      setOrders(data.results);
    }
    fetchData();
  }, [])
  
  return (
    <div className="flex flex-col gap-4">
      {modalPreview && ( 
        <div className="fixed w-full z-50 inset-0 bg-black/20 items-center flex justify-center" onClick={() => setModalPreview(false)}>
          <div className="" onClick={(e) => e.stopPropagation()}>
            <Card className="w-6xl flex flex-col gap-4">
              <div className="flex gap-2 items-center">
                <ScanEye size={24} />
                <h1 className="text-xl font-medium">Berikan Preview</h1>
              </div>
              {selectedOrder.items.map((item) => ( 
                <div key={item.id} className="flex flex-col">
                  <div className="flex gap-2 items-center">
                    {item.product_image ? ( 
                      <div className="bg-black w-12 h-12 "></div> 
                    ) : (
                      <div className="bg-black w-12 h-12 "></div> 
                    )}
                    <h1>{item.product_name}</h1>
                  </div>
                </div>
              ))}
            </Card>
          </div>
        </div>
      )}
      <span className="text-2xl">Pesanan Saya</span>

      {orders?.map((order, i) => (
        <Card key={i} className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <span className="font-bold">#{order?.id}</span>
              <span className="text-xs">{formatDate(order.created_at)}</span>
            </div>
            <div className="bg-blue-500 text-white px-2 font-medium text-xs rounded-l-xl py-0.5 rounded-r-xl">{order.status}</div>
          </div>

          {order.items?.map((item) => ( 
            <div onClick={() => navigate(`/product/${item.product_name.toLowerCase().replaceAll(' ', ('-'))}`)} className="flex gap-4 cursor-pointer">
              <div className="w-12 h-12 rounded-md overflow-hidden">
                {item.images ? (
                  <img src={item.images} alt="headphone" />
                ) : <div className='w-full h-full bg-gray-200 text-gray-400 rounded-xl flex items-center justify-center'>
                  <ImageOff size={14}/>
                </div>}
              </div>
              <div className="flex flex-col">
                <span className="text-sm">{item.product_name}</span>

                <span className="text-sm">x{item?.quantity} · {formatIDR(item?.price)}</span>
              </div>
            </div>
          ))}
          
  
          <div className="flex justify-between items-center border-t-black/20 border-t pt-4">
            <div>Total: <span className="text-blue-500">{formatIDR(order.total_price)}</span></div>
            <div className="flex gap-2 text-sm">
              <button className="border border-blue-500 text-blue-500 rounded-xl py-1.5 px-4 ">Lacak</button>
              {order.status === "DONE" && ( 
                <button onClick={() => { 
                  setModalPreview(true); 
                  setSelectedOrder(order)
                }} className="border bg-blue-500  text-white not-first:border-blue-500 rounded-xl py-1.5 px-4">Beri Ulasan</button>
              )}
              <button className="border border-black/40 text-black/70 rounded-xl py-1.5 px-4">Beli Lagi</button>
            </div>
          </div>
        </Card>
      ))}
      
    </div>
  )
}