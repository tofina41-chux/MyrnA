import { useEffect, useState } from 'react'

function App() {
  const [status, setStatus] = useState("Connecting to backend...")

  useEffect(() => {
    // Note: Use your backend port (usually 5000)
    fetch('http://localhost:5000/api/status')
      .then(res => res.json())
      .then(data => setStatus(data.message))
      .catch(() => setStatus("Backend Offline ❌"))
  }, [])

  return (
    <div className="min-h-screen bg-[#F9F9F9] flex flex-col items-center justify-center">
      <div className="max-w-md w-full bg-white p-10 shadow-sm border border-gray-100 text-center">
        <h1 className="text-3xl font-serif tracking-tight text-gray-900 mb-2">
          MYR Art Direction©
        </h1>
        <p className="text-sm uppercase tracking-widest text-red-600 mb-8">
          Strategic Art • Curation • Social Impact
        </p>

        <div className="pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-400 mb-2 italic">Infrastructure Status:</p>
          <span className={`text-xs font-medium px-3 py-1 rounded-full ${status === "Connection Successful"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
            }`}>
            {status}
          </span>
        </div>
      </div>
    </div>
  )
}

export default App