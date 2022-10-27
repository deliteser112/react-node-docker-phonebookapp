import React, { useState, useEffect } from 'react';
import axios from "../utils/axios";

type User = {
  id: number;
  nama: string;
  iklan: boolean;
  streaming_lagu: boolean;
  streaming_karaoke: boolean;
  karaoke: boolean;
  share_karaoke: boolean;
  live_streaming: boolean;
  share_live_streaming: boolean;
  [key: string]: string | number | boolean;
};

const Users = () => {
  const [users, setUsers] = useState([] as User[]);

  useEffect(() => {
    (async function () {
      const res = await axios.get('/users/active', {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setUsers(res.data);
    })();

    return () => {
      setUsers([]);
    };
  }, []);

  const onChangeHandler = async (e: React.SyntheticEvent) => {
    const { id, value, checked } = e.target as HTMLInputElement;

    try {
      await axios.put(`/users/${id}/status`, {
        fieldName: value,
        newStatus: checked,
      });

      const newUsers = [...users];

      const index = users.findIndex((user: User) => user.id === +id);
      const updateUser = newUsers[index] as User;
      updateUser[value] = checked;

      setUsers(newUsers);
    } catch (error) {
      console.log(error);
    }
  };

  const checkBox = (id: number, field: string, status: boolean) => {
    return (
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value={field}
          id={id.toString()}
          checked={status}
          onChange={onChangeHandler}
        />
        <label className="form-check-label" htmlFor="flexCheckDefault"></label>
      </div>
    );
  };

  const onClearCheckedHandler = async () => {
    try {
      if (!users.length) return;

      await axios.get('/users/clearchecked');

      const updatedUsers = users.map(user => {
        const newUser = {
          ...user,
          iklan: false,
          streaming_lagu: false,
          streaming_karaoke: false,
          karaoke: false,
          share_karaoke: false,
          live_streaming: false,
          share_live_streaming: false,
        };

        return newUser;
      });

      setUsers(updatedUsers);
    } catch (error) {
      console.log(error);
    }
  };

  const renderedUsers = users.map((user: User, i) => {
    return (
      <tr key={user.id}>
        <th scope="row">{i + 1}</th>
        <td>{user.nama}</td>
        <td className="bg-primary">{checkBox(user.id, 'streaming_lagu', user.streaming_lagu)}</td>
        <td className="bg-secondary">{checkBox(user.id, 'iklan', user.iklan)}</td>
        <td className="bg-success">
          {checkBox(user.id, 'streaming_karaoke', user.streaming_karaoke)}
        </td>
        <td className="bg-danger">{checkBox(user.id, 'karaoke', user.karaoke)}</td>
        <td className="bg-warning">{checkBox(user.id, 'share_karaoke', user.share_karaoke)}</td>
        <td className="bg-info">{checkBox(user.id, 'live_streaming', user.live_streaming)}</td>
        <td className="bg-dark">
          {checkBox(user.id, 'share_live_streaming', user.share_live_streaming)}
        </td>
      </tr>
    );
  });
  return (
    <div className="container mt-3">
      <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-3">
        <button
          disabled={!users.length}
          className="btn btn-primary"
          onClick={onClearCheckedHandler}
        >
          Clear Cheked
        </button>
      </div>
      <table className="table table-sm table-hover">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Nama</th>
            <th scope="col">Iklan</th>
            <th scope="col">Streaming Lagu</th>
            <th scope="col">Streaming Karaoke</th>
            <th scope="col">Karaoke</th>
            <th scope="col">Share Karaoke</th>
            <th scope="col">Live Streaming</th>
            <th scope="col">Share Live Streaming</th>
          </tr>
        </thead>
        <tbody>{renderedUsers}</tbody>
      </table>
    </div>
  );
};

export default Users;
