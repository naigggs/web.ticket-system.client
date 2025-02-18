export const getBadgeColor = (status: string) => {
  const colors = {
    Open: "bg-green-200 text-green-600",
    "In Progress": "bg-yellow-200 text-yellow-500",
    "On Hold": "bg-red-200 text-red-600",
    "Resolved": "bg-purple-200 text-purple-600",
    Closed: "bg-blue-200 text-blue-500",
  };

  // Use type assertion to ensure TypeScript understands the keys
  return colors[status as keyof typeof colors] || "bg-gray-200 text-gray-600"; // Fallback for unknown statuses
};