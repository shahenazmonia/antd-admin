import modelExtend from 'dva-model-extend'
import api from 'api'
import { pageModel } from 'utils/model'
import { message } from 'antd'
import { routerRedux } from 'dva/router'
import { delay } from 'redux-saga'
import _ from 'lodash'

const { promoList, createPromoCode, deletePromoCode, updatePromoCode } = api

export default modelExtend(pageModel, {
  namespace: 'promoCode',

  state: {
    list: [],
    total: 0,
    npPages: 0,
    pageSize: 25,
  },
  effects: {
    *list({ payload }, { put, call }) {
      const data = yield call(promoList, payload)
      if (data.success) {
        const { promoCodes, categoryLength } = data
        yield put({
          type: 'updateState',
          payload: {
            list: promoCodes,
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
        const data = yield call(createPromoCode, payload)
        if (data.success) {
          yield delay(6000)
          message.success('Promo Code has been Added Successfuly!')
          yield put(routerRedux.push('/promo_code'))
        } else {
          throw data
        }
      } catch (error) {
        console.log(error)
      }
    },
    *delete({ payload }, { put, call }) {
      const data = yield call(deletePromoCode, payload)
      if (data.success) {
        yield put({
          type: 'deleteFromList',
          payload: data.data.result,
        })
      } else {
        throw data
      }
    },
    *update({ payload }, { put, call }) {
      try {
        const data = yield call(updatePromoCode, payload)
        if (data.success) {
          yield delay(6000)
          message.success('data has been updated successfully')
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
    deleteFromList(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state))
      const { list } = newState
      const newList =
        list && _.isArray(list) && list.filter((row) => row._id !== payload.id)
      return {
        ...state,
        list: newList,
      }
    },
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
})
