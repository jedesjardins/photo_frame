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

  console.log(`Data: ${Object.entries(data)}`);

  return (
    <select>
        {Object.keys(data).map((key: string) => (<option key={key} onClick={() => onAlbumSelect(data[key])}>{key}</option>))}
    </select>
  );
}