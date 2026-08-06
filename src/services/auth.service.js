
const AuthService = { 
  async register (data) {
    const { fullname, email, password } = data;
    try { 
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/register`, { 
        method: "POST", 
        headers: { 
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({
          fullname, 
          email, 
          password,
        })
      })

      const data = await res.json(); 
      if (!res.ok) { 
        throw new Error(data.message)
      }
    } catch (error) { 
      console.log(error.message)
      throw error
    }
    // const listAccounts = UserStorage.getAccounts() || [];
    // const email = data.email.toLowerCase().trim();
    // if (listAccounts.some(account => account.email === email)) {
    //   throw new Error("This email address is already use.");
    // }
    
    // if (data.password !== data.confirmPassword) {
    //   throw new Error("Passwords do not match");
    // }
    
    // const newAccount = {
    //   fullname: data.fullname,
    //   email,
    //   password: btoa(data.password),
    //   phone_number: null,
    //   shipping_address: [],
    //   cart: [],
    //   wishlist: [],
    // };
    // listAccounts.push(newAccount);
    // localStorage.setItem("account", JSON.stringify(listAccounts));
    // return newAccount;
  },
  async login(data) {
    const { email, password } = data;

    try { 
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/login`, {
        method: "POST", 
        headers: { 
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({ email, password })
      })
      const resData = await res.json()
      
      if (!res.ok) { 
        throw new Error(resData.message)
      }
      const token = resData.data.token
      localStorage.setItem("token", `Bearer ${token}`)
      return resData.data

      // const { token, ...userData } = resData.data
      // localStorage.setItem("token", `Bearer ${token}`)
      // return userData
    } catch (error) { 
      console.log(error.message)
      throw error
    }
  }

  //   const listAccounts = UserStorage.getAccounts() || [];
  //   const email = data.email.toLowerCase().trim();

  //   if (!email || !data.password) {
  //     throw new Error("Please enter both email and password.");
  //   }

  //   const existing = listAccounts.find(account => account.email === email);
  //   if (!existing) { 
  //     throw new Error("No account found with this email address.");
  //   }

  //   if (atob(existing.password) !== data.password) {
  //     throw new Error("Incorrect password.");
  //   }

  //   const { ...userData } = existing;
  //   return userData;
  // },
}

export { AuthService } ;