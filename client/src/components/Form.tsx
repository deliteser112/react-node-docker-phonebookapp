import { useEffect, useState } from 'react';

export enum EditMode {
  add,
  update,
}

type Props = {
  editMode?: EditMode;
  updateId?: number;
  updateNama?: string;
  updateDisable?: boolean;
  onAdded: (nama: string, disable: boolean) => void;
  onUpdated: (id: number, nama: string) => void;
  onCancel: () => void;
};

const Form: React.FC<Props> = ({
  editMode = EditMode.add,
  updateId = 0,
  updateNama = '',
  onAdded,
  onUpdated,
  onCancel,
}: Props) => {
  const [nama, setNama] = useState('');
  const [disable, setDisable] = useState(false);
  const isEditMode = editMode === EditMode.update;

  useEffect(() => {
    if (isEditMode) {
      setNama(updateNama);
    }
  }, [isEditMode, updateNama]);

  const onSubmitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (editMode === EditMode.add) {
      onAdded(nama, disable);
    } else if (editMode === EditMode.update) {
      // update user
      onUpdated(updateId, nama);
    }

    setNama('');
    setDisable(false);
  };

  const onCancelHandler = () => {
    setNama('');
    onCancel();
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="row mb-3">
        <div className="col-md-6 col-sm">
          <label htmlFor="nama" className="form-label">
            Nama
          </label>
          <input
            value={nama}
            onChange={e => setNama(e.target.value)}
            type="text"
            className="form-control"
            id="nama"
          />
        </div>
      </div>
      <div className="mb-3 form-check">
        <input
          checked={disable}
          onChange={e => setDisable(e.target.checked)}
          type="checkbox"
          className="form-check-input"
          name="disable"
          id="disable"
          disabled={isEditMode}
        />
        <label className="form-check-label" htmlFor="exampleCheck1">
          Disable
        </label>
      </div>
      <button type="submit" className="btn btn-primary mx-2">
        {!isEditMode ? 'Tambah' : 'Simpan'}
      </button>
      {isEditMode && (
        <button className="btn btn-danger" onClick={onCancelHandler}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default Form;
