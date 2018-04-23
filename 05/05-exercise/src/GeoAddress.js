import React from 'react'
import getAddressFromCoords from './getAddressFromCoords'


export default class GeoAddress extends React.Component {

    state = {
        error: '',
        address: ''
    }
    componentDidMount() {
        if (this.props.coords) this.fetch();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.coords != props.coords) this.fetch()
    }



    fetch = () => {
        getAddressFromCoords(this.props.coords).then(address => {
            this.setState({ address })
        }, (error) => {
            this.setState({ error })
        })
    }

    render() {
        return this.props.render(this.state)
    }

}