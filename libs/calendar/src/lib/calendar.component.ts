import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Widget } from '@life-dashboard-monorepo/widget';
import { DayComponent } from './day/day.component';

@Component({
  selector: 'life-dashboard-calendar',
  standalone: true,
  imports: [CommonModule, DayComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent {
  public readonly $widgets = input.required<Widget[]>({ alias: 'widgets' }); // Сигнал для виджетов
  protected $currentDate = signal(new Date()); // Сигнал текущей даты
  protected $daysInMonth = signal<(number | null)[]>([]); // Сигнал для дней текущего месяца
  protected weekDays: string[] = [
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun',
  ]; // Дни недели

  constructor() {
    // Инициализируем календарь при загрузке компонента
    this.generateCalendar(this.$currentDate());
  }

  // Генерация календаря для текущего месяца
  public generateCalendar(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth();

    // Определяем количество дней в текущем месяце
    const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();

    // Определяем первый день недели для месяца (0 = воскресенье)
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    // Пустые ячейки для начала недели
    const emptyCells = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    // Заполняем массив пустыми ячейками и днями текущего месяца
    this.$daysInMonth.set(
      Array(emptyCells)
        .fill(null)
        .concat([...Array(daysInCurrentMonth).keys()].map((i) => i + 1))
    );
  }

  // Перелистывание месяца вперед
  public nextMonth() {
    const newDate = new Date(this.$currentDate());
    newDate.setMonth(newDate.getMonth() + 1);
    this.$currentDate.set(newDate);
    this.generateCalendar(newDate);
  }

  // Перелистывание месяца назад
  public previousMonth() {
    const newDate = new Date(this.$currentDate());
    newDate.setMonth(newDate.getMonth() - 1);
    this.$currentDate.set(newDate);
    this.generateCalendar(newDate);
  }
}
