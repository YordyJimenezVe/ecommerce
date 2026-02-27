import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AiTrainingComponent } from './ai-training/ai-training.component';
import { AiKnowledgeComponent } from './ai-knowledge/ai-knowledge.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'training',
        component: AiTrainingComponent
      },
      {
        path: 'knowledge',
        component: AiKnowledgeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AiStudioRoutingModule { }
