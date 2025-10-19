import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)


// ### 1️⃣ Submit new contact (simulate frontend form)
// POST http://localhost:5000/api/contact
// Content-Type: application/json

// {
//   "name": "Demo User",
//   "email": "demo@example.com",
//   "phone": "9876543210",
//   "message": "This is a test message from Postman or HTTP file."
// }

// ### 2️⃣ Get all submitted contacts (admin)
// GET http://localhost:5000/api/all

// ### 3️⃣ Delete a contact by ID (replace ID below after step 2)
// DELETE http://localhost:5000/api/ID_HERE
