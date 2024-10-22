import { Provider } from '@angular/core';
import { Slot, WIDGETS } from '@life-dashboard-monorepo/widget';
import { TimeLoggerWidgetComponent } from '@life-dashboard-monorepo/time-logger-widget';

export const widgetConfig: Provider[] = [
  {
    provide: WIDGETS,
    useValue: [{ slot: Slot.BottomRight, content: TimeLoggerWidgetComponent }],
  },
];
