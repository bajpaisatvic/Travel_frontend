import React, { useEffect, useState } from "react";
import axios from "axios";

const categories = [
  "Adventure",
  "Relaxation",
  "Cultural",
  "Luxury",
  "Wildlife",
  "Budget",
];

export default function AdminPanel() {
  const [packages, setPackages] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [showReviews, setShowReviews] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [packageToDelete, setPackageToDelete] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    category: categories[0],
    price: "",
  });

  const fetchPackages = async () => {
    try {
      const res = await axios.get(
        "https://travel-backend-1-s4yu.onrender.com/api/v1/packages/all"
      );
      setPackages(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch packages", err);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await axios.get(
        "https://travel-backend-1-s4yu.onrender.com/api/v1/review",
        {
          withCredentials: true,
        }
      );
      setReviews(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch reviews", err);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  useEffect(() => {
    if (showReviews) fetchReviews();
  }, [showReviews]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("image", formData.image);
      data.append("price", formData.price);

      await axios.post(
        "https://travel-backend-1-s4yu.onrender.com/api/v1/packages/add",
        data,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setFormData({
        name: "",
        description: "",
        image: "",
        category: categories[0],
        price: "",
      });

      fetchPackages();
    } catch (err) {
      console.error("Failed to add package", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://travel-backend-1-s4yu.onrender.com/api/v1/packages/${id}`,
        {
          withCredentials: true,
        }
      );
      fetchPackages();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const grouped = categories.map((cat) => ({
    name: cat,
    items: packages.filter((pkg) => pkg.category?.name === cat),
  }));

  return (
    <div className="min-h-screen p-6 dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 bg-gradient-to-br from-blue-50 to-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-800 dark:text-white">
          Admin Dashboard
        </h1>
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          onClick={() => setShowReviews((prev) => !prev)}
        >
          {showReviews ? "Back to Packages" : "View Reviews"}
        </button>
      </div>

      {showReviews ? (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl overflow-x-auto">
          <h2 className="text-2xl font-bold dark:text-white text-blue-700 mb-4">
            User Reviews
          </h2>
          {reviews.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead
                className="bg-blue-100 dark:bg-gray-600
              "
              >
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium dark:text-gray-200 text-gray-600">
                    Full Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium dark:text-gray-200 text-gray-600">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium dark:text-gray-200 text-gray-600">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium dark:text-gray-200 text-gray-600">
                    Message
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-500 dark:divide-gray-700 divide-y divide-gray-200">
                {reviews.map((rev) => (
                  <tr key={rev._id}>
                    <td className="px-6 py-4 text-sm dark:text-gray-100 text-gray-800">
                      {rev.fullname}
                    </td>
                    <td className="px-6 py-4 text-sm dark:text-gray-100 text-gray-800">
                      {rev.email}
                    </td>
                    <td className="px-6 py-4 text-sm dark:text-gray-100 text-gray-800">
                      {rev.phoneNumber}
                    </td>
                    <td className="px-6 py-4 text-sm dark:text-gray-100 text-gray-800">
                      {rev.message}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500 dark:text-white">No reviews found.</p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Add Form */}
          <div className="bg-white dark:bg-gray-700 border border-blue-200 dark:border-blue-700 p-6 rounded-xl shadow-xl col-span-1">
            <h2 className="text-2xl font-bold dark:text-white text-blue-700 mb-4">
              Add New Package
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full p-3 dark:bg-gray-400 dark:placeholder-gray-700 border border-gray-300  rounded-md focus:ring-2 focus:ring-blue-400"
                required
              />
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full p-3 dark:bg-gray-400 dark:placeholder-gray-700 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                required
              />
              <input
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="w-full p-3 dark:bg-gray-400 dark:placeholder-gray-700 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                required
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.files[0] })
                }
                className="w-full p-3 dark:bg-gray-400 dark:placeholder-gray-700 border border-gray-300 rounded-md"
                required
              />
              {formData.image && typeof formData.image !== "string" && (
                <img
                  src={URL.createObjectURL(formData.image)}
                  alt="Preview"
                  className="w-full h-40 object-cover mt-2 rounded-md"
                />
              )}
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full p-3 dark:bg-gray-400 dark:placeholder-gray-700 border border-gray-300 rounded-md"
              >
                {categories.map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 shadow-md transition"
              >
                Add Package
              </button>
            </form>
          </div>

          {/* Display Packages */}
          <div className="col-span-2 dark:bg-gray-800 bg-white p-6 rounded-xl shadow-xl overflow-y-auto max-h-screen">
            <h2 className="text-3xl font-bold dark:text-white text-blue-800 mb-6">
              Packages by Category
            </h2>
            {grouped.map((group) => (
              <div key={group.name} className="mb-8">
                <h3 className="text-xl font-semibold dark:text-gray-100 text-blue-700 mb-3">
                  {group.name}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {group.items.map((pkg) => (
                    <div
                      key={pkg._id}
                      className="bg-blue-50 dark:bg-gray-600 border border-blue-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
                    >
                      <img
                        src={pkg.image}
                        alt={pkg.title}
                        className="h-48 w-full object-cover"
                      />
                      <div className="p-4">
                        <h4 className="text-lg font-bold dark:text-white text-gray-800">
                          {pkg.name}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-200 text-sm mt-1">
                          {pkg.description.substring(0, 80)}...
                        </p>
                        <p className="text-blue-600 dark:text-gray-100 font-medium mt-2">
                          ₹{pkg.price}
                        </p>
                        <button
                          onClick={() => {
                            setShowModal(true);
                            setPackageToDelete(pkg._id);
                          }}
                          className="mt-3 inline-block bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                  {group.items.length === 0 && (
                    <p className="text-gray-500  italic col-span-full">
                      No packages in this category.
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-xl px-10 py-8 transition-all transform scale-100">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center">
              Are you sure you want to remove this package?
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-200 text-base mb-6">
              This package will no longer be available on the website.
            </p>
            <div className="flex justify-center gap-6">
              <button
                onClick={async () => {
                  await handleDelete(packageToDelete);
                  setShowModal(false);
                  setPackageToDelete(null);
                }}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-md shadow-md transition"
              >
                Yes, remove it
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  setPackageToDelete(null);
                }}
                className="bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-800 hover:bg-gray-300 dark:text-gray-200 text-gray-800 font-semibold px-6 py-3 rounded-md shadow-md transition"
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
