import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DashboardService } from '../service/dashboard.service';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/modules/auth';

@Component({
  selector: 'app-dashboard-vendedor',
  templateUrl: './dashboard-vendedor.component.html',
  styleUrls: ['./dashboard-vendedor.component.scss']
})
export class DashboardVendedorComponent implements OnInit {

  stats: any = null;
  isLoading = false;
  isSuspended = false;
  chartOptions: any = {};
  today: Date = new Date();

  constructor(private dashboardService: DashboardService, private cdr: ChangeDetectorRef, private authService: AuthService) { }

  logout() {
    this.authService.logout();
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.dashboardService.getCompanyStats()
      .pipe(finalize(() => {
        this.isLoading = false;
        this.cdr.detectChanges();
      }))
      .subscribe((resp: any) => {
        this.stats = resp;
        if (this.stats.trend) {
          this.chartOptions = this.getTrendChartOptions(this.stats.trend.labels, this.stats.trend.data);
        }
      }, error => {
        if (error.status === 403) {
          this.isSuspended = true;
        }
        this.cdr.detectChanges();
      });
  }

  getTrendChartOptions(labels: any[], data: any[]) {
    return {
      series: [{
        name: 'Ventas Realizadas ($)',
        data: data
      }],
      chart: {
        type: 'bar',
        height: 350,
        toolbar: { show: false }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded'
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
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
        opacity: 1,
        colors: ['#3699FF'] // Primary blue for sales staff
      },
      tooltip: {
        y: {
          formatter: function (val: any) {
            return "$ " + val
          }
        }
      }
    };
  }
}
