import { useState } from 'react'

function InventoryForm({ inputRef, onAddItem, onClose }) {
  const [name, setName] = useState('')
  const [sku, setSku] = useState('')
  const [category, setCategory] = useState('')
  const [aisle, setAisle] = useState('')
  const [quantity, setQuantity] = useState('1')
  const [reorderLevel, setReorderLevel] = useState('3')
  const [unit, setUnit] = useState('pieces')

  function handleSubmit(event) 
  {
    event.preventDefault()

    const newItem = {
      id: Date.now(),
      name,
      sku,
      category,
      aisle,
      quantity: parseInt(quantity),
      reorderLevel: parseInt(reorderLevel),
      unit,
    }

    onAddItem(newItem)
    onClose()
  }

  return (
    <form className="inventory-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <div>
          <p className="eyebrow">New stock record</p>
          <h2>Log an item before it disappears.</h2>
        </div>
        <button type="button" className="text-button" onClick={onClose}>Close form</button>
      </div>

      <div className="form-grid">
        <label>
          Product name
          <input ref={inputRef} value={name} onChange={(event) => setName(event.target.value)} required />
        </label>
        <label>
          SKU
          <input value={sku} onChange={(event) => setSku(event.target.value)} required />
        </label>
        <label>
          Category
          <input value={category} onChange={(event) => setCategory(event.target.value)} required />
        </label>
        <label>
          Location
          <input value={aisle} onChange={(event) => setAisle(event.target.value)} required />
        </label>
        <label>
          Quantity
          <input type="number" min="0" value={quantity} onChange={(event) => setQuantity(event.target.value)} required />
        </label>
        <label>
          Reorder level
          <input type="number" min="0" value={reorderLevel} onChange={(event) => setReorderLevel(event.target.value)} required />
        </label>
        <label>
          Unit
          <select value={unit} onChange={(event) => setUnit(event.target.value)}>
            <option value="pieces">Pieces</option>
            <option value="boxes">Boxes</option>
            <option value="packs">Packs</option>
            <option value="rolls">Rolls</option>
          </select>
        </label>
      </div>

      <button type="submit" className="primary-button">Add to Malventory</button>
    </form>
  )
}

export default InventoryForm
