const UserStorage = { 
  getAccounts() { 
    return JSON.parse(localStorage.getItem("account"))
  },

  getUser() { 
    return JSON.parse(localStorage.getItem("user")); 
  }, 

  syncUser() { 
    const user = this.getUser(); 
    if(!user) return; 

    const accounts = this.getAccounts(); 
    const index = accounts.findIndex(acc => acc.email === user.email); 

    if (index !== -1) { 
      accounts[index] = {...accounts[index], ...user}; 
      localStorage.setItem("account", JSON.stringify(accounts)); 

      const mergeUser = {...user, ...accounts[index]}; 
      localStorage.setItem("user", JSON.stringify(mergeUser));
    }
  }
}

export { UserStorage } ;