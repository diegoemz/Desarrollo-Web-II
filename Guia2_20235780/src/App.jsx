import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Header } from './Components/Header'
import { Footer } from './Components/Footer'
import { db } from './Data/db'
import { Guitar } from './Components/Guitar'

function App() {

  function initialCart() {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

  const [data, setData] = useState(db)
  const [cart, setCart] = useState(initialCart)
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  function addToCart(guitar) {
    const itemIndex = cart.findIndex((item) => guitar.id === item.id)
    console.log(itemIndex);
    if (itemIndex === -1) {
      //Ese articulo aún no existe en el carrito
      guitar.quantity = 1;
      setCart([...cart, guitar])
    } else { //si la guitarra ya se ha añadido al carrito
      const updatedCart = [...cart] //creando una copia de la variable de estado
      updatedCart[itemIndex].quantity++;
      setCart(updatedCart);
    }
  }

  function removeItem(guitarId) {
    setCart(cart.filter((item) => item.id !== guitarId));
  }

  function increaseQuantity(guitarId) {
    setCart(
      cart.map((item) =>
        item.id === guitarId ? { ...item, quantity: item.quantity + 1 } : item)
    );
  }

  function decreaseQuantity(guitarId) {
    setCart(
      cart.map((item) =>
        item.id === guitarId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ).filter(item => item.quantity > 0)
    );
  }

  function clearCart() {
    setCart([]);
  }

  function calculateTotal() {
    let total = cart.reduce((total, item) => total + item.price * item.quantity, 0)
    return total;
  }

  return (
    <>
      <Header cart={cart} total={calculateTotal()} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} removeItem={removeItem} clearCart={clearCart} />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar guitar={guitar} key={guitar.id} addToCart={addToCart} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}

export default App