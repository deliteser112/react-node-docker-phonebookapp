import React, { useState, useEffect, useCallback } from "react";
import axios from "../utils/axios";

import Users from "./Users";
import Form, { EditMode } from "../components/Form";

export type User = {
  id: number;
  nama: string;
  disable: boolean;
  [key: string]: string | number | boolean;
};

const ManageUsers = () => {
  const [users, setUsers] = useState<User[]>([]);

  const [editMode, setEditMode] = useState(EditMode.add);
  const [dataUpdate, setDataUpdate] = useState({ id: 0, nama: "" });

  useEffect(() => {
    (async function () {
      const res = await axios.get("/users", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setUsers(res.data);
    })();

    return () => {
      setUsers([]);
    };
  }, []);

  const onChangeDisableHandler = async (e: React.SyntheticEvent) => {
    const { id, value, checked } = e.target as HTMLInputElement;

    try {
      await axios.put(`/users/${id}`, {
        nama: value,
        disable: checked,
      });

      const newUsers = [...users];

      const index = users.findIndex((user: User) => user.id === +id);
      const updateUser = newUsers[index] as User;
      updateUser.disable = checked;

      setUsers(newUsers);
    } catch (error) {
      console.log(error);
    }
  };

  const setEditModeHandler = useCallback((id: number, nama: string) => {
    setEditMode(EditMode.update);

    setDataUpdate({ id, nama });
  }, []);

  const cancelHandler = useCallback(() => {
    setEditMode(EditMode.add);
    setDataUpdate({ id: 0, nama: "" });
  }, []);

  const onAddedHandler = async (nama: string, disable: boolean) => {
    try {
      const res = await axios.post(
        "/users",
        { nama, disable: disable === true ? 1 : 0 },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const newUser: User = res.data;
      const updatedUsers = [...users, newUser].sort((a, b) => {
        return a.nama.localeCompare(b.nama);
      });

      setUsers(updatedUsers);
    } catch (error) {
      console.log(error);
    }
  };

  const onUpdatedHandler = async (id: number, nama: string) => {
    try {
      await axios.put(
        "/users/" + id,
        { nama },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const updatedUsers = [...users];
      const index = updatedUsers.findIndex((user) => user.id === id);
      const user = updatedUsers[index];
      user.nama = nama;

      setUsers(updatedUsers);
      cancelHandler();
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteHandler = async (id: number) => {
    try {
      await axios.delete("/users/" + id);

      const updatedUsers = users.filter((user) => user.id !== id);

      setUsers(updatedUsers);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-sm mt-3">
      <h3>Manage Users</h3>
      <Form
        editMode={editMode}
        updateId={dataUpdate.id}
        updateNama={dataUpdate.nama}
        onAdded={onAddedHandler}
        onUpdated={onUpdatedHandler}
        onCancel={cancelHandler}
      />
      <Users
        users={users}
        editMode={editMode}
        setEditMode={setEditModeHandler}
        onChange={onChangeDisableHandler}
        onDelete={onDeleteHandler}
      />
    </div>
  );
};

export default ManageUsers;
