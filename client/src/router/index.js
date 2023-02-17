import { createRouter, createWebHistory } from 'vue-router'
import LoginApp from '../views/Login.vue'

import MainLayout from '../layouts/main.vue'
import HomeApp from '../views/main/Home.vue'
import DetailApp from '../views/main/BlogDetail.vue'
import PostBlog from '../views/main/PostBlog.vue'
import PostCategory from '../views/main/PostCategory.vue'
import PostTags from '../views/main/PostTags.vue'
import ListPost from '../views/main/ListPost.vue'


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
        path: '/:id',
        name: 'blogdetail',
        component: DetailApp
      },
      {
        path: '/post-blog',
        name: 'postblog',
        component: PostBlog
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
    ]
  },
  {
    path: '/admin',
    name: 'dashboarh',
    component: DashboardLayout
  }
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
