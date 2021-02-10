/* global window */

import modelExtend from 'dva-model-extend'
import api from 'api'
import { pageModel } from 'utils/model'
import { message } from 'antd'
import { routerRedux } from 'dva/router'
import { delay } from 'redux-saga'
import _ from 'lodash'

const { partsList, createPart, updatePart } = api

export default modelExtend(pageModel, {
  namespace: 'parts',

  state: {
    list: [],
    total: 0,
    npPages: 0,
    pageSize: 25,
  },
  effects: {
    *list({ payload }, { put, call }) {
      const data = yield call(partsList, payload)
      if (data.success) {
        const { Parts, partsLength } = data
        yield put({
          type: 'updateState',
          payload: {
            list: Parts,
            total: partsLength,
          },
        })
      } else {
        throw data
      }
    },
    *create({ payload }, { put, call }) {
      try {
        const data = yield call(createPart, payload)
        if (data.success) {
          yield delay(6000)
          message.success('Part has been added successfuly!')
          yield put(routerRedux.push('/Parts'))
        } else {
          throw data
        }
      } catch (error) {
        console.log(error)
      }
    },
    *update({ payload }, { put, call }) {
      try {
        console.log('payload', payload)
        const data = yield call(updatePart, payload)
        if (data.success) {
          yield delay(6000)
          message.success('part has been changed successfully')
          window.location.reload()
        } else {
          throw data
        }
      } catch (error) {
        console.log('error', error)
      }
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
})
