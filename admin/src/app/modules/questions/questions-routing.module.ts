import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionsComponent } from './questions.component';
import { ListQuestionsComponent } from './list-questions/list-questions.component';

const routes: Routes = [
    {
        path: '',
        component: QuestionsComponent,
        children: [
            {
                path: 'list',
                component: ListQuestionsComponent
            },
            {
                path: '',
                redirectTo: 'list',
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class QuestionsRoutingModule { }
