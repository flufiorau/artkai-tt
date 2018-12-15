import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() {
  }

  // getEventsFromBase(queryString: string) {
    // if (!queryString.length) {
    //   return this.searchDataSource.next([]);
    // }
    // const results = [];
    // for (let i = 0; i < this.mokk.length; i++) {
    //   if (this.mokk[i].description.toLowerCase().indexOf(queryString) !== -1) {
    //     results.push(this.mokk[i]);
    //   }
    //   for (let j = 0; j < this.mokk[i].members.length; j++) {
    //     if (this.mokk[i].members[j].toLowerCase().indexOf(queryString) !== -1) {
    //       results.push(this.mokk[i]);
    //     }
    //   }
    // }
    // this.searchDataSource.next(results);
  // }

}
