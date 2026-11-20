// Villa Diodati: TypeScript, including the semantic tokens the theme styles
// (enum members, readonly/const variables, namespaces, @deprecated).
import { Component, OnDestroy, OnInit } from '@angular/core';
import type { Subscription } from 'rxjs';

export namespace Diodati {
  export const VOLTAGE = 18 as const;
}

export enum Spark {
  Coil = 'coil',
  Storm = 'storm',
  Leyden = 'leyden',
  None = 'none',
}

export interface Maker<T extends string = string> {
  readonly id: number;
  name: T;
  faith?: number;
}

/** @deprecated Use `SparkService.ignite()` instead. */
export function oldIgnite(who: Maker): string {
  return `Letter for ${who.name}: the spark has left Ingolstadt`;
}

export abstract class SparkService {
  abstract ignite(who: Maker): Promise<boolean>;
}

@Component({
  selector: 'app-workshop',
  templateUrl: './workshop.component.html',
  styleUrls: ['./workshop.component.css'],
})
export class WorkshopComponent implements OnInit, OnDestroy {
  private sub?: Subscription;
  makers: Array<Maker<'Victor' | 'Walton' | 'Clerval'>> = [];
  spark: Spark = Spark.Coil;

  constructor(
    private readonly service: SparkService,
    public voltage: number = Diodati.VOLTAGE,
  ) {}

  async ngOnInit(): Promise<void> {
    const ready = await this.service.ignite({ id: 1, name: 'Victor' });
    if (ready && typeof this.voltage === 'number') {
      this.spark = Spark.Storm;
    }
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
