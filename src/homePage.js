import React, { useState, useEffect } from 'react';
import SearchBar from './searchBar';
import DataList from './dataList';

const HomePage = () => {
  const [data, setData] = useState(() => {
    const storedData = localStorage.getItem('data');
    return storedData ? JSON.parse(storedData) : [];
  });
  const [editingItemId, setEditingItemId] = useState(null);
  const [newData, setNewData] = useState({ id: '', name: '', email: '' });
  const [searchKeyword, setSearchKeyword] = useState('');
  /**Komponen ini mendefinisikan beberapa variabel state menggunakan hook useState:
data: Menyimpan array item data yang mewakili pengguna. Ini diinisialisasi dengan nilai dari local storage, atau array kosong jika tidak ada data yang tersimpan.
editingItemId: Menyimpan ID item yang sedang diedit. Awalnya diatur sebagai null.
newData: Menyimpan data untuk item baru yang ditambahkan. Diinisialisasi dengan objek kosong.
searchKeyword: Menyimpan kata kunci pencarian yang dimasukkan di bilah pencarian. Awalnya diatur sebagai string kosong. */

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(data));
  }, [data]);
  /**Komponen ini menggunakan hook useEffect untuk menyimpan variabel state data ke local storage setiap kali terjadi perubahan. */

  const handleEdit = (itemId) => {
    setEditingItemId(itemId);
  };
  /**Menangani peristiwa pengeditan item dengan menerima parameter itemId. Fungsi ini mengatur editingItemId dengan nilai itemId. */

  const handleDelete = (itemId) => {
    const confirmed = window.confirm('Anda yakin ingin menghapus data ini?');
    if (confirmed) {
      setData((prevData) => prevData.filter((item) => item.id !== itemId));
    }
  };
  /**Menangani peristiwa penghapusan item dengan menerima parameter itemId. Fungsi ini menampilkan konfirmasi kepada pengguna dan jika pengguna mengonfirmasi, maka fungsi ini akan menghapus item dengan ID yang sesuai dari data menggunakan metode filter */

  const handleSave = (itemId) => {
    console.log('Menyimpan perubahan pada data dengan ID:', itemId);
    setEditingItemId(null);
  };
  /**Menangani peristiwa penyimpanan perubahan pada item dengan menerima parameter itemId. Fungsi ini mencetak pesan ke konsol dan mengatur editingItemId sebagai null. */

  const handleAddData = () => {
    setNewData({ id: '', name: '', email: '' });
    setEditingItemId('new');
  };
  /**Menangani peristiwa penambahan data baru. Fungsi ini mengatur newData sebagai objek kosong dan editingItemId sebagai 'new'. */

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editingItemId === 'new') {
      setNewData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      setData((prevData) =>
        prevData.map((item) =>
          item.id === editingItemId ? { ...item, [name]: value } : item
        )
      );
    }
  };
  /**Menangani peristiwa perubahan nilai pada input dengan menerima objek event e. Fungsi ini mengupdate state newData atau data tergantung pada nilai editingItemId dengan menggunakan metode setNewData atau setData. */

  const handleSaveNewData = () => {
    const newId = Date.now();
    const newDataWithId = { ...newData, id: newId };
    setData((prevData) => [...prevData, newDataWithId]);
    setNewData({ id: '', name: '', email: '' });
    setEditingItemId(null);
  };
  /**handleSaveNewData(): Menangani peristiwa penyimpanan data baru. Fungsi ini membuat ID baru menggunakan Date.now() dan menggabungkannya dengan newData menggunakan spread operator (...). Data baru tersebut ditambahkan ke data menggunakan metode setData, dan state newData dan editingItemId diatur kembali menjadi kosong atau null. */

  const handleSearch = (e) => {
    setSearchKeyword(e.target.value);
  };
  /**Menangani peristiwa perubahan pada input pencarian dengan menerima objek event e. Fungsi ini mengatur state searchKeyword sesuai dengan nilai input yang dimasukkan. */

  const filteredData = data
    ? data.filter(
        (item) =>
          item.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
          item.id.toString().includes(searchKeyword)
      )
    : [];
    /**filteredData: Variabel ini berisi hasil filter dari data berdasarkan kata kunci pencarian. Jika data tidak kosong, maka hanya item yang mengandung searchKeyword pada nama pengguna atau ID yang akan dimasukkan ke dalam filteredData. */

  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Daftar Pengguna</h1>
      <div className="overflow-x-auto">
        <div className="min-w-full">
          <button
            className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded sm:mr-2"
            onClick={handleAddData}
            /**atribut untuk menetapkan fungsi handleAddData sebagai penangan peristiwa saat tombol diklik. */
          >
            Tambah Data
          </button>
          <SearchBar value={searchKeyword} onChange={handleSearch} />
          {/*<SearchBar value={searchKeyword} onChange={handleSearch} />: Ini adalah komponen SearchBar yang digunakan untuk menampilkan bilah pencarian.
Props yang dilewatkan ke komponen ini adalah value yang diisi dengan searchKeyword dan onChange yang diisi dengan fungsi handleSearch. */}
          <DataList
            data={filteredData}
            editingItemId={editingItemId}
            newData={newData}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleSave={handleSave}
            handleChange={handleChange}
            handleSaveNewData={handleSaveNewData}
          />
          {/*  Ini adalah komponen DataList yang digunakan untuk menampilkan daftar data pengguna.
Props yang dilewatkan ke komponen ini adalah data yang diisi dengan filteredData, editingItemId yang diisi dengan editingItemId, newData yang diisi dengan newData, dan berbagai fungsi penangan peristiwa seperti handleEdit, handleDelete, handleSave, handleChange, dan handleSaveNewData. */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;


