"use client"

import { motion } from "framer-motion"

const OutreachCard = ({ outreach, onDelete }) => {
  // Function to determine status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <motion.div
      className="bg-white overflow-hidden shadow rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      layout
    >
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg leading-6 font-medium text-gray-900">{outreach.subreddit}</h3>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(outreach.status)}`}
          >
            {outreach.status.charAt(0).toUpperCase() + outreach.status.slice(1)}
          </span>
        </div>
        <div className="mt-2">
          <p className="text-sm text-gray-500">Product: {outreach.productName}</p>
          <p className="text-sm text-gray-500">Auto-reply: {outreach.autoReply ? "Enabled" : "Disabled"}</p>
          <p className="text-sm text-gray-500">Created: {outreach.createdAt}</p>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-4 sm:px-6 flex justify-between">
        <a
          href={`https://reddit.com/${outreach.subreddit}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-[#0079D3] hover:bg-[#006bb9] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0079D3]"
        >
          Visit Subreddit
        </a>
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

export default OutreachCard
