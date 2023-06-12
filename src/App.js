import React from 'react';
import { DataProvider } from './context';
import HomePage from './homePage';

const App = () => {
  return (
    <DataProvider>
      <HomePage />
    </DataProvider>
  );
};
/**Fungsi komponen ini mengembalikan JSX yang merepresentasikan struktur aplikasi.
Di dalam return, terdapat komponen <DataProvider>. Ini menunjukkan bahwa App adalah komponen tingkat atas dalam hierarki aplikasi dan memastikan bahwa data yang dibutuhkan oleh komponen-komponen lain di dalamnya tersedia melalui DataProvider.
Di dalam <DataProvider>, terdapat komponen <HomePage>. Ini menunjukkan bahwa HomePage adalah komponen yang akan ditampilkan sebagai halaman utama dalam aplikasi. */

export default App;

















