import * as actionTypes from '../actionTypes';

const prefix = '/api/';

export const resetCycles = () => ({ type: actionTypes.CYCLES_RESET });
const cyclesStart = () => ({ type: actionTypes.CYCLES_START });
const cyclesSuccess = data => ({ type: actionTypes.CYCLES_SUCCESS, ...data });
const cyclesFail = error => ({ type: actionTypes.CYCLES_FAIL, error });
export const getCycles = (page = 1, show = 10, search = '') => async (dispatch, getState) => {
    dispatch(cyclesStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/cycles?page=${page}&show=${show}&search=${search}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(cyclesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(cyclesFail(error));
    }
};

export const getCycle = id => async (dispatch, getState) => {
    dispatch(cyclesStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/cycles/${id}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(cyclesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(cyclesFail(error));
    }
};

export const postCycles = data => async (dispatch, getState) => {
    dispatch(cyclesStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/cycles`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        else if (res.status !== 200 && res.status !== 201) throw new Error(resData.error.message);
        dispatch(cyclesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(cyclesFail(error));
    }
};

export const patchCycles = (id, data) => async (dispatch, getState) => {
    dispatch(cyclesStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/cycles/${id}`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token,
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(cyclesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(cyclesFail(error));
    }
};

export const deleteCycles = id => async (dispatch, getState) => {
    dispatch(cyclesStart());
    const { role } = getState().auth;

    try {
        const page = document.getElementById('table-page').value;
        const show = document.getElementById('table-show').value;
        const search = document.getElementById('table-search').value;

        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/cycles/${id}?page=${page}&show=${show}&search=${search}`, {
            method: 'DELETE',
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(cyclesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(cyclesFail(error));
    }
};