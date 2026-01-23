import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuestionsService } from '../service/questions.service';

@Component({
    selector: 'app-list-questions',
    templateUrl: './list-questions.component.html',
    styleUrls: ['./list-questions.component.scss']
})
export class ListQuestionsComponent implements OnInit {

    questions: any = [];
    search: string = '';
    totalPages: number = 1;
    currentPage: number = 1;

    selectedQuestion: any = null;
    answerText: string = '';

    constructor(
        public questionsService: QuestionsService,
        public modalService: NgbModal,
    ) { }

    ngOnInit(): void {
        this.listQuestions();
    }

    listQuestions(page: number = 1) {
        this.questionsService.listQuestions(page, this.search).subscribe((resp: any) => {
            this.questions = resp.questions.data;
            this.totalPages = resp.total;
            this.currentPage = page;
        })
    }

    loadPage(page: number) {
        this.listQuestions(page);
    }

    openAnswerModal(question: any, content: any) {
        this.selectedQuestion = question;
        this.answerText = question.answer || '';
        this.modalService.open(content, { centered: true, size: 'lg' });
    }

    sendAnswer() {
        if (!this.answerText) {
            alert("La respuesta no puede estar vacía");
            return;
        }
        this.questionsService.answerQuestion(this.selectedQuestion.id, this.answerText).subscribe((resp: any) => {
            this.modalService.dismissAll();
            this.listQuestions(this.currentPage);
            // Optional: Add toaster notification
        })
    }
}
