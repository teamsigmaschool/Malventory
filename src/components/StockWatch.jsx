import { useEffect, useState } from 'react'

function StockWatch() {
  
  const [scanCount, setScanCount] = useState(0)

  useEffect(() => 
  {
    const intervalId = setInterval(() => 
    {
      setScanCount((previousCount) => previousCount + 1)
    }, 5000)

    return () => 
    {
      clearInterval(intervalId)
    }
  }, [])

  return (
    <p className="watch-status" role="status">
      Stock Watch is running. Check #{scanCount}
    </p>
  )
}

export default StockWatch
