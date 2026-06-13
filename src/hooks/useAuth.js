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


export function useAuth() { 
  return {
    handleRegister,
  }
}