import { useState, useEffect } from 'react';

// Array gambar (menggunakan gambar percuma dari Unsplash)
const images = [
  { id: 1, title: 'Pemandangan Gunung', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800' },
  { id: 2, title: 'Hutan Hijau', url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800' },
  { id: 3, title: 'Tasik & Langit', url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800' },
  { id: 4, title: 'Pantai Matahari Terbenam', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800' }
];

function ImageGallery() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Mengendalikan navigasi papan ketik (keyboard)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        // Pindah ke gambar seterusnya (pusing balik ke awal jika dah sampai hujung)
        setSelectedIndex((prev) => (prev + 1) % images.length);
      } else if (e.key === 'ArrowLeft') {
        // Pindah ke gambar sebelumnya
        setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
      } else if (e.key === ' ') {
        // Spacebar: Buka / Tutup paparan skrin penuh (Fullscreen)
        e.preventDefault(); // Elak skrin scroll ke bawah
        setIsFullscreen((prev) => !prev);
      } else if (e.key === 'Escape') {
        // Escape: Tutup paparan skrin penuh
        setIsFullscreen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Cleanup listener bila komponen di-unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h2>Image Gallery with Keyboard Navigation</h2>
      
      {/* Panduan Penggunaan */}
      <div style={{ marginBottom: '15px', color: '#666', fontSize: '14px' }}>
        <p>💡 <b>Navigasi:</b> Guna anak panah <b>← / →</b> untuk tukar gambar | <b>Spacebar</b> untuk Fullscreen | <b>Esc</b> untuk Keluar | Klik gambar untuk pilih.</p>
      </div>

      {/* Paparan Gambar Utama */}
      <div style={{ marginBottom: '20px' }}>
        <img
          src={images[selectedIndex].url}
          alt={images[selectedIndex].title}
          onClick={() => setIsFullscreen(true)}
          style={{
            width: '600px',
            height: '350px',
            objectFit: 'cover',
            borderRadius: '8px',
            cursor: 'pointer',
            boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
          }}
        />
        <h3>{images[selectedIndex].title} ({selectedIndex + 1} / {images.length})</h3>
      </div>

      {/* Senarai Gambar Kecil (Thumbnails) */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        {images.map((img, index) => (
          <img
            key={img.id}
            src={img.url}
            alt={img.title}
            onClick={() => setSelectedIndex(index)}
            style={{
              width: '100px',
              height: '70px',
              objectFit: 'cover',
              borderRadius: '4px',
              cursor: 'pointer',
              border: selectedIndex === index ? '3px solid #007bff' : '2px solid transparent',
              opacity: selectedIndex === index ? 1 : 0.6,
              transition: 'all 0.2s ease'
            }}
          />
        ))}
      </div>

      {/* Paparan Skrin Penuh (Modal Fullscreen) */}
      {isFullscreen && (
        <div
          onClick={() => setIsFullscreen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.9)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }}
        >
          <img
            src={images[selectedIndex].url}
            alt={images[selectedIndex].title}
            style={{ maxWidth: '90%', maxHeight: '80%', borderRadius: '8px' }}
          />
          <p style={{ color: 'white', marginTop: '15px' }}>
            {images[selectedIndex].title} (Tekan <b>Esc</b> atau <b>Space</b> untuk tutup)
          </p>
        </div>
      )}
    </div>
  );
}

export default ImageGallery;