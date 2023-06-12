import React from "react";

const SearchBar = ({ value, onChange }) => {
  //**Komponen ini akan menerima dua properti: value dan onChange. */
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Cari berdasarkan nama atau ID"
        className="border px-2 py-1 focus:outline-none focus:border-gray-300"
        /**focus:outline-none (menghilangkan garis fokus pada saat input aktif), dan focus:border-gray-300 (memberikan garis batas abu-abu pada saat input aktif). */
        value={value}
        onChange={onChange}
        /**value={value}: Properti value digunakan untuk menentukan nilai saat ini dari input teks. Nilai ini diterima dari properti value yang diberikan saat menggunakan komponen SearchBar.
onChange={onChange}: Properti onChange adalah fungsi yang akan dipanggil ketika nilai input berubah. Fungsi ini diterima dari properti onChange yang diberikan saat menggunakan komponen SearchBar. */
      />
    </div>
  );
};

export default SearchBar;
