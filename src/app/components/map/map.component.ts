import { Component, OnInit } from '@angular/core';
import { Hopital } from 'src/app/modules/hopital.module';
import { HopitalService } from 'src/app/services/hopital.service';
import { serverHopResponse } from '../header/header.component';
// import {} from 'googlemaps';


declare const L: any;
declare const MQ: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  selectedstart: string;
  selectedend: string;
  selectedhop: number;
  map;
  longitude;
  latitude;
  hopitaux: Hopital[];

  constructor(private hopitalservice: HopitalService) { }

  ngOnInit(): void {
    this.hopitalservice.getall()
      .subscribe((data: serverHopResponse) => {
        this.hopitaux = data.hopitaux;
        console.log(this.hopitaux);
      });

    if (!navigator.geolocation) {
      console.log("not supported");
    }
    else {
      navigator.geolocation.getCurrentPosition((position) => {
        this.longitude = position.coords.longitude;
        this.latitude = position.coords.latitude;
        this.map = L.map('map', {
          layers: MQ.mapLayer(),
          center: [position.coords.latitude, position.coords.longitude],
          zoom: 12
        });
        let marker = L.marker([position.coords.latitude, position.coords.longitude]).addTo(this.map);
        marker.bindPopup("<b>vous</b>").openPopup();
      });
    }
  }


  aller() {
    this.map.remove();
    this.rundirection(this.selectedstart, this.selectedend);
  }

  rundirection(start, end) {
    this.map = L.map('map', {
      layers: MQ.mapLayer(),
      center: [this.latitude, this.longitude],
      zoom: 12
    });


    var dir = MQ.routing.directions();

    dir.route({
      locations: [
        start,
        end
      ]
    });

    let CustomRouteLayer = MQ.Routing.RouteLayer.extend({
      createStartMarker: (location) => {
        var custom_icon;
        var marker;

        custom_icon = L.icon({
          iconUrl: '../../../assets/img/red.png',
          iconSize: [20, 29],
          iconAnchor: [10, 29],
          popupAnchor: [0, -29]
        });

        marker = L.marker(location.latLng, { icon: custom_icon }).addTo(this.map);

        return marker;
      },

      createEndMarker: (location) => {
        var custom_icon;
        var marker;

        custom_icon = L.icon({
          iconUrl: '../../../assets/img/blue.png',
          iconSize: [20, 29],
          iconAnchor: [10, 29],
          popupAnchor: [0, -29]
        });

        marker = L.marker(location.latLng, { icon: custom_icon }).addTo(this.map);

        return marker;
      }
    });

    this.map.addLayer(new CustomRouteLayer({
      directions: dir,
      fitBounds: true
    }));

  }

  showHop() {
    let hopital: any;
    this.hopitalservice.getOne(this.selectedhop)
      .subscribe(data => {
        hopital = data;
        // alert(hopital.y);
        var pointXY = L.point(hopital.x, hopital.y);
        var pointlatlng = this.map.layerPointToLatLng(pointXY);
        this.map.remove();
        this.map = L.map('map', {
          layers: MQ.mapLayer(),
          center: [pointlatlng.lat, pointlatlng.lng],
          zoom: 12
        });
        let marker = L.marker([pointlatlng.lat, pointlatlng.lng]).addTo(this.map);
        marker.bindPopup(`<b>${hopital.nom}</b>`).openPopup();
      })
  }

}
