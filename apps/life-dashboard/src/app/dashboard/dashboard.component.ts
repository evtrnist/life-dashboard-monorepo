import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeLoggerService } from '@life-dashboard/time-logger-api';
import { TuiDay } from '@taiga-ui/cdk';
import { CalendarComponent } from '@life-dashboard-monorepo/calendar';
import { TuiBadge } from '@taiga-ui/kit';
import { WIDGETS } from '@life-dashboard-monorepo/widget';
import { widgetConfig } from '../widget.config';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TuiBadge, CalendarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [widgetConfig],
})
export class DashboardComponent implements OnInit {
  public readonly widgets = inject(WIDGETS);

  protected chosenDay: TuiDay | null = null;

  constructor(private readonly timeLoggerService: TimeLoggerService) {}

  ngOnInit(): void {
    this.timeLoggerService.init();
  }

  protected onDayClick(day: TuiDay): void {
    this.chosenDay = day;
    console.log(this.chosenDay);
  }
}
