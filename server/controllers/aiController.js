const db = require('../db'); // Make sure this file exists!

const processAIQuery = async (message) => {
  const lower = message.toLowerCase();
  if (lower.includes("butter") && lower.includes("paneer")) {
    return "🧈 Butter Paneer Masala is available! ₹250 per plate.";
  }
  if (lower.includes("product")) {
    return "We offer various products like Butter Paneer, Dal Makhani, etc.";
  }
  if (lower.includes("vendor")) {
    return "Vendors include Punjabi Tadka, Rasoi Delight, and more.";
  }
  if (lower.includes("order")) {
    return "You can place orders via the Marketplace or call our helpline.";
  }
  return "🤖 I didn’t understand that. Try asking about products, vendors, or orders.";
};

module.exports = { processAIQuery };
