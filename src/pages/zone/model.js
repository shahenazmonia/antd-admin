import modelExtend from 'dva-model-extend';
import api from 'api';
import { pageModel } from 'utils/model';
import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { delay } from 'redux-saga';
import _ from 'lodash';

const {
  zoneList,
  createZone,
  //  deleteZone, updateZone
} = api;

export default modelExtend(pageModel, {
  namespace: 'zone',

  state: {
    list: [],
    total: 0,
    npPages: 0,
    pageSize: 25,
  },
  effects: {
    *list({ payload }, { put, call }) {
      const data = yield call(zoneList, payload);
      if (data.success) {
        const { zones } = data;
        yield put({
          type: 'updateState',
          payload: {
            list: zones,
          },
        });
      } else {
        throw data;
      }
    },
    *create({ payload }, { put, call }) {
      try {
        const data = yield call(createZone, payload);
        if (data.success) {
          yield delay(6000);
          message.success('Zone has been Added Successfuly!');
          yield put(routerRedux.push('/zone'));
        } else {
          throw data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    // *delete({ payload }, { put, call }) {
    //   const data = yield call(deleteCategory, payload)
    //   if (data.success) {
    //     yield put({
    //       type: 'deleteFromList',
    //       payload: data.data.result,
    //     })
    //   } else {
    //     throw data
    //   }
    // },
    // *update({ payload }, { put, call }) {
    //   try {
    //     const data = yield call(updateCategory, payload)
    //     if (data.success) {
    //       yield delay(6000)
    //       message.success('تم تعديل بيانات العميل بنجاح!')
    //       window.location.reload()
    //     } else {
    //       throw data
    //     }
    //   } catch (error) {
    //     console.log('error', error)
    //   }
    // },
  },
  reducers: {
    deleteFromList(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      const { list } = newState;
      const newList =
        list && _.isArray(list) && list.filter((row) => row._id !== payload.id);
      return {
        ...state,
        list: newList,
      };
    },
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
});
