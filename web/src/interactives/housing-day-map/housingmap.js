/** @jsx jsx */
import { jsx } from "theme-ui";
import { Component } from "react";
import DeckGL, { GeoJsonLayer } from "deck.gl";
import { StaticMap } from "react-map-gl";
import data from "./data/harvard_houses.json";
// import "./mapbox.css";

class HousingMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoveredFeature: null,
      viewport: {
        longitude: -71.1195,
        latitude: 42.3755,
        zoom: 14.5,
        bear: 0,
        pitch: 0,
        maxZoom: 20,
        minZoom: 14.5,
      },
    };
  }

  render() {const layer = new GeoJsonLayer({
      id: 'geojson-layer',
      data,
      pickable: true,
      stroked: false,
      filled: true,
      extruded: true,
      pointType: 'circle',
      lineWidthScale: 20,
      lineWidthMinPixels: 2,
      getFillColor: [160, 160, 180, 200],
      getPointRadius: 100,
      getLineWidth: 1,
      getElevation: 30
    });

    return (
      <div textAlign={"center"}>
        <DeckGL
          initialViewState={this.state.viewport}
          style={{ position: "relative", textAlign: "center", margin: "auto" }}
          width={"80vw"}
          height={"100vh"}
          maxWidth={"1280px"}
          controller={true}
          layers={layer}
          getTooltip={(info) =>
            info.object
              ? {
                  html: `<p>
                          <b>${info.object.name}</b>
                          <br/>
                          Confirmed: ${info.object.confirmed}
                          <br/>
                          Deaths: ${info.object.deaths}
                          <br/>
                       </p>`,
                }
              : null
          }
        >
          <StaticMap
            // mapStyle={"mapbox://styles/mapbox/dark-v10"}
            mapboxApiAccessToken={process.env.MAPBOX_ACCESS_TOKEN}
          />
        </DeckGL>
      </div>
    );
  }
}

export default HousingMap;
