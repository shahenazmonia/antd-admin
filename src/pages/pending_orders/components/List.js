import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Avatar, Spin } from 'antd'
import { DropOption } from 'components'
import { Trans } from '@lingui/react'
import { Link, connect } from 'umi'

@connect(({ loading, pendingOrders }) => ({
  loading,
  pendingOrders,
}))
class List extends PureComponent {
  state = {
    updateFlag: false,
  }
  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'pendingOrders/list',
      payload: {},
    })
  }

  handleMenuClick = (record, e) => {
    const { dispatch } = this.props
    const { key } = e
    if (key === '1') {
    } else if (key === '2') {
    }
  }

  render() {
    const { pendingOrders, loading } = this.props
    const { updateFlag, data } = this.state
    console.log('orders', pendingOrders)
    const columns = [
      {
        title: <Trans>Order Type</Trans>,
        dataIndex: 'orderType',
        key: 'orderType',
        render: (text, record) => <Link to={``}>{text}</Link>,
      },
      {
        title: <Trans>Location Type</Trans>,
        dataIndex: ['location', 'type'],
        key: 'type',
        render: (text, record) => <Link to={``}>{text}</Link>,
      },
      {
        title: <Trans>Location Coordinates</Trans>,
        dataIndex: ['location', 'coordinates'],
        key: 'coordinates',
        render: (text, record) => <Link to={``}>{text}</Link>,
      },
      {
        title: <Trans>Email</Trans>,
        dataIndex: ['user', 'email'],
        key: 'userEmail',
        render: (text, record) => <Link to={``}>{text}</Link>,
      },
      {
        title: <Trans>First Name</Trans>,
        dataIndex: ['user', 'firstName'],
        key: 'firstName',
        render: (text, record) => <Link to={``}>{text}</Link>,
      },
      {
        title: <Trans>Last Name</Trans>,
        dataIndex: ['user', 'lastName'],
        key: 'lastName',
        render: (text, record) => <Link to={``}>{text}</Link>,
      },
      {
        title: <Trans>House Type</Trans>,
        dataIndex: ['user', 'houseType'],
        key: 'houseType',
        render: (text, record) => <Link to={``}>{text}</Link>,
      },
      {
        title: <Trans>House Number</Trans>,
        dataIndex: ['user', 'houseNumber'],
        key: 'houseNumber',
        render: (text, record) => <Link to={``}>{text}</Link>,
      },
      {
        title: <Trans>isConfirmed</Trans>,
        dataIndex: ['user', 'isConfirmed'],
        key: 'isConfirmed',
        render: (text, record) => (
          <Link to={``}>{text === true ? 'Confirmed' : 'not Confirmed'}</Link>
        ),
      },
      {
        title: <Trans>onModel</Trans>,
        dataIndex: 'onModel',
        key: 'onModel',
      },
      {
        title: <Trans>order Status</Trans>,
        dataIndex: 'orderStatus',
        key: 'orderStatus',
      },
      {
        title: <Trans>Operation</Trans>,
        key: 'operation',
        fixed: 'right',
        render: (text, record) => {
          return (
            <DropOption
              onMenuClick={(e) => this.handleMenuClick(record, e)}
              menuOptions={[
                { key: '1', name: 'Update' },
                { key: '2', name: 'Delete' },
              ]}
            />
          )
        },
      },
    ]
    return (
      <Spin spinning={loading?.models?.pendingOrders}>
        <Table
          pagination={true}
          bordered
          columns={columns}
          dataSource={pendingOrders?.list}
          simple
          rowKey={(record) => record.id}
          scroll={{ x: 1800 }}
        />
      </Spin>
    )
  }
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  location: PropTypes.object,
}

export default List
