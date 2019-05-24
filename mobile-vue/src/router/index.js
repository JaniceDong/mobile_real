import Vue from 'vue'
import Router from 'vue-router'
import Log_Sign from '@/pages/Log_Sign.vue'
import Login from '@/pages/Login.vue'
import Signup from '@/pages/Signup.vue'
import Index from '@/pages/index.vue'
import Center from '@/pages/center.vue'
import freeApp from '@/pages/free-app.vue'
import myFavorite from '@/pages/my-favorite.vue'
import Category from '@/pages/category.vue'
import Forgot from '@/pages/forgot.vue'
import Reset from '@/pages/reset.vue'
import Policy from '@/pages/Policy.vue'
import Terms from '@/pages/Terms.vue'
import Cookie from '@/pages/Cookie.vue'
import Release from '@/pages/Release.vue'
import Account from '@/pages/account.vue'
import AccountInfo from '@/pages/account-info.vue'
import ChangePassword from '@/pages/ChangePassword.vue'
import newEmail from '@/pages/info-email.vue'
import Organization from '@/pages/Organization.vue'
import Mobile from '@/pages/Mobile.vue'
import Nickname from '@/pages/Nickname.vue'
import Subject from '@/pages/subject.vue'
import Biography from '@/pages/Biography.vue'
import Prompt from '@/pages/Prompt.vue'
import Company from '@/pages/Company.vue'
import SearchResult from '@/pages/searchResult.vue'
import ByLetter from '@/pages/byLetter.vue'
import Modify_success from '@/pages/modify_success.vue'
import Modify_fail from '@/pages/modify_fail.vue'
import Regain from '@/pages/regain.vue'
import messageList from '@/pages/message-list.vue'
import messageDetail from '@/pages/message-detail.vue'
import notFound from '@/pages/notFound.vue'


