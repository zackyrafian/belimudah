import { UserStorage } from "../services/user.service";

const handleRegister = (e) => {
  try {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());
    let temp = JSON.parse(localStorage.getItem("account") || "[]");

    if (temp.some(account => account.email === data.email)) { 
      throw new Error("Email sudah di gunakan")
    }
    if (data.password !== data.confirmPassword) {
      throw new Error("Password tidak sama")
    }

    const newAccount = { 
      fullname: data.fullname, 
      email: data.email, 
      password: data.password, 
      phone_number: null,
      shipping_address: null,
      cart: [], 
      wishlist: [], 
    }

    temp.push(newAccount);
    localStorage.setItem("account", JSON.stringify(temp));
    alert("Berhasil daftar");
    window.location.href = '/sign-in'
  } catch (error){
    alert(error.message);
  }
};

const handleLogin = (e) => { 
  try { 
    e.preventDefault(); 
    const listAccounts = UserStorage.getAccounts();
    const form = new FormData(e.target); 
    const data = Object.fromEntries(form.entries());

    const existing = listAccounts.find((account) => account.email === data.email); 
    if (!existing) { 
      throw new Error("Email tidak terdaftar"); 
    }

    if (existing.password !== data.password) { 
      throw new Error("Password salah"); 
    }

    UserStorage.syncUser(); 
    console.log("Account tersedia dan berhasil masuk."); 
    localStorage.setItem("user", JSON.stringify(existing))
    window.location.href = '/';
  } catch (error) { 
    alert(error.messsage);
  }
}


export function useAuth() { 
  return {
    handleRegister,
    handleLogin,
  }
}