import { defineStore } from 'pinia';

export const useStatusStore = defineStore({
  id: 'status',
  state: () => ({
    isLoggedIn: false,
    loggedInUser: null,
  }),
  getters: {
    getIsLoggedIn: (state) => state.isLoggedIn,
  },
  actions: {
    setIsLoggedIn(bool) {
      this.isLoggedIn = bool;
    },
    setLoggedInUser(user) {
      this.loggedInUser = user;
    },
  },
});
