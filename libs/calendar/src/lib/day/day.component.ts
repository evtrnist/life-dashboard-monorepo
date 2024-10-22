import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  viewChild,
  ViewContainerRef,
  Injector,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Slot, Widget } from '@life-dashboard-monorepo/widget';

@Component({
  selector: 'life-dashboard-day',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './day.component.html',
  styleUrl: './day.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DayComponent {
  public readonly $day = input.required<number | null>({ alias: 'day' });

  public readonly $widgets = input.required<Widget[]>({ alias: 'widgets' });

  public readonly $bottomRightContainerRef = viewChild(
    'bottomRightContainerRef',
    { read: ViewContainerRef }
  );

  public readonly $bottomRightSlot = computed(() =>
    this.$widgets().find((widget) => widget.slot === Slot.BottomRight)
  );

  private readonly injector = inject(Injector);
}
