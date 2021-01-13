import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'umi'
import { Row, Col, Button, Form, Input, Spin } from 'antd'
import { Page } from 'components'
import { Avatar } from '../../services/components/upload'
import './index.less'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

@connect(({ packages, loading }) => ({ packages, loading }))
class CreatePackage extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'categories/list',
      payload: {},
    })
  }
  onFinish = async (values) => {
    const {
      nameAr,
      nameEn,
      descriptionAr,
      descriptionEn,
      type,
      duration,
      features,
      discount,
      basePrice,
      extraOptions,
    } = values
    let formData = new FormData()
    formData.append('image', this.state.image.file.originFileObj)
    formData.append('nameAr', nameAr)
    formData.append('nameEn', nameEn)
    formData.append('type', type)
    formData.append('descriptionAr', descriptionAr)
    formData.append('descriptionEn', descriptionEn)
    formData.append('duration', duration)
    formData.append('features', features)
    formData.append('discount', discount)
    formData.append('basePrice', basePrice)
    formData.append('extraOption', extraOptions)

    await this.props.dispatch({
      type: 'packages/create',
      payload: formData,
    })
  }

  render() {
    const { loading } = this.props
    return (
      <div>
        <Page inner>
          <Spin spinning={loading?.global}>
            <Row justify="center">
              <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
                style={{ width: '100%' }}
              >
                <Col span={22}>
                  <Row gutter={40}>
                    <Col lg={12} md={12} xs={24} sm={24}>
                      <Form.Item name="image">
                        <Avatar
                          getImage={(image) => this.setState({ image })}
                        />
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

                      <span>Description Ar</span>
                      <Form.Item
                        name="descriptionAr"
                        rules={[
                          {
                            required: true,
                            message: 'Please enter Ar. description',
                          },
                        ]}
                      >
                        <Input.TextArea />
                      </Form.Item>
                      <span>Description En</span>
                      <Form.Item
                        name="descriptionEn"
                        rules={[
                          {
                            required: true,
                            message: 'Please enter En. description',
                          },
                        ]}
                      >
                        <Input.TextArea />
                      </Form.Item>
                      <span>Type</span>
                      <Form.Item
                        name="type"
                        rules={[
                          {
                            required: true,
                            message: 'Please enter the type',
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <span>Base Price</span>
                      <Form.Item
                        name="basePrice"
                        rules={[
                          {
                            required: true,
                            message: 'Please penter the Base Price',
                          },
                        ]}
                      >
                        <Input type="number" />
                      </Form.Item>
                    </Col>
                    <Col lg={12} md={12} xs={24} sm={24}>
                      <span>Discount</span>
                      <Form.Item
                        name="discount"
                        rules={[
                          { required: true, message: 'Please enter discount' },
                        ]}
                      >
                        <Input type="number" />
                      </Form.Item>
                      <span>Number Of Visit</span>
                      <Form.Item
                        name="numberOfVisit"
                        rules={[
                          {
                            required: true,
                            message: 'Please enter the number of visit',
                          },
                        ]}
                      >
                        <Input type="number" />
                      </Form.Item>
                      <span>Duration</span>
                      <Form.Item
                        name="duration"
                        rules={[
                          {
                            required: true,
                            message: 'Please enter the duration',
                          },
                        ]}
                      >
                        <Input type="number" />
                      </Form.Item>

                      <span>Features</span>
                      <Form.List name="features">
                        {(fields, { add, remove }) => (
                          <>
                            {fields.map((field) => (
                              <Row>
                                <Col span={20}>
                                  <Form.Item
                                    {...field}
                                    name={[field.name, 'arFeature']}
                                    fieldKey={[field.fieldKey, 'arFeature']}
                                    rules={[
                                      {
                                        required: true,
                                        message: 'please enter Ar. feature',
                                      },
                                    ]}
                                  >
                                    <Input placeholder="Ar. Feature" />
                                  </Form.Item>
                                  <Form.Item
                                    {...field}
                                    name={[field.name, 'enFeature']}
                                    fieldKey={[field.fieldKey, 'enFeature']}
                                    rules={[
                                      {
                                        required: true,
                                        message: 'please enter En. feature',
                                      },
                                    ]}
                                  >
                                    <Input placeholder="En. Feature" />
                                  </Form.Item>
                                </Col>
                                <Col span={3} offset={1}>
                                  <MinusCircleOutlined
                                    onClick={() => remove(field.name)}
                                  />
                                </Col>
                              </Row>
                            ))}
                            <Form.Item>
                              <Button
                                type="dashed"
                                onClick={() => add()}
                                block
                                icon={<PlusOutlined />}
                              >
                                Add Feature
                              </Button>
                            </Form.Item>
                          </>
                        )}
                      </Form.List>
                      <span>Extra Options</span>
                      <Form.Item
                        name="extraOptions"
                        rules={[
                          {
                            required: true,
                            message: 'Please enter extra option',
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item>
                        <Button type="primary" htmlType="submit">
                          Submit
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
              </Form>
            </Row>
          </Spin>
        </Page>
      </div>
    )
  }
}

CreatePackage.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default CreatePackage
