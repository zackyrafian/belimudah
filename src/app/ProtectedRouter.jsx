import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router";

export default function ProtectedRouter() { 
  const { user } = useAuth(); 
  
  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }
  
  return <Outlet />;
}