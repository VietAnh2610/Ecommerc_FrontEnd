import React from "react";
import { Link } from "react-router-dom";

const DeliveryPolicy = () => {
  return (
    <div className="container px-5 form-policy">
      <div class="signup_header">
      <Link className="link-homepage" to="/">Trang chủ</Link>
        <p>/</p>
        <p style={{ color: "rgb(191, 191, 191)", marginLeft:"10px" }}>Chính sách giao hàng</p>
      </div>

      <h1>Chính sách giao hàng</h1>

      <p style={{ fontSize: "16px" }}>
        EGA Men có dịch vụ giao hàng tận nơi trên toàn quốc, áp dụng cho khách
        mua hàng trên website, fanpage và gọi điện thoại, không áp dụng cho
        khách mua trực tiếp tại cửa hàng.
        <br /> Đơn hàng sẽ được chuyển phát đến tận địa chỉ khách hàng cung cấp
        thông qua công ty vận chuyển trung gian.
      </p>

      <div className="form-policy-second">
        <h2>1. Thời gian giao hàng</h2>
        <p>
          Quý Khách hàng cần kiểm tra tình trạng hàng hóa và có thể đổi hàng/
          trả lại hàng ngay tại thời điểm giao/nhận hàng trong những trường hợp
          sau:
          <ul>
            <li>
              Hàng không đúng chủng loại, mẫu mã trong đơn hàng đã đặt hoặc như
              trên website tại thời điểm đặt hàng.
            </li>
            <li>Không đủ số lượng, không đủ bộ như trong đơn hàng.</li>
            <li>
              Tình trạng bên ngoài bị ảnh hưởng như rách bao bì, bong tróc, bể
              vỡ…
            </li>
          </ul>
          Khách hàng có trách nhiệm trình giấy tờ liên quan chứng minh sự thiếu
          sót trên để hoàn thành việc hoàn trả/đổi trả hàng hóa.
        </p>
      </div>

      <div className="form-policy-second">
        <h2>2. Phí giao hàng</h2>
        <p>
          <ul>
            <li>Phí ship cố định là 30,000đ áp dụng cho mọi khu vực</li>
          </ul>
        </p>
      </div>
    </div>
  );
};

export default DeliveryPolicy;
