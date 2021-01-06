import modelExtend from 'dva-model-extend'
import api from 'api'
import { pageModel } from 'utils/model'
import { message } from 'antd'
import { routerRedux } from 'dva/router'
import { delay } from 'redux-saga'
import _ from 'lodash'
import React from 'react'

const { categoriesList, createCategory } = api

export default modelExtend(pageModel, {
  namespace: 'categories',

  state: {
    list: [],
    total: 0,
    npPages: 0,
    pageSize: 25,
  },
  effects: {
    *list({ payload }, { put, call }) {
      const data = yield call(categoriesList, payload)
      if (data.success) {
        const { categories, categoryLength } = data
        yield put({
          type: 'updateState',
          payload: {
            list: categories,
            total: categoryLength,
          },
        })
      } else {
        throw data
      }
    },
    // *toggleClients({ payload }, { put, call }) {
    //   const data = yield call(toggleClientsStatus, payload)
    //   if (data.success) {
    //     yield put({
    //       type: 'toggleEnableDisableClients',
    //       payload: data.data,
    //     })
    //   } else {
    //     throw data
    //   }
    // },
    *create({ payload }, { put, call }) {
      try {
        const data = yield call(createCategory, payload)
        if (data.success) {
          yield delay(6000)
          message.success('Category has been Added Successfuly!')
          yield put(routerRedux.push('/categories'))
        } else {
          throw data
        }
      } catch (error) {
        console.log(error)
      }
    },
    // *update({ payload }, { put, call }) {
    //   try {
    //     const data = yield call(updateServices, payload)
    //     if (data.success) {
    //       yield delay(6000)
    //       message.success('تم تعديل بيانات العميل بنجاح!')
    //       yield put(routerRedux.push('/services'))
    //     } else {
    //       throw data
    //     }
    //   } catch (error) {
    //     let { fields } = error
    //     Object.keys(fields).map((field) => {
    //       fields[field].status === 'error' &&
    //         message.error({
    //           content: <span id={field}>{fields[field].feedback.ar}</span>,
    //           style: {
    //             marginTop: '20vh',
    //           },
    //         })
    //     })
    //     yield put({
    //       type: 'updateState',
    //       payload: {
    //         errorFields: Object.keys(fields).filter(
    //           (field) => fields[field].status === 'error'
    //         ),
    //       },
    //     })
    //   }
    // },
    // *details({ payload }, { put, call }) {
    //   const data = yield call(getClients, payload)
    //   if (data.success) {
    //     yield put({
    //       type: 'updateState',
    //       payload: {
    //         details: data.data,
    //       },
    //     })
    //   } else {
    //     throw data
    //   }
    // },
  },
  reducers: {
    // toggleEnableDisableClients(state, { payload }) {
    //   const newState = JSON.parse(JSON.stringify(state))
    //   const { list } = newState
    //   const newList =
    //     list &&
    //     _.isArray(list) &&
    //     list.map((row) => {
    //       if (row.objectID === payload.objectID) {
    //         row.status = payload.status
    //       }
    //       return row
    //     })
    //   return {
    //     ...state,
    //     list: newList,
    //   }
    // },
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
})
