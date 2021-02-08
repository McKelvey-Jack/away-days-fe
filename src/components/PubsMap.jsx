import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import * as api from '../apiReq';
import Load from './Load';

let key = '';

process.env.NODE_ENV === 'development'
  ? (key = process.env.REACT_APP_API_KEY)
  : (key = process.env.API_KEY);

export class PubsMap extends Component {
  state = {
    pubs: [],
    selectedPlace: {},
    activeMarker: {},
    showingInfoWindow: false,
    isLoading: true,
    isDesktop: window.innerWidth > 1400,
  };

  componentDidMount() {
    const id = this.props.id;
    api.getPubs(id).then((pubs) => {
      this.setState({ pubs, isLoading: false });
    });
  }

  onMarkerClick = (props, marker, event) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  };

  render() {
    const { google } = this.props;

    const style = {
      position: 'relative',
      width: '100%',
      height: '100%',
      overflow: 'auto',
    };

    let containerStyle = {
      position: 'relative',
      height: '50vh',
    };

    if (this.state.isDesktop) {
      containerStyle.width = '60vw';
    } else {
      containerStyle.width = '85vw';
    }

    if (this.state.isLoading) {
      return <Load />;
    } else {
      return (
        <Map
          google={this.props.google}
          initialCenter={{
            lat: this.props.lat,
            lng: this.props.long,
          }}
          zoom={14.8}
          style={style}
          containerStyle={containerStyle}
        >
          <Marker
            onClick={this.onMarkerClick}
            name={this.props.stadiumName}
            icon={{
              url:
                'https://www.flaticon.com/svg/vstatic/svg/704/704892.svg?token=exp=1612784959~hmac=a1daa4903fe17ca1e3550bcd08ab5414',
              anchor: new google.maps.Point(10, 10),
              scaledSize: new google.maps.Size(34, 34),
            }}
          />
          {this.state.pubs.map((pub) => {
            return (
              <Marker
                key={pub.name}
                position={{ lat: pub.lat, lng: pub.long }}
                onClick={this.onMarkerClick}
                name={pub.name}
                icon={{
                  url:
                    'https://www.flaticon.com/svg/vstatic/svg/931/931949.svg?token=exp=1612739584~hmac=727eceae2d8eace889e7f1e49a0a44d9',

                  anchor: new google.maps.Point(10, 10),
                  scaledSize: new google.maps.Size(34, 34),
                }}
              />
            );
          })}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
          >
            <div>
              <p className="marker-text">{this.state.selectedPlace.name}</p>
            </div>
          </InfoWindow>
        </Map>
      );
    }
  }
}

export default GoogleApiWrapper({
  apiKey: key,
})(PubsMap);
