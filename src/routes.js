import Home from './components/Home'
import Membership from './Pages/Membership'
import User from './Pages/User'
import Shop from './Pages/Shop'
import Holiday from './Pages/Holiday/Holiday'
import Category from './Pages/Category'

const defaultRoutes = [
  {
    path: '/admin/dashboard',
    name: 'User',
    element: User,
    layout: '',
  },
  {
    path: '*',
    name: 'User',
    element: User,
    layout: '',
  },
  // {
  //   path: '/admin/dashboard/user',
  //   name: 'user',
  //   element: User,
  //   layout: '',
  // },
  {
    path: '/admin/dashboard/shop',
    name: 'shop',
    element: Shop,
    layout: '',
  },
  {
    path: '/admin/dashboard/membership',
    name: 'Membership',
    element: Membership,
    layout: '',
  },
  {
    path: '/admin/dashboard/holiday',
    name: 'Holiday',
    element: Holiday,
    layout: '',
  },
  {
    path: '/admin/dashboard/category',
    name: 'Category',
    element: Category,
    layout: '',
  },
 
]

export { defaultRoutes }
