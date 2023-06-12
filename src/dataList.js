import React from 'react';

const DataList = ({
  data,
  editingItemId,
  newData,
  handleEdit,
  handleDelete,
  handleSave,
  handleChange,
  handleSaveNewData,
  /**Ini adalah deklarasi komponen DataList menggunakan fungsi arrow dengan menggunakan objek destrukturisasi untuk mendapatkan nilai-nilai props.
Props yang diterima oleh komponen ini adalah data, editingItemId, newData, handleEdit, handleDelete, handleSave, handleChange, dan handleSaveNewData. */
}) => {
  return (
    <table className="w-full table-auto">
      <thead>
        <tr>
          <th className="border px-4 py-2">ID</th>
          <th className="border px-4 py-2">Nama</th>
          <th className="border px-4 py-2">Email</th>
          <th className="border px-4 py-2">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td className="border px-4 py-2">
              {editingItemId === item.id ? (
                <input
                  type="text"
                  name="id"
                  value={item.id}
                  onChange={handleChange}
                  className="border px-2 py-1"
                />
              ) : (
                item.id
              )}
            </td>
            <td className="border px-4 py-2">
              {editingItemId === item.id ? (
                <input
                  type="text"
                  name="name"
                  value={item.name}
                  onChange={handleChange}
                  className="border px-2 py-1"
                />
              ) : (
                item.name
              )}
            </td>
            <td className="border px-4 py-2">
              {editingItemId === item.id ? (
                <input
                  type="text"
                  name="email"
                  value={item.email}
                  onChange={handleChange}
                  className="border px-2 py-1"
                />
              ) : (
                item.email
              )}
            </td>
            <td className="border px-4 py-2">
              {editingItemId === item.id ? (
                <button
                  className="mr-lg-2 mb-2 sm:mb-0 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded sm:mr-2"
                  onClick={() => handleSave(item.id)}
                >
                  Simpan
                </button>
              ) : (
                <button
                  className="mr-lg-2 mb-2 sm:mb-0 lg:mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded sm:mr-2"
                  onClick={() => handleEdit(item.id)}
                >
                  Edit
                </button>
              )}
              <button
                className="mb-2 sm:mb-0 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleDelete(item.id)}
              >
                Hapus
              </button>
            </td>
          </tr>
        ))}
        {editingItemId === 'new' && (
          <tr>
            <td className="border px-4 py-2">
              <input
                type="text"
                name="id"
                value={newData.id}
                onChange={handleChange}
                className="border px-2 py-1"
              />
            </td>
            <td className="border px-4 py-2">
              <input
                type="text"
                name="name"
                value={newData.name}
                onChange={handleChange}
                className="border px-2 py-1"
              />
            </td>
            <td className="border px-4 py-2">
              <input
                type="text"
                name="email"
                value={newData.email}
                onChange={handleChange}
                className="border px-2 py-1"
              />
            </td>
            <td className="border px-4 py-2">
              <button
                className="mr-lg-2 mb-2 sm:mb-0 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded sm:mr-2"
                onClick={handleSaveNewData}
              >
                Simpan
              </button>
            </td>
          </tr>
        )}
      </tbody>
      {/*  Ini adalah elemen <tbody> yang digunakan untuk menampilkan isi tabel.
Pada elemen <tbody>, terdapat loop data.map((item) => { ... }) yang menghasilkan baris <tr> untuk setiap elemen dalam data yang diterima sebagai props.
Pada setiap sel <td>, terdapat kondisi editingItemId === item.id yang mengecek apakah item sedang dalam mode pengeditan atau tidak.
Jika dalam mode pengeditan, ditampilkan elemen <input> untuk memungkinkan pengguna mengedit nilainya, dengan atribut type="text", name sesuai kolom yang sedang diubah, value diisi dengan nilai item yang sesuai, dan onChange yang dihubungkan ke fungsi handleChange.
Jika tidak dalam mode pengeditan, ditampilkan nilai item yang sesuai.
Pada sel kolom Aksi, juga terdapat kondisi editingItemId === item.id.
Jika dalam mode pengeditan, ditampilkan tombol "Simpan" dengan atribut className dan fungsi penangan peristiwa handleSave yang dihubungkan ke item.id saat tombol diklik.
Jika tidak dalam mode pengeditan, ditampilkan tombol "Edit" dengan atribut className dan fungsi penangan peristiwa handleEdit yang dihubungkan ke item.id saat tombol diklik.
Terdapat juga tombol "Hapus" dengan atribut className dan fungsi penangan peristiwa handleDelete yang dihubungkan ke item.id saat tombol diklik.
Baris Tambah Data Baru:
Baris ini hanya ditampilkan jika editingItemId === 'new'.
Baris ini memiliki empat sel <td> yang mewakili kolom ID, Nama, Email, dan Aksi.
Setiap sel <td> memiliki atribut className="border px-4 py-2" untuk memberikan class CSS pada sel dengan gaya tertentu.
Pada setiap sel <td>, ditampilkan elemen <input> untuk memungkinkan pengguna memasukkan nilai baru, dengan atribut type="text", name sesuai kolom yang sedang diubah, value diisi dengan nilai newData yang sesuai, dan onChange yang dihubungkan ke fungsi handleChange.
Hanya pada sel Aksi, ditampilkan tombol "Simpan" dengan atribut className dan fungsi penangan peristiwa handleSaveNewData saat tombol diklik.

*/}
    </table>
  );
};

export default DataList;

