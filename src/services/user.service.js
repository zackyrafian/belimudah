
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

export { UserStorage } ;