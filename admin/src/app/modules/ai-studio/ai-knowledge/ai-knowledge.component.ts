import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AiStudioService } from '../service/ai-studio.service';
import { CompaniesService } from '../../companies/service/companies.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-ai-knowledge',
  templateUrl: './ai-knowledge.component.html',
  styleUrls: ['./ai-knowledge.component.scss']
})
export class AiKnowledgeComponent implements OnInit {

  knowledges: any = [];
  companies: any = [];

  isLoading = false;
  isSaving = false;

  // Form
  question = '';
  answer = '';
  company_id: any = null;
  is_admin_only = false;
  selected_id: any = null;

  constructor(
    private aiService: AiStudioService,
    private companyService: CompaniesService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.listKnowledges();
    this.listCompanies();
  }

  listKnowledges() {
    this.isLoading = true;
    this.aiService.getKnowledges()
      .subscribe((resp: any) => {
        console.log('KNOWLEDGES RESP:', resp);
        const data = resp.knowledges || [];
        this.knowledges = Array.isArray(data) ? data : Object.values(data);
        console.log('PROCESSED KNOWLEDGES:', this.knowledges);
        this.isLoading = false;
        this.cdr.detectChanges();
      }, error => {
        console.error('Error fetching knowledges', error);
        this.knowledges = [];
        this.isLoading = false;
      });
  }

  listCompanies() {
    this.companyService.listCompanies().subscribe((resp: any) => {
      this.companies = resp.companies;
      this.cdr.detectChanges();
    });
  }

  save() {
    if (!this.question || !this.answer) return;

    this.isSaving = true;
    const data = {
      question: this.question,
      answer: this.answer,
      company_id: this.company_id,
      is_admin_only: this.is_admin_only ? 1 : 0
    };

    if (this.selected_id) {
      this.aiService.updateKnowledge(this.selected_id, data).subscribe(() => {
        this.reset();
        this.listKnowledges();
      });
    } else {
      this.aiService.storeKnowledge(data).subscribe(() => {
        this.reset();
        this.listKnowledges();
      });
    }
  }

  edit(item: any) {
    this.selected_id = item.id;
    this.question = item.question;
    this.answer = item.answer;
    this.company_id = item.company_id;
    this.is_admin_only = item.is_admin_only == 1 || item.is_admin_only == true;
  }

  delete(item: any) {
    if (confirm('¿Eliminar este conocimiento?')) {
      this.aiService.deleteKnowledge(item.id).subscribe(() => {
        this.listKnowledges();
      });
    }
  }

  reset() {
    this.selected_id = null;
    this.question = '';
    this.answer = '';
    this.company_id = null;
    this.is_admin_only = false;
    this.isSaving = false;
  }

}
