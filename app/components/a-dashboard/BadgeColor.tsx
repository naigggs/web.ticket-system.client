export const getBadgeColor = (status: string) => {
    const colors = {
      todo: "bg-blue-200 text-blue-600",
      inprogress: "bg-yellow-200 text-yellow-600",
      onhold: "bg-red-200 text-red-600",
      done: "bg-green-200 text-green-600",
    };
    return colors[status as keyof typeof colors] || colors.todo;
};