import React, { useState, useEffect } from "react";

const CardGrid = () => {
  const [cards, setCards] = useState([]);
  /**Pada baris ke-3, kita mendestrukturisasi array yang dikembalikan oleh useState menjadi dua variabel, yaitu cards dan setCards. cards adalah nilai state saat ini, dan setCards adalah fungsi yang digunakan untuk mengubah nilai state tersebut. */

  useEffect(() => {
    const storedCards = localStorage.getItem("cards");
    if (storedCards) {
      setCards(JSON.parse(storedCards));
    }
  }, []);
  /**Pada useEffect pertama (baris ke-5), kita menggunakan localStorage.getItem untuk mengambil data daftar kartu yang disimpan di localStorage. Jika ada data yang tersimpan, kita mengubah nilai state cards dengan data tersebut menggunakan JSON.parse. */

  useEffect(() => {
    localStorage.setItem("cards", JSON.stringify(cards));
  }, [cards]);
  /**Pada useEffect kedua (baris ke-10), kita menggunakan localStorage.setItem untuk menyimpan data daftar kartu ke localStorage setiap kali nilai state cards berubah. Kita menggunakan JSON.stringify untuk mengubah daftar kartu menjadi bentuk string sebelum menyimpannya. */

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    const newCard = {
      id: Date.now(),
      file: file,
      url: URL.createObjectURL(file),
    };

    setCards([...cards, newCard]);
  };
  /**handleFileUpload: Ini adalah fungsi yang dipanggil saat pengguna memilih file untuk diupload. Fungsi ini menerima event sebagai argumen, dan dari event tersebut kita dapat mengakses file yang dipilih melalui event.target.files[0].
Pada baris ke-15, kita membuat objek baru untuk kartu yang akan ditambahkan dengan menggunakan Date.now() sebagai ID unik untuk kartu tersebut, dan menyimpan file yang dipilih sebagai properti file.
Pada baris ke-16, kita menggunakan URL.createObjectURL untuk membuat URL objek untuk file yang diupload. URL objek ini akan digunakan untuk menampilkan gambar file yang diupload pada tampilan kartu.
Pada baris ke-18, kita menggunakan setCards untuk memperbarui nilai state cards dengan menambahkan kartu baru ke dalam daftar kartu yang ada. Kita menggunakan spread operator ... untuk membuat salinan daftar kartu yang ada, kemudian menambahkan kartu baru di akhir daftar. */

  const handleFileDownload = (file) => {
    const downloadURL = URL.createObjectURL(file);
    const downloadLink = document.createElement("a");
    downloadLink.href = downloadURL;
    downloadLink.download = file.name;
    downloadLink.click();
    URL.revokeObjectURL(downloadURL);
  };
  /**handleFileDownload: Ini adalah fungsi yang dipanggil saat pengguna mengklik tombol "Download" pada kartu. Fungsi ini menerima file sebagai argumen.
Pada baris ke-25, kita menggunakan URL.createObjectURL untuk membuat URL objek untuk file yang akan diunduh.
Pada baris ke-27, kita membuat elemen anchor (<a>) baru dengan menggunakan document.createElement("a").
Pada baris ke-28, kita mengatur properti href pada elemen anchor dengan URL objek yang telah dibuat.
Pada baris ke-29, kita mengatur properti download pada elemen anchor dengan nama file menggunakan file.name.
Pada baris ke-30, kita menggunakan elemen.click() untuk secara programatik mensimulasikan klik pada elemen anchor, yang akan memulai unduhan file.
Pada baris ke-31, kita menggunakan URL.revokeObjectURL untuk mencabut URL objek setelah unduhan selesai atau dibatalkan. */

  const handleFileDelete = (id) => {
    const updatedCards = cards.filter((card) => card.id !== id);
    setCards(updatedCards);
  };
  /**handleFileDelete: Ini adalah fungsi yang dipanggil saat pengguna mengklik tombol "Hapus" pada kartu. Fungsi ini menerima ID kartu sebagai argumen.
Pada baris ke-35, kita menggunakan metode filter untuk membuat daftar kartu baru yang tidak memiliki ID yang sama dengan ID yang diterima sebagai argumen. Dengan ini, kita menghapus kartu yang sesuai dari daftar kartu.
Pada baris ke-36, kita menggunakan setCards untuk memperbarui nilai state cards dengan daftar kartu yang diperbarui. */

  useEffect(() => {
    cards.forEach((card) => {
      if (!card.url) {
        const reader = new FileReader();
        reader.onload = () => {
          const imageURL = reader.result;
          const updatedCard = { ...card, url: imageURL };
          const updatedCards = cards.map((c) =>
            c.id === card.id ? updatedCard : c
          );
          setCards(updatedCards);
        };
        reader.readAsDataURL(card.file);
      }
    });
  }, [cards]);

  /**Pada useEffect ketiga (baris ke-41), saat komponen dipasang ke DOM, kita melakukan iterasi pada setiap kartu dalam daftar cards menggunakan forEach. Jika URL objek tidak tersedia untuk kartu tersebut (artinya gambar belum ditampilkan), maka kita membuat FileReader baru.
Pada baris ke-43, kita menetapkan onload handler pada FileReader. Saat file selesai dibaca, kita mendapatkan URL gambar dari reader.result.
Pada baris ke-44, kita membuat objek kartu yang diperbarui dengan menggunakan spread operator (...card) untuk menduplikasi properti kartu yang ada, kemudian mengubah properti url dengan URL gambar yang telah dibaca.
Pada baris ke-45, kita membuat daftar kartu yang diperbarui dengan menggunakan metode map pada daftar cards dan mengganti kartu yang sesuai dengan kartu yang telah diperbarui.
Pada baris ke-46, kita menggunakan setCards untuk memperbarui nilai state cards dengan daftar kartu yang telah diperbarui. */

  useEffect(() => {
    return () => {
      cards.forEach((card) => URL.revokeObjectURL(card.url));
    };
  }, []);
  /**Pada useEffect keempat (baris ke-51), saat komponen di-unmount dari DOM, kita melakukan iterasi pada setiap kartu dalam daftar cards menggunakan forEach. Kita menggunakan URL.revokeObjectURL untuk mencabut URL objek yang telah dibuat saat mengunggah file. */

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
        <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 flex items-center justify-center">
          <div className="card rounded-md p-4 h-full">
            <input
              type="file"
              onChange={handleFileUpload}
              className="hidden"
              id="file-input"
            />
            <label
              htmlFor="file-input"
              className="w-full max-w-xs flex items-center justify-center py-2 px-4 bg-blue-700 hover:bg-blue-800 text-white rounded-md cursor-pointer border border-blue-500"
            >
              Upload
            </label>
          </div>
        </div>

        {cards.map((card) => (
          <div
            key={card.id}
            className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-1"
          >
            <div className="card border-2 border-gray-300 rounded-md p-4 h-full flex flex-col justify-between">
              <div className="aspect-w-1 aspect-h-1 mb-4">
                <div className="card bg-gray-100 border-2 border-gray-300 rounded-md p-4 h-40 flex flex-col justify-between">
                  {card.url && (
                    <img
                      src={card.url}
                      alt="Uploaded"
                      className="object-cover object-center w-full h-full"
                    />
                  )}
                </div>
              </div>
              <div className="card-buttons mt-4">
                <button
                  className="btn bg-green-500 hover:bg-green-600 text-white rounded-md px-4 py-2 mr-2"
                  onClick={() => handleFileDownload(card.file)}
                >
                  Download
                </button>
                <button
                  className="btn bg-red-500 hover:bg-red-600 text-white rounded-md px-4 py-2"
                  onClick={() => handleFileDelete(card.id)}
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  /**Pada fungsi render, kita mengembalikan elemen JSX yang merupakan tampilan dari komponen CardGrid. Tampilan ini termasuk tata letak grid yang menampilkan daftar kartu yang diupload. Setiap kartu memiliki tombol "Download" untuk mengunduh file dan tombol "Hapus" untuk menghapus kartu. Jika URL objek untuk file telah tersedia, kita menampilkan gambar file tersebut pada kartu. */
};

export default CardGrid;

