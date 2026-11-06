// // import { useState } from 'react'
// // import heroImg from './assets/hero.png'
// // import reactLogo from './assets/react.svg'
// // import viteLogo from './assets/vite.svg'
// // import './App.css'

// // function App() {
// //   const [count, setCount] = useState(0)

// //   return (
// //     <>
// //       <section id="center">
// //         <div className="hero">
// //           <img src={heroImg} className="base" width="170" height="179" alt="" />
// //           <img src={reactLogo} className="framework" alt="React logo" />
// //           <img src={viteLogo} className="vite" alt="Vite logo" />
// //         </div>
// //         <div>
// //           <h1>Get started</h1>
// //           <p>
// //             Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
// //           </p>
// //         </div>
// //         <button
// //           type="button"
// //           className="counter"
// //           onClick={() => setCount((count) => count + 1)}
// //         >
// //           Count is {count}
// //         </button>
// //       </section>

// //       <div className="ticks"></div>

// //       <section id="next-steps">
// //         <div id="docs">
// //           <svg className="icon" role="presentation" aria-hidden="true">
// //             <use href="/icons.svg#documentation-icon"></use>
// //           </svg>
// //           <h2>Documentation</h2>
// //           <p>Your questions, answered</p>
// //           <ul>
// //             <li>
// //               <a href="https://vite.dev/" target="_blank">
// //                 <img className="logo" src={viteLogo} alt="" />
// //                 Explore Vite
// //               </a>
// //             </li>
// //             <li>
// //               <a href="https://react.dev/" target="_blank">
// //                 <img className="button-icon" src={reactLogo} alt="" />
// //                 Learn more
// //               </a>
// //             </li>
// //           </ul>
// //         </div>
// //         <div id="social">
// //           <svg className="icon" role="presentation" aria-hidden="true">
// //             <use href="/icons.svg#social-icon"></use>
// //           </svg>
// //           <h2>Connect with us</h2>
// //           <p>Join the Vite community</p>
// //           <ul>
// //             <li>
// //               <a href="https://github.com/vitejs/vite" target="_blank">
// //                 <svg
// //                   className="button-icon"
// //                   role="presentation"
// //                   aria-hidden="true"
// //                 >
// //                   <use href="/icons.svg#github-icon"></use>
// //                 </svg>
// //                 GitHub
// //               </a>
// //             </li>
// //             <li>
// //               <a href="https://chat.vite.dev/" target="_blank">
// //                 <svg
// //                   className="button-icon"
// //                   role="presentation"
// //                   aria-hidden="true"
// //                 >
// //                   <use href="/icons.svg#discord-icon"></use>
// //                 </svg>
// //                 Discord
// //               </a>
// //             </li>
// //             <li>
// //               <a href="https://x.com/vite_js" target="_blank">
// //                 <svg
// //                   className="button-icon"
// //                   role="presentation"
// //                   aria-hidden="true"
// //                 >
// //                   <use href="/icons.svg#x-icon"></use>
// //                 </svg>
// //                 X.com
// //               </a>
// //             </li>
// //             <li>
// //               <a href="https://bsky.app/profile/vite.dev" target="_blank">
// //                 <svg
// //                   className="button-icon"
// //                   role="presentation"
// //                   aria-hidden="true"
// //                 >
// //                   <use href="/icons.svg#bluesky-icon"></use>
// //                 </svg>
// //                 Bluesky
// //               </a>
// //             </li>
// //           </ul>
// //         </div>
// //       </section>

// //       <div className="ticks"></div>
// //       <section id="spacer"></section>
// //     </>
// //   )
// // }

// // export default App

// // import { useState } from "react";

// // function ShoppingCart() {
// //   const product = [
// //     {
// //       id: 1,
// //       name: 'Apple',
// //       price: 2
// //     },
// //     {
// //       id: 2,
// //       name: 'Orange',
// //       price: 3
// //     },
// //     {
// //       id: 3,
// //       name: 'Banana',
// //       price: 1.5
// //     },
// //   ];

// //   const [cart, setCart] = useState([]);

// //   const addToCart = (product) => {
// //     setCart([...cart, product]);
// //   };

// //   const removeFromCart = (index) => {
// //     const updatedCart = [...cart];
// //     updatedCart.splice(index, 1);
// //     setCart(updatedCart);
// //   };

// //   const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

// //   return (
// //     <div>
// //       <h2>Shopping Cart</h2>
// //       <h3>Products</h3>
// //       {product.map((product) => (
// //         <div key={product.id}>
// //           {product.name} - ${product.price}
// //           <button onClick={() => addToCart(product)}>Add</button>
// //         </div>
// //       ))}

