import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'umi'
import { Page } from 'components'
import List from './components/List'
import Filter from './components/Filter'

@connect(({ pendingOrders, loading }) => ({ pendingOrders, loading }))
class PendingOrders extends Component {
  render() {
    return (
      <Page inner>
        <Filter />
        <List />
      </Page>
    )
  }
}

PendingOrders.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default PendingOrders
