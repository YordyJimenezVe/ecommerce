import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PremiumPaywallComponent } from './premium-paywall/premium-paywall.component';

@NgModule({
    declarations: [PremiumPaywallComponent],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [PremiumPaywallComponent]
})
export class SharedModule { }
