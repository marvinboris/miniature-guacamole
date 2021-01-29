import * as actionTypes from '../actionTypes';

const prefix = '/api/';

export const resetYears = () => ({ type: actionTypes.YEARS_RESET });
const yearsStart = () => ({ type: actionTypes.YEARS_START });
const yearsSuccess = data => ({ type: actionTypes.YEARS_SUCCESS, ...data });
const yearsFail = error => ({ type: actionTypes.YEARS_FAIL, error });
export const getYears = (page = 1, show = 10, search = '') => async (dispatch, getState) => {
    dispatch(yearsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/years?page=${page}&show=${show}&search=${search}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(yearsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(yearsFail(error));
    }
};

export const getYear = id => async (dispatch, getState) => {
    dispatch(yearsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/years/${id}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(yearsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(yearsFail(error));
    }
};

export const postYears = data => async (dispatch, getState) => {
    dispatch(yearsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/years`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        else if (res.status !== 200 && res.status !== 201) throw new Error(resData.error.message);
        dispatch(yearsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(yearsFail(error));
    }
};

export const patchYears = (id, data) => async (dispatch, getState) => {
    dispatch(yearsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/years/${id}`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token,
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(yearsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(yearsFail(error));
    }
};

export const deleteYears = id => async (dispatch, getState) => {
    dispatch(yearsStart());
    const { role } = getState().auth;

    try {
        const page = document.getElementById('table-page').value;
        const show = document.getElementById('table-show').value;
        const search = document.getElementById('table-search').value;

        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/years/${id}?page=${page}&show=${show}&search=${search}`, {
            method: 'DELETE',
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(yearsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(yearsFail(error));
    }
};