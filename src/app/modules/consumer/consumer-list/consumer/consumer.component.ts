import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Consumer } from 'src/app/models/consumer.model';

@Component({
  selector: 'app-consumer',
  templateUrl: './consumer.component.html',
  styleUrls: ['./consumer.component.scss']
})
export class ConsumerComponent {
  @Input() consumer: Consumer;
  @Input() userIsAuthenticated: boolean;
  @Input() userId: string;

  @Output() emitConsumerId: EventEmitter<string> = new EventEmitter<string>();

  onDelete(consumerId: string) {
    this.emitConsumerId.emit(consumerId);
  }
}
