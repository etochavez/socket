import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Place } from '../interfaces/place';
import { containerRefreshStart } from '@angular/core/src/render3';
import { HttpClient } from '@angular/common/http';
import { WebsocketService } from '../services/websocket.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @ViewChild('map') mapElement: ElementRef;
  map: google.maps.Map;

  markers: google.maps.Marker[] = [];

  infoWindows: google.maps.InfoWindow[] = [];

  places: Place[] = [];

  constructor(
    private http: HttpClient,
    public wsService: WebsocketService
  ) { }

  ngOnInit() {
    this.http.get('http://localhost:5000/markers')
    .subscribe( (places: Place[]) => {
      this.places = places;
      this.loadMap();
    });
    this.listenSocket();
  }

  listenSocket() {
    // New Bookmarker
    this.wsService.listen('new-marker')
    .subscribe( (marker: Place) => {
      this.addBookmark(marker);
    });

    // move marker
    this.wsService.listen('move-marker')
    .subscribe( (marker: Place) => {
      this.moveBookmark(marker);
    });

    // delete marker
    this.wsService.listen('del-marker')
    .subscribe( (id: string) => {
      this.delBookmark(id);
    });
  }
  moveBookmark(marker: Place): any {
    this.markers.forEach( mark => {
      if (mark.getTitle() === marker.id) {
        const latLang = new google.maps.LatLng(marker.lat, marker.lng);
        mark.setPosition(latLang);
      }
    });
  }

  public delBookmark( id: string): void {
    this.markers.find( marker => marker.getTitle() === id).setMap(null);
  }

  loadMap(): any {
    const latLng = new google.maps.LatLng(37.784679, -122.395936);

    const mapOPtions: google.maps.MapOptions = {
      center: latLng,
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOPtions);

    this.map.addListener('click', (coors) => {
      const newBookmark: Place = {
        name: 'New Place',
        lat: coors.latLng.lat(),
        lng: coors.latLng.lng(),
        id: new Date().toISOString()
      };

      this.addBookmark(newBookmark);
      // Emitir evento de socket al agregar marcador
      this.wsService.emit('new-marker', newBookmark);
    });

    this.places.forEach((place: Place, i: number) => this.addBookmark(place));
  }

  addBookmark(bookmark: Place) {
    const latLng = new google.maps.LatLng(bookmark.lat, bookmark.lng);

    const marker =  new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng,
      draggable: true,
      title: bookmark.id
    });
    this.markers.push(marker);

    // Creando el InfoWindows
    const content = `<b>${bookmark.name}</b>`;
    const infoWindow = new google.maps.InfoWindow({
      content: content
    });

    this.infoWindows.push(infoWindow);

    google.maps.event.addDomListener(marker, 'click', () => {
      this.infoWindows.forEach(infow => infow.close());
      infoWindow.open(this.map, marker);
    });

    google.maps.event.addDomListener(marker, 'dblclick', (coors) => {
      marker.setMap(null);
      //Disparara un evento de socket, para borrar el marcador
      this.wsService.emit('del-marker', bookmark);
    });

    google.maps.event.addDomListener(marker, 'drag', (coors) => {
      const newMarker = {
        lat: coors.latLng.lat(),
        lng: coors.latLng.lng(),
        name: bookmark.name,
        id: marker.getTitle()
      };

      //Disparara un evento de socket, para mover el marcador
      this.wsService.emit('move-marker', newMarker);
    });
  }

}
