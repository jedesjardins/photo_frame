import { useState, useEffect } from 'react';


export default function AlbumSelector({onAlbumSelect, onAlbumsLoaded}) {
  const apiKey = import.meta.env.VITE_API_KEY;

  const [data, setData] = useState([] as string[]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/immich/albums`);

        const dt = (await res.json()).reduce((acc, album) => {
          acc[album.albumName] = album.id;
          return acc;
        }, {} as Record<string, string>);

        setData(dt);

        if (onAlbumsLoaded) {
          onAlbumsLoaded(dt);
        }
      } catch (e) {
          console.log(`Error: ${e}`);
      }
    };
    fetchData();
  }, []);

  console.log(`Albums: ${Object.entries(data)}`);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const albumId = e.target.value;
    onAlbumSelect(albumId);
  };

  return (
    <select onChange={handleChange}>
        {Object.keys(data).map((key: string) => (<option key={key} value={data[key]}>{key}</option>))}
    </select>
  );
}