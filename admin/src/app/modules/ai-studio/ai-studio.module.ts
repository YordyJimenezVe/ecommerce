import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AiStudioRoutingModule } from './ai-studio-routing.module';
import { AiTrainingComponent } from './ai-training/ai-training.component';
import { AiKnowledgeComponent } from './ai-knowledge/ai-knowledge.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [AiTrainingComponent, AiKnowledgeComponent],
  imports: [
    CommonModule,
    AiStudioRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
  ]
})
export class AiStudioModule { }
