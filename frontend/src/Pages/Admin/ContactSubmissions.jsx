import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Loader2, Search, ArrowUpDown, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactSubmissions() {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [selectedContact, setSelectedContact] = useState(null);
  const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    filterAndSort();
  }, [search, sortOrder, contacts]);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/api/all`);
      const data = Array.isArray(res.data.data) ? res.data.data : [];
      setContacts(data);
      setFilteredContacts(data);
    } catch (err) {
      console.error("Error fetching contacts:", err);
      setError("Failed to load contact submissions.");
    } finally {
      setLoading(false);
    }
  };

  const filterAndSort = () => {
    let filtered = [...contacts];

    if (search.trim()) {
      const query = search.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.email.toLowerCase().includes(query)
      );
    }

    filtered.sort((a, b) =>
      sortOrder === "newest"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt)
    );

    setFilteredContacts(filtered);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) return;
    try {
      await axios.delete(`${API_BASE}/api/${id}`);
      setContacts((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Error deleting contact:", err);
      alert("Failed to delete contact.");
    }
  };

  // ✅ Animated full-page loader
  if (loading)
    return (
      <motion.div
        className="flex flex-col justify-center items-center h-[80vh] backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Loader2 className="animate-spin text-orange-500 mb-4" size={40} />
        <p className="text-gray-300 text-lg font-medium">
          Loading contact submissions...
        </p>
      </motion.div>
    );

  if (error)
    return (
      <div className="text-center text-red-500 font-semibold py-10">
        {error}
      </div>
    );

  return (
    <motion.div
      className="p-4 md:p-8 min-h-screen backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl shadow-lg text-white"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h2 className="text-3xl font-bold mb-6 text-white">
        Contact Submissions
      </h2>

      {/* 🔍 Search + Sort */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-3 text-gray-300" size={18} />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 border border-white/30 text-white placeholder-gray-300 focus:ring-2 focus:ring-orange-400 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <ArrowUpDown className="text-orange-400" size={18} />
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="bg-white/10 border border-white/30 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-orange-400 focus:outline-none"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      {/* 🧾 Table */}
      {filteredContacts.length === 0 ? (
        <p className="text-gray-300 text-center py-10">
          No contact submissions found.
        </p>
      ) : (
        <div className="overflow-x-auto bg-white/5 border border-white/20 rounded-xl shadow-lg backdrop-blur-lg">
          <table className="w-full border-collapse text-sm md:text-base">
            <thead className="bg-orange-500/80 text-white">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Message</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map((c) => (
                <motion.tr
                  key={c._id}
                  className="border-b border-white/10 hover:bg-white/10 transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="p-3 break-words">{c.name}</td>
                  <td className="p-3 break-words">{c.email}</td>
                  <td className="p-3">{c.phone || "—"}</td>
                  <td className="p-3">
                    {c.message.length > 25 ? (
                      <button
                        onClick={() => setSelectedContact(c)}
                        className="text-orange-400 underline hover:text-orange-300"
                      >
                        View Message
                      </button>
                    ) : (
                      c.message
                    )}
                  </td>
                  <td className="p-3 text-sm text-gray-300">
                    {new Date(c.createdAt).toLocaleString()}
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleDelete(c._id)}
                      className="text-red-400 hover:text-red-600 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 🎬 Animated Modal */}
      <AnimatePresence>
        {selectedContact && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-2xl p-6 max-w-lg w-full relative border-t-4 border-orange-500"
            >
              <button
                onClick={() => setSelectedContact(null)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>

              <h3 className="text-xl font-bold mb-4 text-[#0C226B] border-b pb-2">
                Contact Details
              </h3>

              <div className="space-y-3 text-sm sm:text-base text-gray-800">
                <p>
                  <strong>Name:</strong> {selectedContact.name}
                </p>
                <p>
                  <strong>Email:</strong> {selectedContact.email}
                </p>
                <p>
                  <strong>Phone:</strong> {selectedContact.phone || "—"}
                </p>
                <div>
                  <strong>Message:</strong>
                  <p className="text-gray-700 bg-gray-50 border border-gray-200 rounded-lg p-3 mt-1 whitespace-pre-line">
                    {selectedContact.message}
                  </p>
                </div>
                <p className="text-sm text-gray-500 pt-2">
                  Submitted on:{" "}
                  {new Date(selectedContact.createdAt).toLocaleString()}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
