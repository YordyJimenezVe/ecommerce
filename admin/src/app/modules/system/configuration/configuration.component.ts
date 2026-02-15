import { Component, OnInit } from '@angular/core';
import { SystemService } from '../service/system.service';

@Component({
    selector: 'app-configuration',
    templateUrl: './configuration.component.html',
})
export class ConfigurationComponent implements OnInit {

    constructor(
        public systemService: SystemService,
    ) { }

    ngOnInit(): void {
    }

    resetData() {
        if (confirm("¿Estás seguro COMPLETAMENTE? Esto borrará TODOS los productos, ventas y reseñas en PRODUCCIÓN. Esta acción no se puede deshacer.")) {
            this.systemService.resetDatabase().subscribe((resp: any) => {
                alert(resp.message);
                window.location.reload();
            }, (error) => {
                if (error.error && error.error.message) {
                    alert("Error Backend: " + error.error.message);
                } else {
                    alert("Error: " + error.message);
                }
            })
        }
    }

}
