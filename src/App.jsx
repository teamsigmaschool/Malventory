import { useEffect, useRef, useState } from 'react'
import './App.css'

import InventoryForm from './components/InventoryForm.jsx'
import InventoryRow from './components/InventoryRow.jsx'
import StockWatch from './components/StockWatch.jsx'
import inventory from './data/inventory.json'

function App() {
  const [items, setItems] = useState(inventory)
  const [searchTerm, setSearchTerm] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isWatchVisible, setIsWatchVisible] = useState(true)
  const itemNameInputRef = useRef(null)

  useEffect(() => 
  {
    if (isFormOpen) 
    {
      itemNameInputRef.current.focus()
    }

  }, [isFormOpen])
 
  function addItem(newItem)
  {
    setItems((previousItems) => [...previousItems, newItem])
  }

  function changeQuantity(id, amount)
  {
    setItems((previousItems) => previousItems.map((item) => 
    {
      if (item.id === id)
      {
        let nextQuantity = item.quantity + amount

        if (nextQuantity < 0)
        {
          nextQuantity = 0
        }

        return {
          id: item.id,
          name: item.name,
          sku: item.sku,
          category: item.category,
          aisle: item.aisle,
          quantity: nextQuantity,
          reorderLevel: item.reorderLevel,
          unit: item.unit,
        }
      }

      return item
    }))
  }

  function deleteItem(id) {
    setItems((previousItems) => previousItems.filter((item) => item.id !== id))
  }


  let totalUnits = 0

  for (let index = 0; index < items.length; index += 1)
  {
    totalUnits += items[index].quantity
  }


  const lowStockItems = items.filter((item) => item.quantity <= item.reorderLevel)
  const visibleItems = items.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.category.toLowerCase().includes(searchTerm.toLowerCase()))


  return (
    <main>
      <section className="hero-shell">
        <div className="hero-copy">
          <p className="brand-mark"><span>MV</span> MALVENTORY</p>
          <p className="eyebrow">Stock recovery desk - Open ledger</p>
          <h1>Keep It Topped Up and Working.</h1>
          <p className="hero-description">A place to spot missing stock, correct quantities, and keep the headaches away.</p>
        </div>

        <div className="hero-stats" aria-label="Inventory summary">
          <div>
            <span>{items.length}</span>
            <p>Active SKUs</p>
          </div>
          <div>
            <span>{totalUnits}</span>
            <p>Units on hand</p>
          </div>
          <div className={lowStockItems.length > 0 ? 'attention-stat' : ''}>
            <span>{lowStockItems.length}</span>
            <p>Need attention</p>
          </div>
        </div>
      </section>

      <section className="control-bar" aria-label="Inventory controls">
        <div className="search-control">
          <label htmlFor="inventory-search">Search the stockroom</label>
          <input id="inventory-search" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Try coffee, packaging, stationery..." />
        </div>

        <div className="control-actions">
          <button type="button" className="text-button" onClick={() => setIsWatchVisible(!isWatchVisible)}>{isWatchVisible ? 'Pause Stock Watch' : 'Start Stock Watch'}</button>
          <button type="button" className="primary-button" onClick={() => setIsFormOpen(true)}>New item</button>
        </div>

        {isWatchVisible ? <StockWatch /> : <p className="watch-status paused-status">Stock Watch is paused. The timer has been cleaned up.</p>}
      </section>

      {isFormOpen ? <InventoryForm inputRef={itemNameInputRef} onAddItem={addItem} onClose={() => setIsFormOpen(false)} /> : null}

      <section className="inventory-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Live list</p>
            <h2>Every item.</h2>
          </div>
          <p>{visibleItems.length} records shown</p>
        </div>

        <div className="inventory-list">
          {visibleItems.map((item) => <InventoryRow key={item.id} item={item} onChangeQuantity={changeQuantity} onDelete={deleteItem} />)}
        </div>

        {visibleItems.length === 0 ? <div className="empty-state"><p className="eyebrow">Nothing found</p><h2>No stock record matches that search.</h2><button type="button" className="text-button" onClick={() => setSearchTerm('')}>Clear search</button></div> : null}
      </section>
    </main>
  )
}

export default App
