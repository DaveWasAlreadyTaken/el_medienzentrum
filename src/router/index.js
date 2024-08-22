import { createRouter, createWebHistory } from 'vue-router'
import HomepageView from "@/views/Homepage";
import DatenschutzView from "@/views/Datenschutz";
import Impressum from "@/views/Impressum";

const routes = [
  {
    path: '/k/:filter',
    name: 'HomeKategorie',
    props:true,
    component: HomepageView,
    children:[
    {
    path: 'q/:subfilter',
    name: 'HomeKategorie',
    props:true,
    component: HomepageView,
  }
  ]
  },
  {
    path:'/datenschutz',
    name:'Datenschutz',
    component: DatenschutzView
  },{
    path:'/impressum',
    name:'Impressum',
    component: Impressum
  },
  {
    path: '/',
    name: 'Home',
    component: HomepageView,
  },{
    path: '/:filter',
    name: 'HomeF',
    props:true,
    component: HomepageView,
  },{
    path: '/objekt/:object',
    name: 'HomeO',
    props:true,
    component: HomepageView,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
