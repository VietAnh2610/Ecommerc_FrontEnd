import OrderPage from "../pages/OrderPage/OrderPage";
import HomePage from "../pages/HomePage/HomePage"
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import ProductDetailComponent from "../components/ProductDetailComponent/ProductDetailComponent";
import SingInPage from "../pages/SingInPage/SingInPage";
import SingUpPage from "../pages/SingUpPage/SingUpPage";
import BlogPage from "../pages/BlogPage/BlogPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import { AdminPage } from "../pages/AdminPage/AdminPage";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import OrderManagement from "../pages/OrderManagement/OrderManagement";
import BlogPageDetails from "../pages/BlogPageDetails/BlogPageDetails";
const routes  = [
{
    path: '/',
    page: HomePage,
    isShowHeader: true

},
{
    path: '/order',
    page: OrderPage,
    isShowHeader: true


},
{
    path: '/products',
    page: ProductsPage,
    isShowHeader: true


},
{
    path: '/product-detail/:id',
    page: ProductDetailComponent,
    isShowHeader: true


},
{
    path: '/blog/:id',
    page: BlogPageDetails,
    isShowHeader: true


},
{
    path: '/singin',
    page: SingInPage,
    isShowHeader: true


},

{
    path: '/singup',
    page: SingUpPage,
    isShowHeader: true


},
{
    path: '/Blog',
    page: BlogPage,
    isShowHeader: true


},
{
    path: '/profile-user',
    page: ProfilePage,
    isShowHeader: true


},
{
    path: '/payment',
    page: PaymentPage,
    isShowHeader: true


},
{
    path: '/OrderManagement/:id',
    page: OrderManagement,
    isShowHeader: true


},
{
    path: '/system-admin',
    page: AdminPage,
    isShowHeader: true,
    isPrivate: true


},
{
    path: '*',
    page: NotFoundPage,



},
]
export default routes