Vue.use(Router)
export default new Router({
  	linkActiveClass: 'is-active',
  	routes: [
   	{
	  	path: '/',
	  	component:Index,
      meta: {
        HFVisible: true

      }
  	},{
  		path: '/Log_Sign',
  		component: Log_Sign,
  		children:[
  			{
  				path:'/login',
  				component: Login,
          name:"login",
          meta: {
            HFVisible: false
          }
  			},
        {
  				path:'/register',
  				component: Signup,
          name:"register",
          meta: {
            HFVisible: false
          }
  			},
  		]
  	},
    {
      path: '/index',
      component: Index,
      meta: {
        HFVisible: true
      }
    },
    {
      path: '/center',
      component: Center,
      children:[
        {
          path: '/center/free-app',
          component: freeApp,
          name:"freeApp",
          meta: {
            HFVisible: true,
            searchBtn: true
          }
        },{
          path: '/center/my-favorite',
          component: resolve => require(['@/pages/my-favorite.vue'],resolve),
          /*component: myFavorite,*/
          name: "myFavorite",
          meta: {
            requireAuth: true, // 判断是否需要登录
            HFVisible: true
           },
        }
      ]
    },
    {
      path: '/center/apps/:title',
      component: Category,
      props: true,
      name: "freeApps",
      meta: {
        HFVisible: true,
        searchBtn: true
      }
    },
    {
        path: '/free-app/subject/detail/:id',
        component: Subject,
        meta: {
          HFVisible: true,
          searchBtn: true
        }
      },
    {
      path: '/my-favorite/subject/detail/:id',
      /*component: Subject,*/
      component: resolve => require(['@/pages/subject.vue'],resolve),
      meta: {
        requireAuth: true,
        HFVisible: true,
        searchBtn: true
      }
    },
    {
    	path:'/reset',
    	name:'Reset',
    	component:Reset,
      meta: {
        HFVisible: false
      }
    },
    {
    	path:'/forgot',
    	name:'Forgot',
    	component:Forgot,
      meta: {
        HFVisible: false
      }
    },
    {

    	path:'/site/terms-of-use',
    	name:'Terms',
    	component:Terms,
      meta: {
        HFVisible: true
      }
    },
    {
    	path:'/site/privacy-policy',
    	name:'Policy',
    	component:Policy,
      meta: {
        HFVisible: true
      }
    },
    {
    	path:'/site/cookie-policy',
    	name:'Cookie',
    	component:Cookie,
      meta: {
        HFVisible: true
      }
    },
    {
    	path:'/site/release-information',
    	name:'Release',
    	component:Release,
      meta: {
        HFVisible: true
      }
    },
    {
    	path:'/AccountInfo',
    	name:'AccountInfo',
    	/*component:AccountInfo,*/
      component: resolve => require(['@/pages/account-info.vue'],resolve),
      meta: {
        requireAuth: true,
        HFVisible: true
      }
    },
    
	{
      path: '/account',
      name: "account",
      /*component: Account*/
      component: resolve => require(['@/pages/account.vue'],resolve),
      meta: {
        requireAuth: true,
        HFVisible: true
      }
    },
    {
      path:'/account/info',
      name:"accountInfo",
      /*component: AccountInfo,*/
      component: resolve => require(['@/pages/account-info.vue'],resolve),
      meta: {
        requireAuth: true,
        HFVisible: true
      }
    },
    {
      path: '/account/new-email',
      name: "accountNewEmail",
      /*component: newEmail,*/
      component: resolve => require(['@/pages/info-email.vue'],resolve),
      meta: {
        requireAuth: true,
        HFVisible: true
      }
    },
    {
      path: '/account/new-nickname',
      name:"nickname",
      /*component: Nickname,*/
      component: resolve => require(['@/pages/Nickname.vue'],resolve),
      meta: {
        requireAuth: true,
        HFVisible: true
      }
    },
      {
        path:'/account/new-mobile',
        name:'Mobile',
        /*component:Mobile,*/
        component: resolve => require(['@/pages/Mobile.vue'],resolve),
        meta: {
          requireAuth: true,
          HFVisible: true
        }
    },
    {
        path:'/account/organization',
        name:'Organization',
        /*component:Organization*/ 
        component: resolve => require(['@/pages/Organization.vue'],resolve),
        meta: {
          requireAuth: true,
          HFVisible: true
        }
    },
    {
      path:'/account/new-password',
      name:'ChangePassword',
      /*component:ChangePassword*/
      component: resolve => require(['@/pages/ChangePassword.vue'],resolve),
      meta: {
        requireAuth: true,
        HFVisible: true
      }
    },
    {
      path: '/account/biography',
      name: "biography",
      /*component: Biography,*/
      component: resolve => require(['@/pages/Biography.vue'],resolve),
      meta: {
        requireAuth: true,
        HFVisible: true
      }
    },
    {
      path: '/account/company',
      name: "company",
      /*component: Company,*/
      component: resolve => require(['@/pages/Company.vue'],resolve),
      meta: {
        requireAuth: true,
        HFVisible: true
      }
    },
    {
      path: '/center/search-result',
      name: "SearchResult",
      component: SearchResult,
      meta: {
        HFVisible: true,
        searchBtn: true
      }
    },
    {
      path: '/center/search-by-letter',
      name: "ByLetter",
      component: ByLetter,
      meta: {
        HFVisible: true
      }
    },
		{
			path:'/modify_success',
			name: "Modify_success",
			component: Modify_success,
      meta: {
        HFVisible: false
      }
		},
		{
			path:'/modify_fail',
			name: "Modify_fail",
			component: Modify_fail,
      meta: {
        HFVisible: false
      }
		},
		{
			path:'/regain',
			name: "Regain",
			component: Regain,
      meta: {
        HFVisible: false
      }
		},
    {
      path:'/message-list',
      /*component: messageList,*/
      component: resolve => require(['@/pages/message-list.vue'],resolve),
      meta: {
        requireAuth: true,
        HFVisible: true
      }

    },
    {
      path:'/message-list/detail',
      /*component: messageDetail,*/
      component: resolve => require(['@/pages/message-detail.vue'],resolve),
      meta: {
        requireAuth: true,
        HFVisible: true
      }

    },
    {
      path:'*',  //全不匹配的情况下
      component:notFound,
      meta: {
        HFVisible: true
      }
    }
  ]
})
