import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/hooks/useAuth";

export default function ProctedCheckoutRouter() {
  const { user } = useAuth();
  if (!user.cart || user.cart.length === 0) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
}