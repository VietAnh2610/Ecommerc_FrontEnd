import OrderPage from "../pages/OrderPage/OrderPage";
import HomePage from "../pages/HomePage/HomePage"
import ProductsPage from '../pages/ProductsPage.jsx/ProductsPage';
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import ProductDetailComponent from "../components/ProductDetailComponent/ProductDetailComponent";
import SingInPage from "../pages/SingInPage/SingInPage";
import SingUpPage from "../pages/SingUpPage/SingUpPage";
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
    path: '/product-detail',
    page: ProductDetailComponent,
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
    path: '*',
    page: NotFoundPage,



},
]
export default routes