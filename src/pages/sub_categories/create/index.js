import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'umi'
import { Row, Col, Button, Form, Input, Select, Spin } from 'antd'
import { Page } from 'components'

@connect(({ subCategories, loading }) => ({ subCategories, loading }))
@connect(({ categories }) => ({ categories }))
class CreateSubCategory extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'categories/list',
      payload: {},
    })
  }
  onFinish = async (values) => {
    await this.props.dispatch({
      type: 'subCategories/create',
      payload: { ...values, duration: parseInt(values.duration) },
    })
  }
  render() {
    const { categories, loading } = this.props
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

                  <span>Duration</span>
                  <Form.Item
                    name="duration"
                    type="number"
                    rules={[
                      { required: true, message: 'Please enter the duration' },
                    ]}
                  >
                    <Input type="number" />
                  </Form.Item>
                  <span>Category</span>
                  <Form.Item
                    name="category"
                    rules={[
                      { required: true, message: 'Please select category' },
                    ]}
                  >
                    <Select>
                      {categories?.list?.map((elm, index) => {
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

CreateSubCategory.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default CreateSubCategory
