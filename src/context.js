import React, { createContext, useContext, useState, useEffect } from 'react';
import fakeData from './data';

const DataContext = createContext();
//Baris ini membuat konteks baru dengan menggunakan createContext(). Konteks ini akan digunakan untuk menyimpan dan membagikan data dalam aplikasi.

export const DataProvider = ({ children }) => {
  // Baris ini mengekspor komponen DataProvider. DataProvider adalah komponen yang menggunakan konteks DataContext untuk menyediakan nilai data kepada komponen-komponen di dalamnya. Itu menerima children sebagai prop, yang akan menjadi komponen-komponen yang dibungkus oleh DataProvider.
  const [data, setData] = useState([]);
  //Baris ini menggunakan useState untuk membuat state data dengan nilai awal berupa array kosong. data akan digunakan untuk menyimpan data palsu yang akan disediakan oleh DataProvider.

  useEffect(() => {
    setData(fakeData);
  }, []);
  //Baris ini menggunakan useEffect untuk melakukan efek samping saat komponen DataProvider di-mount. Efek ini akan dijalankan sekali, karena array kosong [] diberikan sebagai argumen kedua. Di dalam efek ini, setData akan dipanggil untuk mengisi state data dengan nilai dari fakeData yang diimpor dari file data.js.

  return (
    <DataContext.Provider value={data}>
      {children}
    </DataContext.Provider>
  );
  //Baris ini menggunakan DataContext.Provider untuk memberikan nilai data ke komponen-komponen yang ada di dalamnya. Properti value mengambil nilai dari data, sehingga komponen-komponen yang menggunakan konteks ini dapat mengakses nilai tersebut.
};

export const useData = () => useContext(DataContext);
//Baris ini mengekspor kustom hook useData yang menggunakan useContext untuk mengakses nilai konteks dari DataContext. Dengan menggunakan kustom hook ini, komponen-komponen lain di aplikasi dapat dengan mudah mengakses nilai data yang disediakan oleh DataProvider.
