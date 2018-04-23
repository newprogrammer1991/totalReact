import React from 'react'



class GeoPosition extends React.Component{

    state = {
        coords: null,
        error: null
      }
    
      componentDidMount() {
        this.geoId = navigator.geolocation.watchPosition(
          (position) => {
            this.setState({
              coords: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              }
            })
          },
          (error) => {
            this.setState({ error })
          }
        )
      }
    
      componentWillUnmount() {
        navigator.geolocation.clearWatch(this.geoId)
      }
    
render (){
    return this.props.render(this.state.coords,this.state.error)
}
    
}
export default GeoPosition