// //       <h3>Cart</h3>
// //       {cart.map((item, index) => (
// //         <div key={index}>
// //           {item.name} - ${item.price}
// //           <button onClick={() => removeFromCart(index)}>Remove</button>
// //         </div>
// //       ))}

// //       <h3>Total: ${totalPrice.toFixed(2)}</h3>
// //     </div>
// //   );
// // }

// // export default ShoppingCart;

// import { useState } from "react";

// function TemperatureConverter() {
//   const [celcius, setCelcius] = useState('');
//   const [fahrenheit, setFahrenheit] = useState('');

//   const handleCelciusChange = (e) => {
//     const value = e.target.value;
//     setCelcius(value);
//     setFahrenheit(value === '' ? '' : ((value * 9) / 5 + 32).toFixed(2));
//   };

//   const handleFahrenheitChange = (e) => {
//     const value = e.target.value;
//     setFahrenheit(value);
//     setCelcius(value === '' ? '' : (((value - 32) * 5) / 9).toFixed(2));
//   };

//   return (
//     <div>
//       <h2>Temperature Converter</h2>
//       <label>
//         Celcius:
//         <input type="number" value={celcius} onChange={handleCelciusChange} />
//       </label>
//       <br />
//       <label>
//         Fahrenheit:
//         <input type="number" value={fahrenheit} onChange={handleFahrenheitChange} />
//       </label>
//     </div>
//   );
// }

// export default TemperatureConverter;

import { useState } from "react";

function ExpenseTracker() {
  // State untuk menyimpan daftar semua pengeluaran
  const [expenses, setExpenses] = useState([]);

  // State untuk form input pengeluaran baru
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");

  // State untuk kriteria filter kategori
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Fungsi untuk menambah pengeluaran baru
  const handleAddExpense = (e) => {
    e.preventDefault();

    if (!description || !amount) return;

    const newExpense = {
      id: Date.now(),
      description,
      amount: parseFloat(amount),
      category,
    };

    setExpenses([...expenses, newExpense]);

    // Reset input form
    setDescription("");
    setAmount("");
    setCategory("Food");
  };

  // Fungsi untuk menghapus pengeluaran berdasarkan ID
  const handleDeleteExpense = (id) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(updatedExpenses);
  };

  // Menyaring daftar pengeluaran berdasarkan kategori yang dipilih
  const filteredExpenses =
    selectedCategory === "All"
      ? expenses
      : expenses.filter((expense) => expense.category === selectedCategory);

  // Menghitung total pengeluaran dari daftar yang disaring
  const totalExpenses = filteredExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  return (
    <div style={{ maxWidth: "500px", margin: "20px auto", fontFamily: "sans-serif" }}>
      <h2>Personal Expense Tracker</h2>

      {/* Form Tambah Pengeluaran */}
      <form onSubmit={handleAddExpense} style={{ marginBottom: "20px" }}>
        <div>
          <label>Deskripsi: </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Contoh: Beli Makan Siang"
          />
        </div>
        <br />
        <div>
          <label>Jumlah ($): </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Contoh: 15"
          />
        </div>
        <br />
        <div>
          <label>Kategori: </label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Utilities">Utilities</option>
            <option value="Entertainment">Entertainment</option>
          </select>
        </div>
        <br />
        <button type="submit">Tambah Pengeluaran</button>
      </form>

      <hr />

      {/* Filter Berdasarkan Kategori */}
      <div style={{ margin: "20px 0" }}>
        <label>Filter Kategori: </label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">Semua Kategori</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Utilities">Utilities</option>
          <option value="Entertainment">Entertainment</option>
        </select>
      </div>

      {/* Daftar Pengeluaran */}
      <h3>Daftar Pengeluaran</h3>
      {filteredExpenses.length === 0 ? (
        <p>Belum ada pengeluaran.</p>
      ) : (
        <ul>
          {filteredExpenses.map((expense) => (
            <li key={expense.id} style={{ marginBottom: "8px" }}>
              <strong>{expense.description}</strong> - ${expense.amount.toFixed(2)}{" "}
              <em>({expense.category})</em>{" "}
              <button onClick={() => handleDeleteExpense(expense.id)}>Hapus</button>
            </li>
          ))}
        </ul>
      )}

      {/* Total Pengeluaran */}
      <h3>Total: ${totalExpenses.toFixed(2)}</h3>
    </div>
  );
}

export default ExpenseTracker;