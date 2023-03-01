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

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

const token = getCookie('token');
console.log('token router.js');
if(token != ""){
  console.log('admin')
}else{
  console.log('home')
}

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
        path: '/blog-detail/:id',
        name: 'blogdetail',
        component: DetailApp,
        params: true,
      },
      {
        path: '/post-blog',
        name: 'postblog',
        get component(){
          if(token != ""){
            return PostBlog;
          }else{
            return HomeApp;
          }
        }
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
