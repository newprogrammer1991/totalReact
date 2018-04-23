////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Refactor App by creating a new component named `<GeoPosition>`
// - <GeoPosition> should use a render prop callback that passes
//   the coords and error
// - When you're done, <App> should no longer have anything but
//   a render method
// - Now create a <GeoAddress> component that also uses a render
//   prop callback with the current address. You will use
//   `getAddressFromCoords(latitude, longitude)` to get the
//   address. It returns a promise.
// - You should be able to compose <GeoPosition> and <GeoAddress>
//   beneath it to naturally compose both the UI and the state
//   needed to render
// - Make sure <GeoAddress> supports the user moving positions
import './index.css'
import React from 'react'
import LoadingDots from './LoadingDots'
import Map from './Map'
import GeoPosition from './GeoPosition'
import GeoAddress from './GeoAddress'

class App extends React.Component {

  render() {
    return (
      <div className="app">
        <GeoPosition render={(coords, error) => (
          error ? (
            <div>Error:{error.message}</div>
          ) : coords ? (
            <GeoAddress coords={coords} render={({error,address})=>(
            <Map
              lat={coords.lat}
              lng={coords.lng}
              info={address||'Loading ...'}
            />
          )}/>
          ) : (
                <LoadingDots />
              )
        )} />
      </div>

    )
  }
}

export default App

