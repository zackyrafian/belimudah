import { api } from "./api"

const WishListService = {
  getAll: (signal, token) => {
    return api.get('/users/wishlist', {
      signal,
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};

export { WishListService };