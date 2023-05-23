import { makeAutoObservable } from "mobx";
import { IUser } from "../models/IUser";
import AuthService from "../services/AuthService";

export default class Store {
  user = {} as IUser;
  isAuth = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: IUser) {
    this.user = user;
  }

  async login(email: string, password: string) {
    try {
      const response = await AuthService.login(email, password);
      console.log(response);

      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (err) {
      let errorMessage = "";
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      console.log(errorMessage);
    }
  }

  async registration(email: string, password: string) {
    try {
      const response = await AuthService.registration(email, password);
      console.log(response);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (err) {
      let errorMessage = "";
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      console.log(errorMessage);
    }
  }

  async logout() {
    try {
      const response = await AuthService.logout;
      console.log(response);

      localStorage.removeItem("token");
      this.setAuth(false);
      this.setUser({} as IUser);
    } catch (err) {
      let errorMessage = "";
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      console.log(errorMessage);
    }
  }
}
