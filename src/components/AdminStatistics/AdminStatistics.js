import React from "react";

const AdminStatistics = ({ orders }) => {
  // Tính tổng doanh thu từ danh sách đơn hàng, đảm bảo totalPrice là số
  const totalRevenue = orders.reduce((sum, order) => {
    // Chuyển đổi totalPrice sang số và cộng vào tổng
    const price = parseFloat(order.totalPrice.replace(/[^0-9.-]+/g, "")) || 0;
    return sum + price;
  }, 0);

  return (
    <div>
      <h2>Thống kê</h2>
      <p>
        Tổng doanh thu:{" "}
        {totalRevenue.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        })}
      </p>
    </div>
  );
};

export default AdminStatistics;
