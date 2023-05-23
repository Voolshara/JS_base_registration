import React, { useContext, useEffect, useState } from "react";
import LoginForm from "./components/LoginForm";
import { Context } from ".";
import { observer } from "mobx-react-lite";
import { IUser } from "./models/IUser";
import UserService from "./services/UserService";

function App() {
  const { store } = useContext(Context);
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []);

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (err) {
      let errorMessage = "";
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      console.log(errorMessage);
    }
  }

  if (store.isLoading) {
    return <div>Загрузка</div>;
  }

  if (!store.isAuth) {
    return (
      <>
        <LoginForm />
        <button onClick={getUsers}>Получить список пользователей</button>
      </>
    );
  }

  return (
    <div>
      <h1>
        {store.isAuth
          ? `Пользователь авторизован ${store.user.email}`
          : "АВТОРИЗИРУЙТЕСЬ"}
      </h1>

      <h1>
        {store.user.isActivated ? "Аккаунт подтвержден" : "Подтвержите аккаунт"}
      </h1>

      <button onClick={() => store.logout()}>Выйти</button>
      <div>
        <button onClick={getUsers}>Получить список пользователей</button>
      </div>

      {users.map((user) => (
        <div key={user.email}>{user.email}</div>
      ))}
    </div>
  );
}

export default observer(App);
