import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'umi'
import { withI18n } from '@lingui/react'
import { Page } from 'components'
import List from './components/List'
import Filter from './components/Filter'

@connect(({ services, loading }) => ({ services, loading }))
class Services extends Component {
  render() {
    return (
      <Page inner>
        <Filter />
        <List />
      </Page>
    )
  }
}

Services.propTypes = {
  user: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Services
