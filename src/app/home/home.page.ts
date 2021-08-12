import {
  ViewChild,
  ElementRef
} from '@angular/core';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Geolocation } from '@capacitor/core';
import { LoadingController } from '@ionic/angular';
import { Coordenadas } from '../core/models/coordenadas';
import { FirebaseService } from '../core/service/firebase.service';


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

  coordList: any[];
  coordListBackup: any[] = [];
  loading: any;

  constructor(private firestoreService: FirebaseService, public loadingController: LoadingController) {
  }

  async ngOnInit() {
    this.presentLoading()
    await this.initializeItems();
    await this.getCurrentPosition();
    await this.loading.dismiss();
  }


  async initializeItems() {
    const allList = await this.firestoreService.getAllCoordenadas().get().toPromise();
    allList.forEach(item => {
      const data = item.data();
      const newData = { ...data as {}, email: item.id };
      this.coordListBackup.push(newData);
    });
  }


  async filterList(evt) {
    const searchTerm = evt.srcElement.value;
    if (!searchTerm || searchTerm.length < 2) {
      return;
    }
    this.coordList = this.coordListBackup;
    this.coordList = this.coordList.filter(current => {
      if (current.email && searchTerm) {
        return (current.email.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    });
  }

  async getCurrentPosition() {
    const coordinates = await Geolocation.getCurrentPosition();
    // Desestructuramos el object coords para obtener la latitud y longitud
    const { latitude, longitude } = coordinates.coords;
    const userSession = JSON.parse(localStorage.getItem('user'));

    this.origin = { lat: latitude, lng: longitude };

    const coordenada: Coordenadas = {
      lat: latitude,
      lon: longitude,
      uidUser: userSession.email
    };

    const userCoords = await this.firestoreService.getUserCoordenadas(userSession.email).get().toPromise();
    if (!userCoords.exists) {
      this.firestoreService.createCoordenadas(coordenada);
    } else {
      this.firestoreService.updateCoordenadas(userSession.email, coordenada);
    }


    // create map
    this.map = new google.maps.Map(this.mapView.nativeElement, {
      center: this.origin,
      zoom: 15
    });

    this.directionsDisplay.setMap(this.map);
    this.locationDestination(this.destination);
  }

  locationDestination(destination) {
    this.coordList = [];
    this.destination = destination;
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      this.getRoute(this.origin, this.destination);
    });
  }

  private getRoute(originParam, destinationParam): void {
    this.directionsService.route({
      origin: originParam,
      destination: destinationParam,
      travelMode: google.maps.TravelMode.DRIVING,
    }, (response, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsDisplay.setDirections(response);
      } else {
        alert('No se pudieron mostrar las direcciones debido a: ' + status);
      }
    });
  }


  async presentLoading() {
    this.loading  = await this.loadingController.create({
      message: 'Por favor, espere...'
    });
    await this.loading.present();
  }

}
