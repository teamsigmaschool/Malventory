function InventoryRow({ item, onChangeQuantity, onDelete }) {
  
  const isLowStock = item.quantity <= item.reorderLevel

  return (
    <article className={isLowStock ? 'inventory-row low-stock-row' : 'inventory-row'}>
      <div className="item-identity">
        <p className="eyebrow">{item.sku} · {item.aisle}</p>
        <h3>{item.name}</h3>
        <p>{item.category}</p>
      </div>

      <div className="item-stock">
        <span className="stock-number">{item.quantity}</span>
        <span>{item.unit}</span>
      </div>

      <div className="item-status">
        {isLowStock ? <span className="status-badge low-stock">Reorder at {item.reorderLevel}</span> : <span className="status-badge stable-stock">Stable stock</span>}
      </div>

      <div className="item-actions">
        <button type="button" className="quantity-button" onClick={() => onChangeQuantity(item.id, -1)} disabled={item.quantity === 0}>Use one</button>
        <button type="button" className="quantity-button" onClick={() => onChangeQuantity(item.id, 1)}>Receive one</button>
        <button type="button" className="delete-button" onClick={() => onDelete(item.id)}>Remove</button>
      </div>
    </article>
  )
}

export default InventoryRow
