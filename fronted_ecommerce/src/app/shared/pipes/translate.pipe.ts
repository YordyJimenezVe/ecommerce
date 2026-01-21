import { Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from '../services/language.service';

@Pipe({
    name: 'translate',
    pure: false // Impure to update when service state changes
})
export class TranslatePipe implements PipeTransform {

    constructor(private languageService: LanguageService) { }

    transform(value: string): string {
        return this.languageService.translate(value);
    }

}
