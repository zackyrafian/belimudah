import { UserStorage } from "./user.service";

const AuthService = { 
  register(data) {
    const listAccounts = UserStorage.getAccounts() || [];
    const email = data.email.toLowerCase().trim();
    if (listAccounts.some(account => account.email === email)) {
      throw new Error("This email address is already use.");
    }
    
    if (data.password !== data.confirmPassword) {
      throw new Error("Passwords do not match");
    }
    
    const newAccount = {
      fullname: data.fullname,
      email,
      password: btoa(data.password),
      phone_number: null,
      shipping_address: [],
      cart: [],
      wishlist: [],
    };
    listAccounts.push(newAccount);
    localStorage.setItem("account", JSON.stringify(listAccounts));
    return newAccount;
  },
  login(data) {
    const listAccounts = UserStorage.getAccounts() || [];
    const email = data.email.toLowerCase().trim();

    if (!email || !data.password) {
      throw new Error("Please enter both email and password.");
    }

    const existing = listAccounts.find(account => account.email === email);
    if (!existing) { 
      throw new Error("No account found with this email address.");
    }

    if (atob(existing.password) !== data.password) {
      throw new Error("Incorrect password.");
    }

    const { ...userData } = existing;
    return userData;
  },
}

export { AuthService } ;