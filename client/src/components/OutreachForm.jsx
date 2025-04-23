"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { createOutreach } from "../redux/slices/outreachSlice"
import { motion } from "framer-motion"

const OutreachForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { products } = useSelector((state) => state.products)
  const { loading, success } = useSelector((state) => state.outreaches)

  const [formData, setFormData] = useState({
    subreddit: "",
    productId: "",
    autoReply: false,
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (success) {
      navigate("/outreaches")
    }
  }, [success, navigate])

  const validateForm = () => {
    const newErrors = {}

    if (!formData.subreddit.trim()) {
      newErrors.subreddit = "Subreddit is required"
    } else if (!formData.subreddit.trim().startsWith("r/")) {
      newErrors.subreddit = "Subreddit must start with r/"
    }

    if (!formData.productId) {
      newErrors.productId = "Please select a product"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))

    // Clear error for this field when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    // Find the selected product to include its name
    const selectedProduct = products.find((p) => p.id.toString() === formData.productId.toString())

    const outreachData = {
      ...formData,
      productId: Number.parseInt(formData.productId),
      productName: selectedProduct ? selectedProduct.name : "Unknown Product",
    }

    dispatch(createOutreach(outreachData))
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-4">
          <label htmlFor="subreddit" className="block text-sm font-medium text-gray-700">
            Subreddit
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="subreddit"
              id="subreddit"
              value={formData.subreddit}
              onChange={handleChange}
              placeholder="r/marketing"
              className={`shadow-sm focus:ring-[#FF4500] focus:border-[#FF4500] block w-full sm:text-sm border-gray-300 rounded-md ${
                errors.subreddit ? "border-red-300" : ""
              }`}
            />
            {errors.subreddit && <p className="mt-2 text-sm text-red-600">{errors.subreddit}</p>}
          </div>
          <p className="mt-2 text-sm text-gray-500">Enter the subreddit you want to target (e.g., r/marketing).</p>
        </div>

        <div className="sm:col-span-4">
          <label htmlFor="productId" className="block text-sm font-medium text-gray-700">
            Product
          </label>
          <div className="mt-1">
            <select
              id="productId"
              name="productId"
              value={formData.productId}
              onChange={handleChange}
              className={`shadow-sm focus:ring-[#FF4500] focus:border-[#FF4500] block w-full sm:text-sm border-gray-300 rounded-md ${
                errors.productId ? "border-red-300" : ""
              }`}
            >
              <option value="">Select a product</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
            {errors.productId && <p className="mt-2 text-sm text-red-600">{errors.productId}</p>}
          </div>
          <p className="mt-2 text-sm text-gray-500">Select the product you want to promote in this subreddit.</p>
        </div>

        <div className="sm:col-span-6">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="autoReply"
                name="autoReply"
                type="checkbox"
                checked={formData.autoReply}
                onChange={handleChange}
                className="focus:ring-[#FF4500] h-4 w-4 text-[#FF4500] border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="autoReply" className="font-medium text-gray-700">
                Enable Auto-Reply
              </label>
              <p className="text-gray-500">Automatically reply to relevant posts in this subreddit.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => navigate("/outreaches")}
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF4500]"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#FF4500] hover:bg-[#e03d00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF4500] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Creating...
              </span>
            ) : (
              "Create Outreach"
            )}
          </button>
        </div>
      </div>
    </motion.form>
  )
}

export default OutreachForm
