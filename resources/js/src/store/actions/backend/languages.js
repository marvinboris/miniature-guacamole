import * as actionTypes from '../actionTypes';

const prefix = '/api/';

export const resetLanguages = () => ({ type: actionTypes.LANGUAGES_RESET });
const languagesStart = () => ({ type: actionTypes.LANGUAGES_START });
const languagesSuccess = data => ({ type: actionTypes.LANGUAGES_SUCCESS, ...data });
const languagesFail = error => ({ type: actionTypes.LANGUAGES_FAIL, error });
export const getLanguages = (page = 1, show = 10, search = '') => async (dispatch, getState) => {
    dispatch(languagesStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/languages?page=${page}&show=${show}&search=${search}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(languagesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(languagesFail(error));
    }
};

export const getLanguage = id => async (dispatch, getState) => {
    dispatch(languagesStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/languages/${id}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(languagesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(languagesFail(error));
    }
};

export const postLanguages = data => async (dispatch, getState) => {
    dispatch(languagesStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/languages`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        else if (res.status !== 200 && res.status !== 201) throw new Error(resData.error.message);
        dispatch(languagesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(languagesFail(error));
    }
};

export const patchLanguages = (id, data) => async (dispatch, getState) => {
    dispatch(languagesStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/languages/${id}`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token,
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(languagesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(languagesFail(error));
    }
};

export const deleteLanguages = id => async (dispatch, getState) => {
    dispatch(languagesStart());
    const { role } = getState().auth;

    try {
        const page = document.getElementById('table-page').value;
        const show = document.getElementById('table-show').value;
        const search = document.getElementById('table-search').value;

        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/languages/${id}?page=${page}&show=${show}&search=${search}`, {
            method: 'DELETE',
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(languagesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(languagesFail(error));
    }
};