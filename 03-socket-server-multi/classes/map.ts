import { Bookmarker } from './bookmarker';
export class Map {
  public bookmarkers: Bookmarker[] = [];

  constructor() {}

  public getBookmarkers(): Bookmarker[] {
    return this.bookmarkers;
  }

  public addBookmarker( bookmarker: Bookmarker): void {
    this.bookmarkers.push(bookmarker);
  }

  public delBookmarker( id: string): Bookmarker[] {
    this.bookmarkers = this.bookmarkers.filter( marker => marker.id !== id);
    return this.bookmarkers;
  }

  public moveBookmarker( marker: Bookmarker ) {
    this.bookmarkers.forEach(mark => {
      if (mark.id === marker.id) {
        mark.lat = marker.lat;
        mark.lng = marker.lng;
      }
    });
  }

}
