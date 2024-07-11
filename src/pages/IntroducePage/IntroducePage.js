import React from "react";
import { Link } from "react-router-dom";
import "./IntroducePage.scss";

const IntroducePage = () => {
  return (
    <div className="container px-4 form-policy">
      <div class="signup_header">
        <Link className="link-homepage" to="/">
          Trang chủ
        </Link>
        <p>/</p>
        <p style={{ color: "rgb(191, 191, 191)" }}>Giới thiệu</p>
      </div>

      <h1 style={{ marginTop: "1px", fontSize: "30px", fontWeight: "400" }}>
        Giới thiệu
      </h1>

      <div className="form-policy-second">
        <p>
          Chào mừng bạn đến với Thời Trang EGA - điểm đến lý tưởng cho những ai
          yêu thích thời trang và phong cách. Chúng tôi tự hào mang đến cho bạn
          những sản phẩm thời trang cao cấp, độc đáo và phong cách, giúp bạn tự
          tin tỏa sáng trong mọi hoàn cảnh.
        </p>
      </div>

      <div className="form-policy-second">
        <h2>1. Sứ mệnh của chúng tôi</h2>
        <p>
          Tại Thời Trang EGA, sứ mệnh của chúng tôi là cung cấp những sản phẩm
          thời trang chất lượng cao với giá cả hợp lý. Chúng tôi luôn cập nhật
          những xu hướng thời trang mới nhất, đảm bảo rằng bạn sẽ luôn có những
          lựa chọn thời trang phù hợp với phong cách và cá tính của mình.
        </p>
      </div>

      <div className="form-policy-second">
        <h2>2. Đội ngũ thực hiện</h2>
        <p>
          Chúng tôi tự hào với đội ngũ làm việc tận tâm và giàu kinh nghiệm.
          Những người sáng lập và phát triển Thời Trang EGA gồm:
          <ul>
            <li>Trương Việt Anh</li>
            <li>Nguyễn Thái Tuân</li>
            <li>Nguyễn Hoàng</li>
          </ul>
          Chúng tôi cung cấp một loạt các sản phẩm thời trang bao gồm áo khoác,
          váy, quần, áo thun và nhiều phụ kiện khác. Mỗi sản phẩm đều được chọn
          lọc kỹ càng, từ chất liệu cho đến kiểu dáng, nhằm mang lại sự thoải
          mái và phong cách cho người mặc. Hãy cùng Thời Trang EGA khám phá thế
          giới thời trang đầy màu sắc và phong cách. Chúng tôi cam kết mang đến
          cho bạn trải nghiệm mua sắm tuyệt vời nhất!
        </p>
      </div>
    </div>
  );
};

export default IntroducePage;
