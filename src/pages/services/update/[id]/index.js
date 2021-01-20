import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'umi'
import Service from '../../components/Service'

@connect(({ loading, services }) => ({ loading, services }))
class UpdateService extends Component {
  // componentDidMount() {
  //   const { dispatch,history } = this.props
  //   dispatch({
  //     type: 'services/list',
  //     payload: {},
  //   })
  // }
  render() {
    const { id } = this.props.match.params
    return (
      <div>
        <Service id={id} />
      </div>
    )
  }
}

UpdateService.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default UpdateService
