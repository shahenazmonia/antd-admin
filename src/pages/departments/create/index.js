import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'umi'
import { Row, Col, Button, Form, Input, Select, Spin } from 'antd'
import { Page } from 'components'
import { Avatar } from '../../services/components/upload'

@connect(({ departments, loading }) => ({ departments, loading }))
class CreateDepartment extends Component {
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
    formData.append('type', values.type)
    formData.append('service', values.service)

    await this.props.dispatch({
      type: 'departments/create',
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

                  <span>Type</span>
                  <Form.Item
                    name="type"
                    rules={[{ required: true, message: 'Please enter type' }]}
                  >
                    <Select>
                      <Select.Option value="personal">Personal</Select.Option>
                      <Select.Option value="commercial">
                        Commercial
                      </Select.Option>
                      <Select.Option value="all">All</Select.Option>
                    </Select>
                  </Form.Item>
                  <span>Service</span>
                  <Form.Item
                    name="service"
                    rules={[
                      { required: true, message: 'Please select service' },
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

CreateDepartment.propTypes = {
  user: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default CreateDepartment
