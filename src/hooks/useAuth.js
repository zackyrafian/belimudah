import { useSelector } from "react-redux";

export function useAuth() {
  const user = useSelector((state) => state.auth.auth);
  
  return {
    user,
    isAuthenticated: !!user,
  };
}