import { Heart, ShoppingCart, Tag, Trash2 } from 'lucide-react'
import { formatIDR } from '@/utils/format';
import { MainLayout } from '@/components/layouts';
import { Link } from 'react-router';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';

const API = 'http://localhost:2222';

export default function CartPage() {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);

  useEffect(() => { 
    if (!user?.token) return;
    fetch(`${API}/users/cart`, { 
      headers: { Authorization: `Bearer ${user.token}` }
    })
      .then(res => res.json())
      .then(data => setCart(data.results || []))
      .catch(err => console.error(err));
  }, [user]);

  const handleDelete = async (cartId) => {
    try {
      const res = await fetch(`${API}/users/cart/${cartId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${user.token}` }
      });
      if (res.ok) {
        setCart(prev => prev.filter(item => item.id !== cartId));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleQuantity = async (cartId, newQty) => {
    if (newQty < 1) return;
    try {
      const res = await fetch(`${API}/users/cart/${cartId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ quantity: newQty })
      });
      if (res.ok) {
        setCart(prev => prev.map(item => item.id === cartId ? { ...item, quantity: newQty } : item));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const priceTotal = cart.reduce((sum, product) => sum + Number(product.price) * product.quantity, 0);

  return (
    <MainLayout className="flex flex-col">
      {cart.length === 0 ? (
      
      <div className='gap-4 p-50 flex flex-col items-center justify-center text-gray-500'>
          <div><ShoppingCart size={120}/></div>
          <div className='flex gap-2 flex-col text-center'>
            <h1 className='text-2xl font-bold text-black'>Your cart is empty!</h1>
            <h1>Look like you have added anying to your cart yet</h1>
          </div>
          <Link to={'/'} className='bg-blue-500 rounded-xl px-4 text-white text-sm p-2 '>Start Shopping</Link>
        </div>
      ) : (
      <div className='w-7xl m-auto flex flex-col gap-4 pt-4'>
        <div className='text-2xl'>Shopping Cart ({cart.length})</div>
        <div>
          <div className='flex gap-8 items-start'>
            <div className='flex w-full flex-col gap-4'>
              {cart.map((product) => (
                <div key={product.id} className='shadow-sm flex w-full bg-white border-black/20 border p-4 gap-4 rounded-xl'>
                  <div className='w-24 h-24'>
                    <img className='rounded-xl' src={product.images?.[0]} alt="headphone" />
                  </div>
                  <div className='flex flex-col gap-1 flex-1'>
                    <div className='flex justify-between items-center'>
                      <span className='text-sm font-medium'>{product.name}</span>
                      <button onClick={() => handleDelete(product.id)}><Trash2 size={16} /></button>
                    </div>
  
                    <div>
                      <span className='text-sm'>{product.variant}</span>
                    </div>
  
                    <div className='flex items-center justify-between'>
                      <div className='border border-black/20 flex px-4 py-1 gap-4 rounded-xl items-center'>
                        <button className='w-6 text-center' onClick={() => handleQuantity(product.id, product.quantity - 1)}>-</button>
                        <span className='w-6 text-center'>{product.quantity}</span>
                        <button className='w-6 text-center' onClick={() => handleQuantity(product.id, product.quantity + 1)}>+</button>
                      </div>
                      <span>{ formatIDR(Number(product.price))}</span>
                    </div>
  
                    <div className='flex items-center gap-1 pt-2'>
                      <Heart size={12} />
                      <span className='text-xs'>Simpan ke wishlist</span>
                    </div>
                  </div>
                </div>
              ))}

              <div className='shadow-sm flex flex-col w-full border-black/20 border bg-white p-4 gap-4 rounded-xl'>
                <div className='flex gap-2 items-center'>
                  <Tag size={16} />
                  <span>Kode Promo</span>
                </div>

                <div className='flex gap-2'>
                  <div className='flex-1 bg-black/5 rounded-xl border border-black/20'>
                    <input className='w-full px-4 py-3.5 rounded-xl' type="text" placeholder='Masukan kode promo' />
                  </div>
                  <button className='bg-blue-500 rounded-xl px-6 text-white'>Terapkan</button>
                </div>

              </div>
            </div>

            <div className='shadow-sm text-sm flex gap-4 flex-col w-[45%] bg-white p-4 rounded-xl border border-black/20'>
              <span className='text-lg font-medium'>Ringkasan Pesanan</span>

              <div className='flex-col flex gap-2'>
                {cart.map((product) => (
                  <div className='flex justify-between'>
                    <span className='text-xs'>{product.name} x {product.quantity}</span>
                    <span className='text-xs'>{formatIDR(product.price * product.quantity)}</span>
                  </div>
                ))}
               

                <div className='text-xs flex justify-between border-b pb-4 border-b-black/20'>
                  <span>Ongkir Kirim</span>
                  <span>Gratis</span>
                </div>

                <div className='flex justify-between pt-2'>
                  <span>Total</span>
                  <span>{formatIDR(priceTotal)}</span>
                </div>
              </div>

              <button onClick={() => location.href = "/checkout/address"} className='cursor-pointer text-white bg-blue-500 border gap-2 text-sm items-center flex justify-center px-4 py-3  rounded-xl'>
                {/* <Shield size={16}/>*/}
                <span>Place Order</span>
              </button>

              {/* <div className='flex flex-col text-center text-sm'>
                <span>Pembayaran 100% Aman</span>
                <span> Metode: Transfer Bank · Virtual Account · Kartu Kredit · e-Wallet</span>
              </div>*/}
            </div>
          </div>
        </div>
      </div>
      )}
    </MainLayout>
  )
}
