'use client';

import { useCart } from '@/app/context/CartContext';

export default function CarritoPage() {
  const { cartItems, removeItem, clearCart } = useCart();

  const sendOrder = () => {
    if (cartItems.length === 0) {
      alert('El carrito está vacío.');
      return;
    }

    const message = cartItems
      .map((item, i) => `${i + 1}. ${item.name} - Cantidad: ${item.quantity}`)
      .join('\n');

      const finalMessage = `Hola, quiero hacer el siguiente pedido:\n${message}`;
        const encoded = encodeURIComponent(finalMessage);
        const url = `https://wa.me/5493513804567?text=${encoded}`;

        window.open(url, '_blank');};

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Carrito de compras</h1>
      {cartItems.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <>
          <ul className="space-y-2 mb-4">
            {cartItems.map((item) => (
              <li
                key={`${item.id}-${item.size ?? 'default'}-${item.color ?? 'default'}`}
                className="flex justify-between items-center border p-2 rounded"
              >
                <span>
                  {item.name} {item.size ? `- Talle: ${item.size}` : ''}{' '}
                  {item.color ? `- Color: ${item.color}` : ''} (x{item.quantity})
                </span>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-600 hover:underline"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={sendOrder}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Enviar pedido por WhatsApp
          </button>
        </>
      )}
    </div>
  );
}
