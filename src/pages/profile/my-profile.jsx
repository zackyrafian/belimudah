import { formatIDR } from "@/utils/format";
import { Card } from "../../components";
import { useNavigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";

export default function MyProfile() { 
  const navigate = useNavigate();
  const { user } = useAuth();

  console.log(user)
  // const { order : orders } = user;
  const [orders, setOrders] = useState([]); 

  useEffect(() => { 
    const fetchData = async () => { 
      const res = await fetch('http://localhost:2222/users/orders', { 
        headers: { Authorization: `Bearer ${user.token}` }
      })
      const data = await res.json(); 
      console.log(data.results)
      setOrders(data.results);
    }
    fetchData();
  })
  
  return (
    <div className="flex flex-col gap-4">
      <span className="text-2xl">Pesanan Saya</span>

      {orders?.map((order, i) => (
        <Card key={i} className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <span className="font-bold">#{order.id}</span>
              <span className="text-xs">20 Mei 2026</span>
            </div>
            <div>Terkirim</div>
          </div>

          {order.cart.map((product) => ( 
            <div onClick={() => navigate(`/product/${product.name.toLowerCase().replaceAll(' ', ('-'))}`)} className="flex gap-4 cursor-pointer">
              <div className="w-12 h-12 rounded-md overflow-hidden">
                <img src={product.images[0]} alt="headphone" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm">{product.name}</span>
                <span className="text-sm">x{product.quantity} · {formatIDR(product.price)}</span>
              </div>
            </div>
          ))}
          
  
          <div className="flex justify-between items-center border-t-black/20 border-t pt-4">
            <div>Total: <span className="text-blue-500">{formatIDR(order.total)}</span></div>
            <div className="flex gap-2">
              <button className="border border-blue-500 text-blue-500 rounded-xl py-1.5 px-4">Lacak</button>
              <button className="border bg-blue-500  text-white not-first:border-blue-500 rounded-xl py-1.5 px-4">Beri Ulasan</button>
              <button className="border border-black/40 text-black/70 rounded-xl py-1.5 px-4">Beli Lagi</button>
            </div>
          </div>
        </Card>
      ))}
      
    </div>
  )
}