import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { AppLayoutComponent } from './layout/app.layout.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AppLayoutComponent,
                children: [
                    {
                        path: 'home',
                        loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
                        canActivate: [AppRouteGuard]
                    },
                    {
                        path: 'about',
                        loadChildren: () => import('./about/about.module').then((m) => m.AboutModule),
                        canActivate: [AppRouteGuard]
                    },
                    {
                        path: 'users',
                        loadChildren: () => import('./users/users.module').then((m) => m.UsersModule),
                        data: { permission: 'Pages.Administration.Users' },
                        canActivate: [AppRouteGuard]
                    },
                    {
                        path: 'roles',
                        loadChildren: () => import('./roles/roles.module').then((m) => m.RolesModule),
                        data: { permission: 'Pages.Administration.Roles' },
                        canActivate: [AppRouteGuard]
                    },
                    {
                        path: 'tenants',
                        loadChildren: () => import('./tenants/tenants.module').then((m) => m.TenantsModule),
                        data: { permission: 'Pages.Administration.Tenants' },
                        canActivate: [AppRouteGuard]
                    },
                    {
                        path: 'master-data',
                        loadChildren: () => import('./master-data/master-data.module').then((m) => m.MasterDataModule),
                        data: { permission: 'Pages.MasterData' },
                        canActivate: [AppRouteGuard]
                    },
                    {
                        path: 'update-password',
                        loadChildren: () => import('./users/users.module').then((m) => m.UsersModule),
                        canActivate: [AppRouteGuard]
                    },
                    // Sakai Demo Routes
                    {
                        path: 'uikit',
                        loadChildren: () => import('./demo/components/uikit/uikit.module').then((m) => m.UIkitModule),
                        canActivate: [AppRouteGuard]
                    },
                    {
                        path: 'utilities',
                        loadChildren: () => import('./demo/components/utilities/utilities.module').then((m) => m.UtilitiesModule),
                        canActivate: [AppRouteGuard]
                    },
                    {
                        path: 'blocks',
                        loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then((m) => m.PrimeBlocksModule),
                        canActivate: [AppRouteGuard]
                    },
                    {
                        path: 'pages',
                        loadChildren: () => import('./demo/components/pages/pages.module').then((m) => m.PagesModule),
                        canActivate: [AppRouteGuard]
                    }
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
