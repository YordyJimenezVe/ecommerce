import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SuspendedComponent } from './suspended.component';
import { AuthModule } from '../auth/auth.module';

const routes: Routes = [
    { path: '', component: SuspendedComponent }
];

@NgModule({
    declarations: [SuspendedComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        AuthModule
    ]
})
export class SuspendedModule { }
