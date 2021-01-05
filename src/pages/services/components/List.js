import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Avatar } from 'antd'
import { DropOption } from 'components'
import { Trans } from '@lingui/react'
import { Link, connect } from 'umi'
import styles from './List.less'

@connect(({ loading, dispatch, services }) => ({ loading, dispatch, services }))
class List extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'services/list',
      payload: {},
    })
  }
  render() {
    const { services } = this.props
    const columns = [
      {
        title: <Trans>Image</Trans>,
        dataIndex: 'image',
        key: 'image',
        fixed: 'left',
        render: (text) => <Avatar style={{ marginLeft: 8 }} src={text} />,
      },
      {
        title: <Trans>name Ar</Trans>,
        dataIndex: 'nameAr',
        key: 'nameAr',
        render: (text, record) => (
          <Link to={`service/${record.id}`}>{text}</Link>
        ),
      },
      {
        title: <Trans>name En</Trans>,
        dataIndex: 'nameEn',
        key: 'nameEn',
        render: (text, record) => (
          <Link to={`service/${record.id}`}>{text}</Link>
        ),
      },
      {
        title: <Trans>Status</Trans>,
        dataIndex: 'status',
        key: 'status',
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
      <Table
        pagination={true}
        className={styles.table}
        bordered
        columns={columns}
        dataSource={services?.list}
        simple
        rowKey={(record) => record.id}
      />
    )
  }
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  location: PropTypes.object,
}

export default List
