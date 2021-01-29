import * as actionTypes from '../actionTypes';

const prefix = '/api/';

export const resetFeatures = () => ({ type: actionTypes.FEATURES_RESET });
const featuresStart = () => ({ type: actionTypes.FEATURES_START });
const featuresSuccess = data => ({ type: actionTypes.FEATURES_SUCCESS, ...data });
const featuresFail = error => ({ type: actionTypes.FEATURES_FAIL, error });
export const getFeatures = (page = 1, show = 10, search = '') => async (dispatch, getState) => {
    dispatch(featuresStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/features?page=${page}&show=${show}&search=${search}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(featuresSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(featuresFail(error));
    }
};

export const getFeature = id => async (dispatch, getState) => {
    dispatch(featuresStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/features/${id}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(featuresSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(featuresFail(error));
    }
};

export const postFeatures = data => async (dispatch, getState) => {
    dispatch(featuresStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/features`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        else if (res.status !== 200 && res.status !== 201) throw new Error(resData.error.message);
        dispatch(featuresSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(featuresFail(error));
    }
};

export const patchFeatures = (id, data) => async (dispatch, getState) => {
    dispatch(featuresStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/features/${id}`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token,
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(featuresSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(featuresFail(error));
    }
};

export const deleteFeatures = id => async (dispatch, getState) => {
    dispatch(featuresStart());
    const { role } = getState().auth;

    try {
        const page = document.getElementById('table-page').value;
        const show = document.getElementById('table-show').value;
        const search = document.getElementById('table-search').value;

        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/features/${id}?page=${page}&show=${show}&search=${search}`, {
            method: 'DELETE',
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(featuresSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(featuresFail(error));
    }
};