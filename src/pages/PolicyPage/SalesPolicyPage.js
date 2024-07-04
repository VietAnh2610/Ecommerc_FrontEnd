import React from "react";
import "./PolicyPage.scss";
import { Link } from "react-router-dom";

const SalesPolicyPage = () => {
  return (
    <div className="container px-5 form-policy">
      <div class="signup_header">
        <Link className="link-homepage" to="/">
          Trang chủ
        </Link>
        <p>/</p>
        <p style={{ color: "rgb(191, 191, 191)", marginLeft: "10px" }}>
          Chính sách bán hàng
        </p>
      </div>

      <h1>Chính sách bán hàng</h1>

      <div className="form-policy-second">
        <h2>1. Đặt hàng</h2>
        <p>
          Hiện tại khách hàng có thể đến trực tiếp các địa chỉ mua hàng của
          EGA-MEN để mua hàng trực tiếp hoặc đặt hàng. Đồng thời chúng tôi tiếp
          nhận đơn hàng qua điện thoại:
          <br />
          Hiện tại chúng tôi hỗ trợ đặt hàng với 03 hình thức sau đây:
          <ul>
            <li>Đặt hàng trực tiếp tại cửa hàng</li>
            <li>Đặt hàng trực tuyến</li>
            <li>Đặt hàng qua hotline: 0999999999</li>
          </ul>
        </p>
      </div>

      <div className="form-policy-second">
        <h2>2. Xác nhận đơn hàng</h2>
        <p>
          Chúng tôi sẽ sử dụng các thông khách hàng cung cấp để tiến hành xác
          nhận đơn hàng.
        </p>
      </div>

      <div className="form-policy-second">
        <h2>3. Thay đổi, hủy giao dịch tại</h2>
        <p>
          Trong mọi trường hợp quý khách đều có quyền hủy bỏ đơn hàng sau khi
          thực hiện các biện pháp sau: Thông báo cho về việc hủy đơn hàng qua
          đường dây nóng 0999999998
        </p>
      </div>

      <div className="form-policy-second">
        <h2>4. Chương trình ưu đãi</h2>
        <p>
          EGA-MEN có áp dụng chương trình chiết khấu ưu đãi dành cho khách hàng
          tại từng thời điểm cụ thể khác nhau
        </p>
      </div>
    </div>
  );
};

export default SalesPolicyPage;
