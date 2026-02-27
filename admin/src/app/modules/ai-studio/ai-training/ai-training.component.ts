import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AiStudioService } from '../service/ai-studio.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-ai-training',
  templateUrl: './ai-training.component.html',
  styleUrls: ['./ai-training.component.scss']
})
export class AiTrainingComponent implements OnInit {

  logs: any = [];
  isLoading = false;

  constructor(
    private aiService: AiStudioService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.listLogs();
  }

  listLogs() {
    this.isLoading = true;
    this.aiService.getLogs()
      .subscribe((resp: any) => {
        const data = resp.logs || [];
        this.logs = Array.isArray(data) ? data : Object.values(data);
        this.isLoading = false;
        this.cdr.detectChanges();
      }, error => {
        console.error('Error fetching logs', error);
        this.isLoading = false;
      });
  }

  train(log: any) {
    // Redirect or open a logic to add this query to knowledge base
    const answer = prompt(`¿Qué respuesta debe dar la IA para: "${log.query}"?`);
    if (answer) {
      this.aiService.storeKnowledge({
        question: log.query,
        answer: answer
      }).subscribe(() => {
        alert('IA entrenada con éxito');
        this.listLogs();
      });
    }
  }

}
