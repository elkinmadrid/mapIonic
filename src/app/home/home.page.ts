import {
  ViewChild,
  ElementRef
} from '@angular/core';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Geolocation } from '@capacitor/core';

declare const google: any;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  map: any;
  // Servicio para obtener las direcciones
  directionsService = new google.maps.DirectionsService();

  // Redenerizar la ruta en el mapa
  directionsDisplay = new google.maps.DirectionsRenderer();

  origin: object;

  // TODO: coordenadas de la Corporación Universitaria Latinoamericana - Cul
  destination = { lat: 10.994265, lng: -74.791453 };
  @ViewChild('mapView') mapView: ElementRef;

  constructor() {
  }

  ngOnInit(): void {
    this.getCurrentPosition();
  }

  async getCurrentPosition() {
    const coordinates = await Geolocation.getCurrentPosition();
    // Desestructuramos el object coords para obtener la latitud y longitud
    const { latitude, longitude } = coordinates.coords;

    this.origin = { lat: latitude, lng: longitude };
    // create map
    this.map = new google.maps.Map(this.mapView.nativeElement, {
      center: this.origin,
      zoom: 5
    });

    this.directionsDisplay.setMap(this.map);
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      this.getRoute();
    });
  }

  private getRoute(): void {
    this.directionsService.route({
      origin: this.origin,
      destination: this.destination,
      travelMode: google.maps.TravelMode.DRIVING,
    }, (response, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsDisplay.setDirections(response);
      } else {
        alert('No se pudieron mostrar las direcciones debido a: ' + status);
      }
    });
  }

}
