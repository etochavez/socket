import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Place } from '../interfaces/place';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @ViewChild('map') mapElement: ElementRef;
  map: google.maps.Map;

  markers: google.maps.Marker[] = [];

  places: Place[] = [
    {
      nombre: 'Udemy',
      lat: 37.784679,
      lng: -122.395936
    },
    {
      nombre: 'Bahía de San Francisco',
      lat: 37.798933,
      lng: -122.377732
    },
    {
      nombre: 'The Palace Hotel',
      lat: 37.788578,
      lng: -122.401745
    }
  ];

  constructor() { }

  ngOnInit() {
    this.loadMap();
  }

  loadMap(): any {
    const latLng = new google.maps.LatLng(37.784679, -122.395936);

    const mapOPtions: google.maps.MapOptions = {
      center: latLng,
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOPtions);

    this.places.forEach((place: Place, i: number) => this.addBookmark(place));
  }

  addBookmark(bookmark: Place) {
    const latLng = new google.maps.LatLng(bookmark.lat, bookmark.lng);

    const marker =  new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng,
      draggable: true
    });
    this.markers.push(marker);
  }

}
