"use client"

import { motion } from "framer-motion"

const ProductCard = ({ product, onEdit, onDelete }) => {
  return (
    <motion.div
      className="bg-white overflow-hidden shadow rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      layout
    >
      <div className="relative">
        <img
          className="h-48 w-full object-cover"
          src={product.image || "https://via.placeholder.com/300x150?text=Product+Image"}
          alt={product.name}
        />
      </div>
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">{product.name}</h3>
        <p className="mt-1 text-sm text-gray-500 line-clamp-3">{product.description}</p>
        {product.price && <p className="mt-2 text-sm font-semibold text-gray-900">${product.price.toFixed(2)}</p>}
      </div>
      <div className="bg-gray-50 px-4 py-4 sm:px-6 flex justify-between">
        <button
          onClick={onEdit}
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-[#0079D3] hover:bg-[#006bb9] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0079D3]"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Delete
        </button>
      </div>
    </motion.div>
  )
}

export default ProductCard
