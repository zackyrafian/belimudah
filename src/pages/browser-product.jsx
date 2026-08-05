import { Star, } from 'lucide-react'
import { useState, useEffect } from 'react'
import ProductCard from '@/components/product-card'
import { MainLayout } from '@/components/layouts'
import { useSearchParams } from 'react-router'

const API = 'http://localhost:2222'

export default function BrowserProductPage(){
  const [products, setProducts] = useState([])
  const [limit, setLimit] = useState(12); 
  const [params] = useSearchParams();
  const search = params.get('search') || '';
  const category = params.get('category') || '';

  useEffect(() => {
    const query = new URLSearchParams()
    if (search) query.set('search[name]', search)
    if (category) query.set('search[category]', category)
    fetch(`${API}/products?${query.toString()}`)
      .then(res => res.json())
      .then(json => setProducts(json.results || []))
      .catch(err => console.error(err))
  }, [search, category])

  const filteredProducts = products;

  return (
    <MainLayout>
      <div className="flex flex-col">
        <div className='w-7xl m-auto flex flex-row gap-8'>
          <aside className='w-1/5 flex flex-col gap-4'>
            <div className='flex flex-col gap-4'>
              <h3 className='text-xl font-semibold'>Harga</h3>
              <div className='flex justify-between'>
                <span>Rp 0</span>
                <span>Rp 20.000.000</span>
              </div>
            </div>
  
            <div className='flex flex-col gap-4'>
              <h3 className='text-xl font-semibold'>Merek</h3>
              <div className='flex flex-col gap-1'>
                <div className='flex gap-2 items-center'>
                <input type="checkbox" />
                <span>TechMaster</span>
                </div>
                <div className='flex gap-2 items-center'>
                  <input type="checkbox" />
                  <span>TechMaster</span>
                </div>
                <div className='flex gap-2 items-center'>
                  <input type="checkbox" />
                  <span>TechMaster</span>
                </div>
                <div className='flex gap-2 items-center'>
                  <input type="checkbox" />
                  <span>TechMaster</span>
                </div>
                <div className='flex gap-2 items-center'>
                  <input type="checkbox" />
                  <span>TechMaster</span>
                </div>
                <div className='flex gap-2 items-center'>
                  <input type="checkbox" />
                  <span>TechMaster</span>
                </div>
              </div>
            </div>
  
            <div className='flex flex-col gap-4'>
              <h3 className='text-xl font-semibold'>Rating Minimum</h3>
              
              <div className='flex flex-col gap-1'>
                <div className='flex gap-2 items-center'>
                  <input type="radio" />
                  <div className='flex items-center gap-1'>
                    <div className='flex'>
                      <Star size={12}/>
                      <Star size={12}/>
                      <Star size={12}/>
                      <Star size={12}/>
                    </div>
                    <span>ke atas</span>
                  </div>
                </div>
  
                <div className='flex gap-2 items-center'>
                  <input type="radio" />
                  <div className='flex items-center gap-1'>
                    <div className='flex'>
                      <Star size={12}/>
                      <Star size={12}/>
                      <Star size={12}/>
                      <Star size={12}/>
                    </div>
                    <span>ke atas</span>
                  </div>
                </div>
              </div>
            </div>
  
  
            <div className='flex flex-col gap-4'>
              <h3 className='text-xl font-semibold'>Keserdiaan</h3>
              
              <div className='flex flex-col gap-1'>
                <div className='flex gap-2 items-center'>
                  <input type="checkbox" />
                  <div>
                    <span>Stok tersedia</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
  
          <section className='w-full flex-1 gap-2 flex flex-col'>
            <span>18 produk ditemukan</span>
            <div className='grid grid-cols-4 gap-4'>
            {filteredProducts.slice(0, limit).map((w) => (
                  <ProductCard
                    key={w.id}
                    product={w}
                  />
                ))
              }
            </div>
            {limit < filteredProducts.length && (
              <div className='flex justify-center'>
                <button
                  onClick={() => setLimit(prev => prev + 6)}
                  className="mt-4 self-center border p-4 px-40 rounded-xl"
                >
                  Muat Lebih Banyak
                </button>
              </div>
              
            )}
          </section>
        </div>
      </div>
    </MainLayout>
  )
}
