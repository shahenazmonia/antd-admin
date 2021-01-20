import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'umi'
import Department from '../../components/Department'

@connect(({ loading, departments }) => ({ loading, departments }))
class UpdateDepartment extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    console.log('props', this.props)
    const id = this.props?.match?.params.id
    dispatch({
      type: 'departments/details',
      payload: { id },
    })
  }
  render() {
    const { id } = this.props.match.params
    return (
      <div>
        <Department id={id} />
      </div>
    )
  }
}

UpdateDepartment.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default UpdateDepartment
