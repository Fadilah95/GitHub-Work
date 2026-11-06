function ProductCard({
    id,
    name = "iPhone 18 Pro Max",
    price = 5999,
    image = "https://www.machines.com.my/cdn/shop/files/IMG-21444028_m_jpeg_1_535fe3b5-f0e2-4334-ae46-56d8769e226d.jpg?v=1788983149",
    isOnsale = true,
}) {

    return (
    <div className="product-card" style={styles.card}>
      {/* Badge for On Sale status */}
      {isOnsale && <span style={styles.badge}>On Sale</span>}

      {/* Product Image */}
      <div style={styles.imageContainer}>
        <img src={image} alt={name} style={styles.image} />
      </div>

      {/* Product Details */}
      <div style={styles.details}>
        <h3 style={styles.title}>{name}</h3>

        <p style={styles.finishesText}>Available in 4 finishes</p>

        {/* Color Dots */}
        <div style={styles.colorDots}>
          <span style={{ ...styles.dot, backgroundColor: '#4A1521' }} title="Burgundy" />
          <span style={{ ...styles.dot, backgroundColor: '#E1EBF5' }} title="Glacier" />
          <span style={{ ...styles.dot, backgroundColor: '#F0F0F0', border: '1px solid #ccc' }} title="Silver" />
          <span style={{ ...styles.dot, backgroundColor: '#333333' }} title="Black" />
        </div>

        <p style={styles.colorNames}>Burgundy, Glacier, Silver, Black</p>

        <p style={styles.price}>RM {price.toLocaleString()}</p>
      </div>
    </div>
  );
}

// Basic inline styles matching the provided layout
const styles = {
  card: {
    width: '300px',
    border: '1px solid #e0e0e0',
    borderRadius: '16px',
    padding: '20px',
    textAlign: 'center',
    fontFamily: 'sans-serif',
    position: 'relative',
    backgroundColor: '#fff',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  },
  badge: {
    position: 'absolute',
    top: '12px',
    left: '12px',
    backgroundColor: '#e63946',
    color: '#fff',
    padding: '4px 8px',
    borderRadius: '8px',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  imageContainer: {
    margin: '20px 0',
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
    objectFit: 'contain',
  },
  details: {
    marginTop: '10px',
  },
  title: {
    fontSize: '18px',
    fontWeight: '600',
    margin: '8px 0',
    color: '#1d1d1f',
  },
  finishesText: {
    fontSize: '12px',
    color: '#86868b',
    marginBottom: '8px',
  },
  colorDots: {
    display: 'flex',
    justifyContent: 'center',
    gap: '8px',
    marginBottom: '6px',
  },
  dot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    display: 'inline-block',
  },
  colorNames: {
    fontSize: '11px',
    color: '#6e6e73',
    margin: '4px 0 12px 0',
  },
  price: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#1d1d1f',
  },
};

export default ProductCard;