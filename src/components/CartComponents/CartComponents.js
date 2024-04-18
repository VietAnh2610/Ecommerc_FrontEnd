import React from 'react'
import './CartComponents.scss'
import {Link} from'react-router-dom'
const CartComponents = () => {
  return (
    <div class="col-lg-4 col-md-6">
    <div class="single-product">
      <div class="product-img">
        <img class="3" src="https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/54/236016/tai-nghe-bluetooth-airpods-2-apple-mv7n2-trang-200923-112201-600x600.jpg" alt=""/>
        <div class="p_icon">
          
          <Link to='/product-detail'><i class="fa-regular fa-eye"></i></Link>
          
          <a href="#">
          <i class="fa-regular fa-heart"></i>
          </a>
          <a href="#">
          <i class="fa-solid fa-cart-plus"></i>
          </a>
        </div>
      </div>
      <div class="product-btm">
        <Link href="#" class="d-block">
          <p>ĐỒNG HỒ ĐEO TAY</p>
        </Link>
        <div class="mt-3 cart-title">
          <span class="mr-4">đ146,999  </span>
          <del>đ300,000</del>
        </div>
      </div>
    </div>
  </div>
  )
}

export default CartComponents