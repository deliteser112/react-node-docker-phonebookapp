import React from 'react';

import { EditMode } from '../components/Form';
import { User } from './ManageUsers';

type Props = {
  users: User[];
  editMode: EditMode;
  setEditMode: (id: number, nama: string) => void;
  onChange: (e: React.SyntheticEvent) => void;
  onDelete: (id: number) => void;
};

const Users: React.FC<Props> = ({
  users,
  editMode,
  setEditMode,
  onChange,
  onDelete,
}: Props) => {
  const isEditMode = editMode === EditMode.update;

  const checkBox = (id: number, nama: string, status: boolean) => {
    return (
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value={nama}
          id={id.toString()}
          checked={status}
          onChange={e => onChange(e)}
          disabled={isEditMode}
        />
        <label className="form-check-label" htmlFor="flexCheckDefault"></label>
      </div>
    );
  };

  const renderedUsers = users.map((user: User, i) => {
    return (
      <tr key={user.id}>
        <th scope="row">{i + 1}</th>
        <td>{user.nama}</td>
        <td>{checkBox(user.id, user.nama, user.disable)}</td>
        <td>
          <button
            disabled={isEditMode}
            className="btn btn-warning"
            onClick={() => setEditMode(user.id, user.nama)}
          >
            Edit
          </button>
        </td>
        <td>
          <button
            disabled={isEditMode}
            className="btn btn-danger"
            onClick={() => onDelete(user.id)}
          >
            delete
          </button>
        </td>
      </tr>
    );
  });
  return (
    <div className="container mt-3">
      <table className="table table-sm table-striped">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Nama</th>
            <th scope="col">Disable</th>
            <th scope="col" colSpan={2}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>{renderedUsers}</tbody>
      </table>
    </div>
  );
};

export default Users;
