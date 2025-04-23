"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOutreachById,
  fetchOutreachAnalytics,
} from "../redux/slices/outreachSlice";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const OutreachDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentOutreach, analytics, loading, error } = useSelector(
    (state) => state.outreaches
  );
  const { products } = useSelector((state) => state.products);

  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    dispatch(fetchOutreachById(id));
    dispatch(fetchOutreachAnalytics(id));
  }, [dispatch, id]);

  const handleBack = () => {
    navigate("/outreaches");
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get product name
  const getProductName = (productId) => {
    const product = products.find((p) => p.id === productId);
    return product ? product.name : "Unknown Product";
  };

  // Get reply type display text
  const getReplyTypeText = (replyType) => {
    switch (replyType) {
      case "autoReplyOnce":
        return "Auto Reply Once";
      case "manualReplyOnce":
        return "Manual Reply Once";
      case "autoReplyComplete":
        return "Auto Reply Complete";
      default:
        return "Unknown";
    }
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Colors for charts
  const COLORS = ["#FF4500", "#0079D3", "#FF9D00", "#FFB000", "#00A6B3"];

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex justify-center items-center h-64">
        <svg
          className="animate-spin h-10 w-10 text-[#FF4500]"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentOutreach) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            Outreach not found
          </h3>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="md:flex md:items-center md:justify-between mb-6">
          <div className="flex-1 min-w-0">
            <div className="flex items-center">
              <button
                onClick={handleBack}
                className="mr-4 text-gray-400 hover:text-gray-600 focus:outline-none"
                aria-label="Go back"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </button>
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate pb-2">
                Outreach Campaign Details
              </h2>
            </div>
            <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                    currentOutreach.status
                  )}`}
                >
                  {currentOutreach.status.charAt(0).toUpperCase() +
                    currentOutreach.status.slice(1)}
                </span>
              </div>
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <svg
                  className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
                Created on {formatDate(currentOutreach.createdAt)}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("overview")}
              className={`${
                activeTab === "overview"
                  ? "border-[#FF4500] text-[#FF4500]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`${
                activeTab === "analytics"
                  ? "border-[#FF4500] text-[#FF4500]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Analytics
            </button>
            <button
              onClick={() => setActiveTab("subreddits")}
              className={`${
                activeTab === "subreddits"
                  ? "border-[#FF4500] text-[#FF4500]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Subreddits
            </button>
          </nav>
        </div>

        {/* Content based on active tab */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          {activeTab === "overview" && (
            <div>
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Outreach Campaign Information
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Details about this outreach campaign.
                </p>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Product
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {getProductName(currentOutreach.productId)}
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Subreddits
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <div className="flex flex-wrap gap-2">
                        {currentOutreach.subreddits.map((subreddit, index) => (
                          <a
                            key={index}
                            href={`https://reddit.com/${subreddit}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-blue-100 text-blue-800 hover:bg-blue-200"
                          >
                            {subreddit}
                          </a>
                        ))}
                      </div>
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Date Range
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {formatDate(currentOutreach.dateRange?.startDate)} to{" "}
                      {formatDate(currentOutreach.dateRange?.endDate)}
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Maximum Posts
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {currentOutreach.maxPosts}
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Reply Type
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {getReplyTypeText(currentOutreach.replyType)}
                    </dd>
                  </div>
                  {currentOutreach.replyType === "manualReplyOnce" &&
                    currentOutreach.replyMessage && (
                      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Reply Message
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          <div className="bg-gray-50 p-3 rounded-md">
                            {currentOutreach.replyMessage}
                          </div>
                        </dd>
                      </div>
                    )}
                </dl>
              </div>

              {/* Quick Stats */}
              {analytics && (
                <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    Quick Stats
                  </h3>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                      <div className="px-4 py-5 sm:p-6">
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Total Posts Found
                        </dt>
                        <dd className="mt-1 text-3xl font-semibold text-gray-900">
                          {analytics.totalPosts}
                        </dd>
                      </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                      <div className="px-4 py-5 sm:p-6">
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Total Replies
                        </dt>
                        <dd className="mt-1 text-3xl font-semibold text-gray-900">
                          {analytics.totalReplies}
                        </dd>
                      </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                      <div className="px-4 py-5 sm:p-6">
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Response Rate
                        </dt>
                        <dd className="mt-1 text-3xl font-semibold text-gray-900">
                          {analytics.responseRate}%
                        </dd>
                      </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                      <div className="px-4 py-5 sm:p-6">
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Conversion Rate
                        </dt>
                        <dd className="mt-1 text-3xl font-semibold text-gray-900">
                          {analytics.conversionRate}%
                        </dd>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                <div className="flex justify-end space-x-3">
                  <Link
                    to="/chat"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#0079D3] hover:bg-[#006bb9] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0079D3]"
                  >
                    View Conversations
                  </Link>
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#FF4500] hover:bg-[#e03d00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF4500]"
                  >
                    Edit Campaign
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "analytics" && analytics && (
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-6">
                Performance Analytics
              </h3>

              {/* Engagement Over Time Chart */}
              <div className="mb-8">
                <h4 className="text-base font-medium text-gray-700 mb-4">
                  Engagement Over Time
                </h4>
                <div className="bg-white p-4 rounded-lg shadow">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                      data={analytics.dailyEngagement}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="views"
                        stroke="#0079D3"
                        activeDot={{ r: 8 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="replies"
                        stroke="#FF4500"
                      />
                      <Line type="monotone" dataKey="clicks" stroke="#FFB000" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Engagement Distribution Chart */}
              <div className="mb-8">
                <h4 className="text-base font-medium text-gray-700 mb-4">
                  Engagement Distribution
                </h4>
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={analytics.engagementDistribution}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) =>
                              `${name}: ${(percent * 100).toFixed(0)}%`
                            }
                          >
                            {analytics.engagementDistribution.map(
                              (entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={COLORS[index % COLORS.length]}
                                />
                              )
                            )}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div>
                      <div className="grid grid-cols-1 gap-4">
                        {analytics.engagementDistribution.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                          >
                            <div className="flex items-center">
                              <div
                                className="w-4 h-4 rounded-full mr-2"
                                style={{
                                  backgroundColor:
                                    COLORS[index % COLORS.length],
                                }}
                              ></div>
                              <span className="text-sm font-medium text-gray-700">
                                {item.name}
                              </span>
                            </div>
                            <span className="text-sm text-gray-500">
                              {item.value} users
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Conversion Funnel */}
              <div className="mb-8">
                <h4 className="text-base font-medium text-gray-700 mb-4">
                  Conversion Funnel
                </h4>
                <div className="bg-white p-4 rounded-lg shadow">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={analytics.conversionFunnel}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" fill="#FF4500" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Key Metrics Table */}
              <div>
                <h4 className="text-base font-medium text-gray-700 mb-4">
                  Key Metrics
                </h4>
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Metric
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Value
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Change
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {analytics.keyMetrics.map((metric, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {metric.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {metric.value}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                metric.change > 0
                                  ? "bg-green-100 text-green-800"
                                  : metric.change < 0
                                  ? "bg-red-100 text-red-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {metric.change > 0 ? "+" : ""}
                              {metric.change}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "subreddits" && analytics && (
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-6">
                Subreddit Performance
              </h3>

              {/* Subreddit Comparison Chart */}
              <div className="mb-8">
                <h4 className="text-base font-medium text-gray-700 mb-4">
                  Subreddit Engagement Comparison
                </h4>
                <div className="bg-white p-4 rounded-lg shadow">
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                      data={analytics.subredditPerformance}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="views" fill="#0079D3" />
                      <Bar dataKey="replies" fill="#FF4500" />
                      <Bar dataKey="conversions" fill="#FFB000" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Subreddit Details Table */}
              <div>
                <h4 className="text-base font-medium text-gray-700 mb-4">
                  Subreddit Details
                </h4>
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Subreddit
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Posts
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Replies
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Response Rate
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Conversion Rate
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {analytics.subredditDetails.map((subreddit, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            <a
                              href={`https://reddit.com/${subreddit.name}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#0079D3] hover:underline"
                            >
                              {subreddit.name}
                            </a>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {subreddit.posts}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {subreddit.replies}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {subreddit.responseRate}%
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {subreddit.conversionRate}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default OutreachDetailPage;
