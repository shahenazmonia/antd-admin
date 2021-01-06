import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'umi'
import { Row, Col, Button, Form, Input, Select, Spin } from 'antd'
import { Page } from 'components'
import { Avatar } from '../../services/components/upload'

@connect(({ categories, loading }) => ({ categories, loading }))
@connect(({ departments }) => ({ departments }))
class CreateCategory extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'departments/list',
      payload: {},
    })
  }
  onFinish = async (values) => {
    let formData = new FormData()
    formData.append('image', this.state.image.file.originFileObj)
    formData.append('nameAr', values.nameAr)
    formData.append('nameEn', values.nameEn)
    formData.append('price', values.price)
    formData.append('department', values.department)

    await this.props.dispatch({
      type: 'categories/create',
      payload: formData,
    })
  }
  render() {
    const { departments, loading } = this.props
    return (
      <div>
        <Page inner>
          <Spin spinning={loading?.global}>
            <Row justify="center">
              <Col lg={12} md={12} xs={24} sm={24}>
                <Form
                  name="basic"
                  initialValues={{ remember: true }}
                  onFinish={this.onFinish}
                  onFinishFailed={this.onFinishFailed}
                >
                  <Form.Item name="image">
                    <Avatar getImage={(image) => this.setState({ image })} />
                  </Form.Item>
                  <span>Name Ar</span>
                  <Form.Item
                    name="nameAr"
                    rules={[
                      { required: true, message: 'Please enter Ar. name' },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <span>Name En</span>
                  <Form.Item
                    name="nameEn"
                    rules={[
                      { required: true, message: 'Please enter En. name' },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <span>Price</span>
                  <Form.Item
                    name="price"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter the price',
                      },
                    ]}
                  >
                    <Input type="number" />
                  </Form.Item>
                  <span>Department</span>
                  <Form.Item
                    name="department"
                    rules={[
                      { required: true, message: 'Please select a department' },
                    ]}
                  >
                    <Select>
                      {departments?.list?.map((elm, index) => {
                        return (
                          <Select.Option key={index} value={elm._id}>
                            {elm.nameEn}
                          </Select.Option>
                        )
                      })}
                    </Select>
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </Spin>
        </Page>
      </div>
    )
  }
}

CreateCategory.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default CreateCategory
