const routes = [
    {
        path: 'app-vue',
        name: 'App',
        component: () => import('@/App'),
        children: [
            {
                path: '/',
                name: 'home',
                component: () => import('@/view/AppHome')
            }
        ]
    }
]
export default routes;
