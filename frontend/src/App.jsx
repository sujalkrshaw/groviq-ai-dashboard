import { useEffect, useState } from "react";
import axios from "axios";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  BarChart,
  Bar,
} from "recharts";

const COLORS = [
  "#06b6d4",
  "#8b5cf6",
  "#22c55e",
  "#f59e0b",
];

function App() {
  const [groceries, setGroceries] = useState([
    {
      _id: 1,
      name: "Milk",
      category: "Dairy",
      quantity: 2,
    },
    {
      _id: 2,
      name: "Bread",
      category: "Bakery",
      quantity: 1,
    },
    {
      _id: 3,
      name: "Rice",
      category: "Grains",
      quantity: 10,
    },
    {
      _id: 4,
      name: "Vegetables",
      category: "Fresh",
      quantity: 5,
    },
    {
      _id: 5,
      name: "Eggs",
      category: "Protein",
      quantity: 12,
    },
    {
      _id: 6,
      name: "Juice",
      category: "Beverages",
      quantity: 3,
    },
    {
      _id: 7,
      name: "Snacks",
      category: "Packed",
      quantity: 7,
    },
  ]);

  const [search, setSearch] = useState("");
  const [billImage, setBillImage] = useState(null);

  const [activeMenu, setActiveMenu] =
    useState("Dashboard");

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
  });

  const lowStockItems = groceries.filter(
    (item) => item.quantity <= 2
  );

  const expiringSoon = groceries.filter(
    (item) => item.quantity <= 2
  );

  const inventoryHealth =
    groceries.length > 0
      ? Math.round(
          ((groceries.length -
            expiringSoon.length) /
            groceries.length) *
            100
        )
      : 100;

  const totalValue = groceries.reduce(
    (acc, item) =>
      acc + Number(item.quantity) * 10,
    0
  );

  const chartData = [
    {
      name: "Healthy",
      value:
        groceries.length -
        lowStockItems.length,
    },
    {
      name: "Low Stock",
      value: lowStockItems.length,
    },
  ];

  const lineData = [
    { name: "Mon", usage: 4 },
    { name: "Tue", usage: 7 },
    { name: "Wed", usage: 5 },
    { name: "Thu", usage: 9 },
    { name: "Fri", usage: 6 },
    { name: "Sat", usage: 10 },
    { name: "Sun", usage: 8 },
  ];

  const categoryData = [
    {
      name: "Dairy",
      value: 12,
    },
    {
      name: "Fresh",
      value: 18,
    },
    {
      name: "Packed",
      value: 10,
    },
    {
      name: "Bakery",
      value: 8,
    },
  ];

  const addItem = () => {
    if (
      !formData.name ||
      !formData.category ||
      !formData.quantity
    )
      return;

    const newItem = {
      _id: Date.now(),
      name: formData.name,
      category: formData.category,
      quantity: Number(formData.quantity),
    };

    setGroceries([...groceries, newItem]);

    setFormData({
      name: "",
      category: "",
      quantity: "",
    });
  };

  const deleteItem = (id) => {
    setGroceries(
      groceries.filter(
        (item) => item._id !== id
      )
    );
  };

  return (
    <div className="flex min-h-screen text-white bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#111827]">

      {/* SIDEBAR */}

      <div className="w-[220px] bg-[#081028]/95 backdrop-blur-xl border-r border-slate-800 p-4 flex flex-col justify-between">

        <div>

          <div className="mb-8">
            <h1 className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
              GroviQ AI
            </h1>

            <p className="text-slate-400 text-sm">
              Grocery Intelligence SaaS
            </p>
          </div>

          <div className="space-y-3">

            {[
              {
                name: "Dashboard",
                icon: "🏠",
                color:
                  "from-purple-600 to-indigo-600",
              },
              {
                name: "Inventory",
                icon: "📦",
                color:
                  "from-cyan-500 to-blue-600",
              },
              {
                name: "Smart Alerts",
                icon: "🚨",
                color:
                  "from-red-500 to-pink-600",
              },
              {
                name: "AI Insights",
                icon: "🤖",
                color:
                  "from-green-500 to-emerald-600",
              },
              {
                name: "Analytics",
                icon: "📊",
                color:
                  "from-pink-500 to-purple-600",
              },
              {
                name: "Recommendations",
                icon: "💡",
                color:
                  "from-yellow-500 to-orange-500",
              },
            ].map((item) => (
              <div
                key={item.name}
                onClick={() =>
                  setActiveMenu(item.name)
                }
                className={`p-4 rounded-xl flex items-center gap-3 cursor-pointer border transition-all duration-300 hover:scale-[1.02]

                ${
                  activeMenu === item.name
                    ? `bg-gradient-to-r ${item.color} border-white/20`
                    : "bg-white/5 border-slate-700"
                }`}
              >
                <span className="text-2xl">
                  {item.icon}
                </span>

                <div>
                  <h2 className="font-bold">
                    {item.name}
                  </h2>

                  <p className="text-xs text-slate-300">
                    AI Module
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI BOX */}

        <div className="bg-gradient-to-br from-pink-600/20 to-purple-700/20 p-5 rounded-2xl border border-pink-500/20">

          <h2 className="text-2xl font-bold mb-4">
            🧠 AI Waste Prevention
          </h2>

          <p className="text-slate-300 leading-7">
            AI predicts grocery waste
            before expiry and optimizes
            inventory health.
          </p>

          <div className="mt-5 text-green-400 font-bold text-xl">
            87% Efficiency 🚀
          </div>
        </div>
      </div>

      {/* MAIN */}

      <div className="flex-1 p-6 overflow-y-auto">

        {/* TOPBAR */}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-6">

          <div>
            <h1 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-cyan-400 via-blue-300 to-pink-500 bg-clip-text text-transparent">
              {activeMenu} ✨
            </h1>

            <p className="text-slate-400 text-lg">
              AI-Powered Grocery Intelligence Platform
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">

            <div className="w-12 h-12 rounded-full border border-slate-700 bg-white/5 flex items-center justify-center">
              🔔
            </div>

            <div className="w-12 h-12 rounded-full border border-slate-700 bg-white/5 flex items-center justify-center">
              🌙
            </div>

            <div className="bg-green-500/20 text-green-400 px-5 py-2 rounded-full border border-green-500/30 font-bold">
              ⚡ AI ACTIVE
            </div>
          </div>
        </div>

        {/* SEARCH */}

        <input
          type="text"
          placeholder="Search inventory..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full bg-white/5 border border-slate-700 rounded-2xl p-4 mb-6 outline-none"
        />

        {/* KPI */}

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">

          <div className="bg-white/5 backdrop-blur-lg p-5 rounded-2xl border border-slate-800">
            <p className="text-slate-400">
              Total Items
            </p>

            <h2 className="text-5xl font-black text-cyan-400">
              {groceries.length}
            </h2>
          </div>

          <div className="bg-white/5 backdrop-blur-lg p-5 rounded-2xl border border-slate-800">
            <p className="text-slate-400">
              Low Stock
            </p>

            <h2 className="text-5xl font-black text-pink-400">
              {lowStockItems.length}
            </h2>
          </div>

          <div className="bg-white/5 backdrop-blur-lg p-5 rounded-2xl border border-slate-800">
            <p className="text-slate-400">
              Inventory Value
            </p>

            <h2 className="text-5xl font-black text-green-400">
              ₹{totalValue}
            </h2>
          </div>

          <div className="bg-white/5 backdrop-blur-lg p-5 rounded-2xl border border-slate-800">
            <p className="text-slate-400">
              AI Accuracy
            </p>

            <h2 className="text-5xl font-black text-yellow-400">
              94%
            </h2>
          </div>
        </div>

        {/* CHARTS */}

        <div className="grid lg:grid-cols-2 gap-4 mb-6">

          <div className="bg-white/5 backdrop-blur-lg p-5 rounded-2xl border border-slate-800">

            <h2 className="text-2xl font-bold mb-5">
              📊 Inventory Analytics
            </h2>

            <ResponsiveContainer
              width="100%"
              height={280}
            >
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  outerRadius={100}
                >
                  {chartData.map(
                    (entry, index) => (
                      <Cell
                        key={index}
                        fill={
                          COLORS[
                            index %
                              COLORS.length
                          ]
                        }
                      />
                    )
                  )}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white/5 backdrop-blur-lg p-5 rounded-2xl border border-slate-800">

            <h2 className="text-2xl font-bold mb-5">
              🤖 AI Prediction
            </h2>

            <ResponsiveContainer
              width="100%"
              height={280}
            >
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="usage"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ALERTS */}

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">

          <div className="bg-red-500/10 border border-red-500 p-5 rounded-2xl">
            <h2 className="text-xl font-bold text-red-400">
              🚨 Low Stock
            </h2>

            <p className="mt-3 text-slate-300">
              Milk quantity critically low.
            </p>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500 p-5 rounded-2xl">
            <h2 className="text-xl font-bold text-yellow-400">
              ⏳ Expiring Soon
            </h2>

            <p className="mt-3 text-slate-300">
              Bread may expire in 2 days.
            </p>
          </div>

          <div className="bg-cyan-500/10 border border-cyan-500 p-5 rounded-2xl">
            <h2 className="text-xl font-bold text-cyan-400">
              🤖 AI Suggestion
            </h2>

            <p className="mt-3 text-slate-300">
              Buy vegetables before rain.
            </p>
          </div>

          <div className="bg-green-500/10 border border-green-500 p-5 rounded-2xl">
            <h2 className="text-xl font-bold text-green-400">
              ♻ Waste Analytics
            </h2>

            <p className="mt-3 text-slate-300">
              Inventory health:
              {inventoryHealth}%
            </p>
          </div>
        </div>

        {/* OCR + ACTIVITY */}

        <div className="grid lg:grid-cols-2 gap-4 mb-6">

          <div className="bg-white/5 backdrop-blur-lg p-5 rounded-2xl border border-slate-800">

            <h2 className="text-2xl font-bold mb-5">
              🧾 OCR Scanner
            </h2>

            <input
              type="file"
              onChange={(e) =>
                setBillImage(
                  e.target.files[0]
                )
              }
              className="mb-4"
            />

            <button className="bg-gradient-to-r from-cyan-500 to-purple-600 px-5 py-3 rounded-xl font-bold">
              Scan Grocery Bill
            </button>

            {billImage && (
              <div className="mt-5 space-y-2 text-green-400">
                <p>
                  ✅ OCR Processing Complete
                </p>
                <p>✔ Milk</p>
                <p>✔ Bread</p>
                <p>✔ Rice</p>
                <p>✔ Eggs</p>
              </div>
            )}
          </div>

          <div className="bg-white/5 backdrop-blur-lg p-5 rounded-2xl border border-slate-800">

            <h2 className="text-2xl font-bold mb-5">
              ⚡ Recent Activity
            </h2>

            <div className="space-y-3 text-slate-300">
              <p>✔ Milk added</p>
              <p>✔ AI predicted expiry</p>
              <p>✔ OCR bill scanned</p>
              <p>✔ Bread removed</p>
            </div>
          </div>
        </div>

        {/* ADD ITEM */}

        <div className="bg-white/5 backdrop-blur-lg p-5 rounded-2xl border border-slate-800 mb-6">

          <h2 className="text-2xl font-bold mb-5">
            ➕ Add Grocery Item
          </h2>

          <div className="grid md:grid-cols-4 gap-4">

            <input
              type="text"
              placeholder="Item Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
              className="bg-white/5 border border-slate-700 rounded-xl p-3"
            />

            <input
              type="text"
              placeholder="Category"
              value={formData.category}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  category:
                    e.target.value,
                })
              }
              className="bg-white/5 border border-slate-700 rounded-xl p-3"
            />

            <input
              type="number"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  quantity:
                    e.target.value,
                })
              }
              className="bg-white/5 border border-slate-700 rounded-xl p-3"
            />

            <button
              onClick={addItem}
              className="bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl font-bold"
            >
              + Add Item
            </button>
          </div>
        </div>

        {/* TABLE */}

        <div className="bg-white/5 backdrop-blur-lg p-5 rounded-2xl border border-slate-800">

          <h2 className="text-2xl font-bold mb-5">
            📦 Inventory Table
          </h2>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-white/5">

                <tr>
                  <th className="p-4 text-left">
                    Item
                  </th>

                  <th className="p-4 text-left">
                    Category
                  </th>

                  <th className="p-4 text-left">
                    Quantity
                  </th>

                  <th className="p-4 text-left">
                    Status
                  </th>

                  <th className="p-4 text-left">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>

                {groceries
                  .filter((item) =>
                    item.name
                      .toLowerCase()
                      .includes(
                        search.toLowerCase()
                      )
                  )
                  .map((item) => (
                    <tr
                      key={item._id}
                      className="border-t border-slate-800 hover:bg-white/5"
                    >
                      <td className="p-4">
                        {item.name}
                      </td>

                      <td className="p-4">
                        {item.category}
                      </td>

                      <td className="p-4">
                        {item.quantity}
                      </td>

                      <td className="p-4">

                        {item.quantity <=
                        2 ? (
                          <span className="text-red-400">
                            Low Stock
                          </span>
                        ) : (
                          <span className="text-green-400">
                            Healthy
                          </span>
                        )}
                      </td>

                      <td className="p-4">
                        <button
                          onClick={() =>
                            deleteItem(
                              item._id
                            )
                          }
                          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl"
                        >
                          🗑
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CATEGORY CHART */}

        <div className="bg-white/5 backdrop-blur-lg p-5 rounded-2xl border border-slate-800 mt-6">

          <h2 className="text-2xl font-bold mb-5">
            📈 Inventory Categories
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />

              <Bar
                dataKey="value"
                fill="#06b6d4"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default App;