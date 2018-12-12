import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {CalendarEvent} from '@app/core/interfaces';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  mokk = [
    {
      date: 2000000000,
      description: 'Купить палку колбасы',
      members: ['saSAsASa', 'zxczx']
    },
    {
      date: 21132131232,
      description: 'помыть машину',
      members: ['saSAsASa', 'zxczx']
    },
    {
      date: 332131232,
      description: 'поехать в отпуск',
      members: ['saSAsASa', 'zxczx']
    },
    {
      date: 2000000000,
      description: 'Купить палку колбасы',
      members: ['saSAsASa', 'zxczx']
    },
    {
      date: 21132131232,
      description: 'помыть машину',
      members: ['saSAsASa', 'zxczx']
    },
    {
      date: 332131232,
      description: 'поехать в отпуск',
      members: ['saSAsASa', 'zxczx']
    },
    {
      date: 2000000000,
      description: 'Купить палку колбасы',
      members: ['Женя', 'Сёма']
    },
    {
      date: 21132131232,
      description: 'помыть машину',
      members: ['Женя', 'Эмилия']
    },
    {
      date: 332131232,
      description: 'поехать в отпуск',
      members: ['saSAsASa', 'zxczx']
    },
  ];
  searchDataSource = new BehaviorSubject<CalendarEvent[]>([]);


  constructor() {
  }

  getEventsFromBase(queryString: string) {
    if (!queryString.length) {
      return this.searchDataSource.next([]);
    }
    const results = [];
    for (let i = 0; i < this.mokk.length; i++) {
      if (this.mokk[i].description.toLowerCase().indexOf(queryString) !== -1) {
        results.push(this.mokk[i]);
      }
      for (let j = 0; j < this.mokk[i].members.length; j++) {
        if (this.mokk[i].members[j].toLowerCase().indexOf(queryString) !== -1) {
          results.push(this.mokk[i]);
        }
      }
    }
    this.searchDataSource.next(results);
  }

}
