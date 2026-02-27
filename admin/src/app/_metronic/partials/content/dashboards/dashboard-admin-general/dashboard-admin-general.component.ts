import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DashboardService } from '../service/dashboard.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard-admin-general',
  templateUrl: './dashboard-admin-general.component.html',
  styleUrls: ['./dashboard-admin-general.component.scss']
})
export class DashboardAdminGeneralComponent implements OnInit {

  stats: any = null;
  isLoading = false;
  today = new Date();
  chartOptions: any = {};

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
        if (this.stats.growth) {
          this.chartOptions = this.getGrowthChartOptions(
            this.stats.growth.labels,
            this.stats.growth.companies,
            this.stats.growth.revenue
          );
        }
      }, error => {
        console.error('Error fetching admin stats', error);
      });
  }

  getGrowthChartOptions(labels: any[], companies: any[], revenue: any[]) {
    return {
      series: [
        {
          name: 'Empresas',
          type: 'column',
          data: companies
        },
        {
          name: 'Ingresos ($)',
          type: 'area',
          data: revenue
        }
      ],
      chart: {
        height: 350,
        type: 'line',
        stacked: false,
        toolbar: { show: false }
      },
      stroke: {
        width: [0, 3],
        curve: 'smooth'
      },
      plotOptions: {
        bar: {
          columnWidth: '50%'
        }
      },
      fill: {
        opacity: [0.85, 0.25, 1],
        gradient: {
          inverseColors: false,
          shade: 'light',
          type: "vertical",
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100, 100, 100]
        }
      },
      labels: labels,
      markers: {
        size: 0
      },
      xaxis: {
        type: 'category'
      },
      yaxis: [
        {
          title: { text: 'Empresas' },
        },
        {
          opposite: true,
          title: { text: 'Ingresos ($)' }
        }
      ],
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function (y: any) {
            if (typeof y !== "undefined") {
              return y.toFixed(0);
            }
            return y;
          }
        }
      },
      colors: ['#F5A200', '#002663']
    };
  }
}
