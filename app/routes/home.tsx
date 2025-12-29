import PhotoView from "~/components/photo_view/photo_view";
import type { Route } from "./+types/home";
import AlbumSelector from "~/components/album_selector/album_selector";
import { useState, useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Immich Photos" },
    { name: "description", content: "Displays photos from Immich" },
  ];
}

export default function Home({loaderData}: Route.ComponentProps) {

  const [albumId, setAlbumId] = useState<string | null>(null);
  const [photoId, setPhotoId] = useState<string | null>(null);
  const [photoIds, setPhotoIds] = useState<string[]>([]);
  const [photoIndex, setPhotoIndex] = useState(0);

  const loggedSetAlbumId = (id: string) => {
    console.log(`Setting album ID to: ${id}`);
    setAlbumId(id);
  }

  const onAlbumsLoaded = (albums) => {
    if (albumId !== null) return;

    const firstAlbumId = Object.values(albums)[0];
    loggedSetAlbumId(firstAlbumId);
  }

  useEffect(() => {
    const loadAlbumPhotos = async () => {
      try {
        const res = await fetch(`/immich/albums/${albumId}`);
        const dt = await res.json();
        const ids = dt.assets.map((asset) => asset.id);

        setPhotoIds(ids);
        setPhotoIndex(0);
        setPhotoId(ids[0]);
      }
      catch (e) {
        console.log(`Error fetching photo: ${e}`);
      }
    };

    loadAlbumPhotos();
  }, [albumId]);

  // Timer to cycle through photos every 5 seconds
  useEffect(() => {
    if (photoIds.length === 0) return;

    const timer = setInterval(() => {
      setPhotoIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % photoIds.length;
        setPhotoId(photoIds[nextIndex]);
        return nextIndex;
      });
    }, 5000);

    return () => clearInterval(timer);
  }, [photoIds]);

  return ( 
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      {photoId && <PhotoView photoId={photoId}/>}
      <div style={{ position: 'absolute', top: 0, left: 0, zIndex: 10 }}>
        <AlbumSelector onAlbumSelect={loggedSetAlbumId} onAlbumsLoaded={onAlbumsLoaded}/>
      </div>
    </div>
  );

}
