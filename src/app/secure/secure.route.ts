import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { SettingsComponent } from './settings/settings.component';
import { DeletedUserComponent } from './deleted-user/deleted-user.component';

export const SECURE_ROUTES: Routes = [

    // {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // },
    {
        path: 'user',
        component: UserComponent
    },
    {
        path: 'deleteduser',
        component: DeletedUserComponent
    },
    {
        path: 'setting',
        component: SettingsComponent
    }
];

