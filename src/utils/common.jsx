export const categories = [
  { id: "1", name: "Electronics" },
  { id: "2", name: "Clothing" },
  { id: "3", name: "Groceries" },
];

export const categorySpecifications = {
  "1": [
    { key: "brand", label: "Brand", type: "text", required: true },
    { key: "batteryLife", label: "Battery Life", type: "text", required: false },
  ],
  "2": [
    { key: "size", label: "Size", type: "select", required: true, options: ["S", "M", "L", "XL"] },
    { key: "material", label: "Material", type: "text", required: true },
  ],
  "3": [
    { key: "expiryDate", label: "Expiry Date", type: "text", required: true },
    { key: "weight", label: "Weight", type: "text", required: true },
  ],
};
