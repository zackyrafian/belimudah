const UserService = {
  async getUserInfo(token) {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/users/info`, {
        headers: { 
          Authorization: token
        }
      });

      if (!res.ok) {
        throw new Error("Failed to fetch user info");
      }

      const data = await res.json();
      return data.result;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }
};

const UserStorage = {
  getAccounts() {
    return JSON.parse(localStorage.getItem("account") || "[]")
  },

  syncUser(user) {
    if (!user) return;

    const accounts = this.getAccounts();
    const index = accounts.findIndex(acc => acc.email === user.email);

    if (index !== -1) {
      accounts[index] = {
        ...accounts[index],
        ...user,
        password: accounts[index].password
      }
      localStorage.setItem("account", JSON.stringify(accounts));
    }
  }
}

export { UserService, UserStorage } ;