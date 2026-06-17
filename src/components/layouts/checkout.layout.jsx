import { Outlet } from "react-router";
import Card from "../card";
import MainLayout from "./main.layout";
import { UserStorage } from "@/services/user.service";

export default function CheckoutLayout() {
  const { cart } = UserStorage.getCart();
  
  return (
    <MainLayout>
      <div className="flex gap-4 items-start" >
        <Card className="flex-1">
          <Outlet/>
        </Card>
        <Card className="w-1/4 flex-col gap-2 flex text-sm sticky top-0">
          <h3 className="text-lg">Ringkasan Pesan</h3>
          {cart.product.map((item) => (
            <div className="flex justify-between items-center pb-2">
              <div className="flex gap-2 items-center">
                <div className="w-10 h-10 rounded-lg overflow-hidden">
                  <img src="/headphone.png" alt="" />
                </div>
                <span className="text-xs">{item.name}</span>
              </div>
              <div>
                <span>x1</span>
              </div>
            </div>
          ))}
          {/* <div className="flex justify-between items-center pb-2">
            <div className="flex gap-2 items-center">
              <div className="w-10 h-10 rounded-lg overflow-hidden">
                <img src="/headphone.png" alt="" />
              </div>
              <span className="text-xs">Headphone Wireless Premium</span>
            </div>
            <div>
              <span>x1</span>
            </div>
          </div>*/}
         
          <div className="flex flex-col gap-2  border-t border-t-black/20 pt-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>Rp 450.000</span>
            </div>
            <div className="flex justify-between border-b border-b-black/20 pb-2">
              <span>Ongkir</span>
              <span>Gratis</span>
            </div>
            <div className="flex justify-between pt-1 pb-4">
              <span>Total</span>
              <span>Rp 450.000</span>
            </div>
          </div>
          <div className="text-center text-xs">
            <span>Pembayaran aman dan terenkripsi</span>
          </div>
        </Card>
      </div>
    </MainLayout> 
  )
}