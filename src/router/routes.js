
const routes = [
  {
    path: '/admin',
    component: () => import('pages/IndexPage.vue'),
    meta: {
      auth: true,
      layout: 'main'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../pages/Login.vue'),
    meta: {
      auth: false,
      layout: 'empty'
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../pages/Register.vue'),
    meta: {
      auth: false,
      layout: 'empty'
    },
  },
  {
    path: '/groups',
    name: 'ЛК владельца группы',
    component: () => import('../pages/Groups.vue'),
    meta: {
      auth: true,
      layout: 'main'
    },
    children: [
        {
          path: 'manage',
          name: 'Список подключенных групп',
          component: () => import('../pages/GroupsManage.vue'),
          meta: {
            auth: true,
            layout: 'main'
          },
        },
        {
          path: 'wallet',
          name: 'Кошелёк',
          component: () => import('../pages/GroupsWallet.vue'),
          meta: {
            auth: true,
            layout: 'main'
          },
        },
        {
          path: 'add',
          name: 'Добавить сообщество',
          component: () => import('../pages/GroupsAdd.vue'),
          meta: {
            auth: true,
            layout: 'main'
          },
        },
        {
          path: 'edit',
          name: 'editGroup',
          component: () => import('../pages/GroupsEditGroup.vue'),
          meta: {
            auth: true,
            layout: 'main'
          },
        },
    ]
  },
  {
    path: '/aide',
    name: 'ЛК исполнителя',
    component: () => import('../pages/Aide.vue'),
    meta: {
      auth: true,
      // layout: 'main'
    },
    children: [
      {
        path: 'manage',
          name: 'ManageAide',
          component: () => import('../pages/AidePage.vue'),
          meta: {
            auth: true,
            layout: 'main'
          }
      },
      {
        path: 'edit',
          name: 'editAidePage',
          component: () => import('../pages/EditAidePage.vue'),
          meta: {
            auth: true,
            layout: 'main'
          }
      },
    ]
  },
  {
    path: '/manage2',
      name: 'ManageAide2',
      component: () => import('../pages/AidePage2.vue'),
      meta: {
        auth: true,
        layout: 'main'
      }
  },
  {
    path: '/',
    name: 'Main Page',
    component: () => import('../pages/MainPage.vue'),
    meta: {
      auth: false,
      layout: 'empty'
    },
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
