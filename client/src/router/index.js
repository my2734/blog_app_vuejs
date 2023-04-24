import { createRouter, createWebHistory } from 'vue-router'
import LoginApp from '../views/Login.vue'

import MainLayout from '../layouts/main.vue'
import HomeApp from '../views/main/Home.vue'
import DetailApp from '../views/main/BlogDetail.vue'
import PostBlog from '../views/main/PostBlog.vue'
import PostCategory from '../views/main/PostCategory.vue'
import PostTags from '../views/main/PostTags.vue'
import ListPost from '../views/main/ListPost.vue'
import UpdatePost from '../views/main/UpdatePost.vue'
import AboutApp from '../views/main/About.vue'
import NotFound from '../views/main/NotFound.vue'

import store from '@/store'
import DashboardLayout from '../layouts/dashboard.vue'
const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginApp}
  ,
  {
    path: '/',
    name: 'news',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: HomeApp
      },
      {
        path: '/danh-muc/:id',
        name: 'categoryHome',
        component: HomeApp,
        params:true,
      },
      {
        path: '/blog-detail/:id',
        name: 'blogdetail',
        component: DetailApp,
        params: true,
      },
      {
        path: '/post-blog',
        name: 'postblog',
        component: PostBlog,
      },
      {
        path: '/post-category',
        name: 'postcategory',
        component: PostCategory
      },
      {
        path: '/post-tags',
        name: 'posttags',
        component: PostTags
      },
      {
        path: '/list-post',
        name: 'listpost',
        component: ListPost
      },
      {
        path: '/update-post/:id',
        name: 'updatepost',
        component: UpdatePost,
        params: true
      },
      {
        path: '/about',
        name: 'about',
        component: AboutApp,
        params: true
      },
    ]
  },
  {
    path: '/admin',
    name: 'dashboarh',
    component: DashboardLayout
  },
  { path: '/:pathMatch(.*)*', component: NotFound },
]



const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const array_router_admin = ['postblog', 'postcategory', 'posttags','listpost'];
  if (array_router_admin.includes(to.name) && store.state.isAdmin == false ) next({ name: 'login' })
  else next()
})
export default router
