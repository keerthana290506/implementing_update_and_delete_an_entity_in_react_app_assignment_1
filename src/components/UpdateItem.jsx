import { useState, useEffect } from "react";

const UpdateItem = ({ item }) => {
  // 1. Create a state for the form
  const [formData, setFormData] = useState({ name: "", status: "" });

  // Set initial values when the item is available
  useEffect(() => {
    if (item) {
      setFormData({ name: item.name || "", status: item.status || "" });
    }
  }, [item]);

  // 3. Create a function to handle the form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 2. Create a function to handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting:", formData);

    try {
      const response = await fetch(`http://${import.meta.env.VITE_API_URI}/doors/${item.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update item");
      }

      console.log("Item updated successfully!");
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  if (!item) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Door Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </label>

      <label>
        Status:
        <select name="status" value={formData.status} onChange={handleChange} required>
          <option value="">Select Status</option>
          <option value="open">Open</option>
          <option value="closed">Closed</option>
          <option value="locked">Locked</option>
        </select>
      </label>

      <button type="submit">Update Door</button>
    </form>
  );
};

export default UpdateItem;



