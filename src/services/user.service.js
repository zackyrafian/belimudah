const UserStorage = { 
  getAccounts() { 
    return JSON.parse(localStorage.getItem("account") || "[]")
  },

  getUser() { 
    return JSON.parse(localStorage.getItem("user")); 
  }, 

  updateUser(updateData) { 
    const user = this.getUser();
    if (!user) { 
      return; 
    }
    const accounts = this.getAccounts()
    const index = accounts.findIndex((account) => account.email === user.email); 
    if (index === -1) return;
    
    const updatedUser = {
      ...accounts[index],
      ...updateData
    };
  
    accounts[index] = updatedUser;
    localStorage.setItem("account", JSON.stringify(accounts));
    localStorage.setItem("user", JSON.stringify(updatedUser));

    return updatedUser;
  },

  addCart(product) { 
    const user = this.getUser(); 
    if (!user) { 
      return; 
    }
    const cart = [...(user.cart || [])];
    cart.push(product)
    return this.updateUser({cart})
  },

  getCart() { 
    const user = this.getUser(); 
    if (!user) { 
      return window.location.href = '/';
    }
    
    return {
      cart: {
        product: [...user.cart], 
      },
      total: user.cart.length
    };
  },

  updateShippingAddress(address) { 
    const user = this.getUser();
    const shipping = user.shipping_address || [];
    const updated = [...shipping, address];
    
    return this.updateUser({
      shipping_address: updated
    });
  },

  setSelectedShippingAddress(address) {
    return this.setCheckout({
      shipping_address: address
    });
  },

  setSelectedPaymentMethod(method) {
    return this.setCheckout({
      payment_method: method,
    });
  },

  createCheckout(data) {
    return this.updateUser({
      checkout: data
    });
  },

  setCheckout(data) { 
    const user = this.getUser(); 
    return this.updateUser({
      checkout: {
        ...(user.checkout || {}),
        ...data,
      }
    });
  },
  clearCheckout() {
    return this.updateUser({
      checkout: {},
      cart: []
    });
  },

  createOrder(data) { 
    const user = this.getUser(); 
    if (!user) { 
      return; 
    }
    const order = [...(user.order || [])];
    order.push(data)
    return this.updateUser({order})
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