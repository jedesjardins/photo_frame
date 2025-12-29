import { useState, useEffect } from 'react';

interface PhotoViewProps {
  photoId: string;
}

export default function PhotoView({photoId}: PhotoViewProps) {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  useEffect(() => {
    let objectUrl: string | null = null;

    const fetchPhoto = async () => {
      try {
        const res = await fetch(`/immich/assets/${photoId}/thumbnail?size=preview`);
        const blob = await res.blob();
        objectUrl = URL.createObjectURL(blob);
        setPhotoUrl(objectUrl);
      }
      catch (e) {
        console.log(`Error fetching photo: ${e}`);
      }
    };

    fetchPhoto();

    // Cleanup: revoke the object URL when component unmounts or photoId changes
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [photoId]);

  if (!photoUrl) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <img 
        src={photoUrl} 
        alt="Photo" 
        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
      />
    </div>
  );
} 