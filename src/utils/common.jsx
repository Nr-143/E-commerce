export const categories = [
  { id: "1", name: "Electronics" },
  { id: "2", name: "Clothing" },
  { id: "3", name: "Groceries" },
  { id: "4", name: "Mobiles" },
  { id: "5", name: "Gifts" },
  { id: "6", name: "Men" },
  { id: "7", name: "Women" },
  { id: "8", name: "Books" },
  { id: "9", name: "Kids" },
  { id: "10", name: "Service" }
];

export const categorySpecifications = {
  "1": [ // Electronics
    { key: "brand", label: "Brand", type: "text", required: true },
    { key: "batteryLife", label: "Battery Life", type: "text", required: false },
    { key: "warranty", label: "Warranty Period", type: "text", required: false },
    { key: "power", label: "Power (W)", type: "text", required: false },
    { key: "model", label: "Model", type: "text", required: true },
  ],
  "2": [ // Clothing
    { key: "size", label: "Size", type: "select", required: true, options: ["S", "M", "L", "XL", "XXL"] },
    { key: "material", label: "Material", type: "text", required: true },
    { key: "color", label: "Color", type: "text", required: false },
    { key: "fit", label: "Fit Type", type: "select", required: false, options: ["Regular", "Slim", "Loose"] },
    { key: "pattern", label: "Pattern", type: "text", required: false },
  ],
  "3": [ // Groceries
    { key: "expiryDate", label: "Expiry Date", type: "date", required: true },
    { key: "weight", label: "Weight", type: "text", required: true },
    { key: "brand", label: "Brand", type: "text", required: false },
    { key: "organic", label: "Organic", type: "boolean", required: false },
    { key: "packaging", label: "Packaging Type", type: "text", required: false },
  ],
  "4": [ // Mobiles
    { key: "brand", label: "Brand", type: "text", required: true },
    { key: "model", label: "Model", type: "text", required: true },
    { key: "ram", label: "RAM", type: "select", required: true, options: ["4GB", "6GB", "8GB", "12GB"] },
    { key: "storage", label: "Storage", type: "select", required: true, options: ["64GB", "128GB", "256GB", "512GB"] },
    { key: "battery", label: "Battery Capacity (mAh)", type: "text", required: false },
  ],
  "5": [ // Gifts
    { key: "occasion", label: "Occasion", type: "text", required: false },
    { key: "theme", label: "Theme", type: "text", required: false },
    { key: "customizable", label: "Customizable", type: "boolean", required: false },
    { key: "material", label: "Material", type: "text", required: false },
  ],
  "6": [ // Men
    { key: "size", label: "Size", type: "select", required: true, options: ["S", "M", "L", "XL", "XXL"] },
    { key: "material", label: "Material", type: "text", required: true },
    { key: "brand", label: "Brand", type: "text", required: false },
    { key: "color", label: "Color", type: "text", required: false },
  ],
  "7": [ // Women
    { key: "size", label: "Size", type: "select", required: true, options: ["XS", "S", "M", "L", "XL", "XXL"] },
    { key: "material", label: "Material", type: "text", required: true },
    { key: "brand", label: "Brand", type: "text", required: false },
    { key: "color", label: "Color", type: "text", required: false },
    { key: "pattern", label: "Pattern", type: "text", required: false },
  ],
  "8": [ // Books
    { key: "author", label: "Author", type: "text", required: true },
    { key: "publisher", label: "Publisher", type: "text", required: false },
    { key: "edition", label: "Edition", type: "text", required: false },
    { key: "language", label: "Language", type: "text", required: true },
    { key: "genre", label: "Genre", type: "text", required: false },
  ],
  "9": [ // Kids
    { key: "ageGroup", label: "Age Group", type: "select", required: true, options: ["0-1", "1-3", "3-5", "5-7", "7+"] },
    { key: "brand", label: "Brand", type: "text", required: false },
    { key: "material", label: "Material", type: "text", required: false },
    { key: "toyType", label: "Toy Type", type: "text", required: false },
  ],
  "10": [ // Service
    { key: "serviceType", label: "Service Type", type: "text", required: true },
    { key: "duration", label: "Duration", type: "text", required: false },
    { key: "provider", label: "Provider", type: "text", required: false },
    { key: "availability", label: "Availability", type: "boolean", required: false },
  ]
};
