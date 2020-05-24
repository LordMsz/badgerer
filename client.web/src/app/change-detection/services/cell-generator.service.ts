import { Injectable } from '@angular/core';

import { ICell, Cell } from '../models/Cell';

@Injectable({
  providedIn: 'root'
})
export class CellGeneratorService {
  public constructor() { }

  public generate(size: number): ICell[] {
    const result = [];
    for (let i = 0; i < size; i++) {
      result.push(new Cell(i, false));
    }

    return result;
  }
}
