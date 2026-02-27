import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DashboardService } from '../service/dashboard.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard-analista',
  templateUrl: './dashboard-analista.component.html',
  styleUrls: ['./dashboard-analista.component.scss']
})
export class DashboardAnalistaComponent implements OnInit {

  stats: any = null;
  isLoading = false;
  chartOptions: any = {};
  today: Date = new Date();

  constructor(private dashboardService: DashboardService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.dashboardService.getAdminStats()
      .pipe(finalize(() => {
        this.isLoading = false;
        this.cdr.detectChanges();
      }))
      .subscribe((resp: any) => {
        this.stats = resp;
        if (this.stats.trend) {
          this.chartOptions = this.getTrendChartOptions(this.stats.trend.labels, this.stats.trend.data);
        }
      });
  }

  getTrendChartOptions(labels: any[], data: any[]) {
    return {
      series: [{
        name: 'Ingresos vs Gastos',
        data: data
      }],
      chart: {
        type: 'area',
        height: 350,
        toolbar: { show: false }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: 3
      },
      xaxis: {
        categories: labels,
      },
      yaxis: {
        title: {
          text: '$ (USD)'
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 90, 100]
        }
      },
      colors: ['#8950FC']
    };
  }
}
