import React, { useState, useEffect } from "react";

const CardGrid = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const storedCards = localStorage.getItem("cards");
    if (storedCards) {
      setCards(JSON.parse(storedCards));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cards", JSON.stringify(cards));
  }, [cards]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    const newCard = {
      id: Date.now(),
      file: file,
    };

    setCards([...cards, newCard]);
  };

  const handleFileDownload = (file) => {
    const downloadURL = URL.createObjectURL(file);

    // Buat elemen anchor untuk mengunduh file
    const downloadLink = document.createElement("a");
    downloadLink.href = downloadURL;
    downloadLink.download = file.name;

    // Simulasikan klik pada elemen anchor
    downloadLink.click();

    // Hapus elemen anchor setelah proses unduhan selesai
    URL.revokeObjectURL(downloadURL);
  };

  const handleFileDelete = (id) => {
    const updatedCards = cards.filter((card) => card.id !== id);
    setCards(updatedCards);
  };

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
              className="w-full max-w-xs flex items-center justify-center py-2 px-4 bg-blue-700 hover:bg-blue-700 text-white rounded-md cursor-pointer border border-blue-500"
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
            <div className="card bg-gray-100 border-2 border-gray-300 rounded-md p-4 h-full flex flex-col justify-between">
              <div className="aspect-w-1 aspect-h-1 mb-4">
                <div className="card bg-gray-100 border-2 border-gray-300 rounded-md p-4 h-60 flex flex-col justify-between">
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
};

export default CardGrid;
