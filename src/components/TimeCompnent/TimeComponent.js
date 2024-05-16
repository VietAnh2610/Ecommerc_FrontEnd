import React, { useState, useEffect } from "react";

const TimeComponent = () => {
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    // Gọi hàm để cập nhật thời gian ban đầu
    updateTime();

    // Thiết lập interval để cập nhật thời gian mỗi giây
    const intervalId = setInterval(updateTime, 1000);

    // Hàm cleanup để ngăn chặn memory leak khi component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []); // Rỗng để chỉ gọi useEffect một lần sau khi render lần đầu tiên

  const updateTime = () => {
    const now = new Date();
    const formattedDateTime = formatDate(now);
    setDateTime(formattedDateTime);
  };

  const formatDate = (date) => {
    const dayOfWeek = [
      "Chủ Nhật",
      "Thứ Hai",
      "Thứ Ba",
      "Thứ Tư",
      "Thứ Năm",
      "Thứ Sáu",
      "Thứ Bảy",
    ];
    const day = dayOfWeek[date.getDay()];
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${day}, ${dd}/${mm}/${yyyy} - ${hours}:${minutes}:${seconds}`;
  };

  return <div style={{fontWeight: 600, fontSize:14, marginRight:20}} className="clock">{dateTime}</div>;
};

export default TimeComponent;
