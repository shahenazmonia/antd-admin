import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Avatar, Spin } from 'antd'
import { DropOption } from 'components'
import { Trans } from '@lingui/react'
import { Link, connect } from 'umi'
import styles from './List.less'

@connect(({ loading, dispatch, categories }) => ({
  loading,
  dispatch,
  categories,
}))
class List extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'categories/list',
      payload: {},
    })
  }
  render() {
    const { categories, loading } = this.props
    const columns = [
      {
        title: <Trans>Image</Trans>,
        dataIndex: 'image',
        key: 'image',
        fixed: 'left',
        render: (text) => <Avatar style={{ marginLeft: 8 }} src={text} />,
      },
      {
        title: <Trans>Name Ar</Trans>,
        dataIndex: 'nameAr',
        key: 'nameAr',
        render: (text, record) => (
          <Link to={`category/${record.id}`}>{text}</Link>
        ),
      },
      {
        title: <Trans>Name En</Trans>,
        dataIndex: 'nameEn',
        key: 'nameEn',
        render: (text, record) => (
          <Link to={`category/${record.id}`}>{text}</Link>
        ),
      },
      {
        title: <Trans>Price</Trans>,
        dataIndex: 'price',
        key: 'price',
        render: (text, record) => (
          <Link to={`category/${record.id}`}>{text}</Link>
        ),
      },
      {
        title: <Trans>Department</Trans>,
        dataIndex: ['department', 'nameEn'],
        key: 'department',
        render: (text, record) => (
          <Link to={`category/${record.id}`}>{text}</Link>
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
      <Spin spinning={loading?.global}>
        <Table
          pagination={true}
          className={styles.table}
          bordered
          columns={columns}
          dataSource={categories?.list}
          simple
          rowKey={(record) => record.id}
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
