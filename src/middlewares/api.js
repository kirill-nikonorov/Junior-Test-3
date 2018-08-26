import axios from 'axios';
import {camelizeKeys} from 'humps';
import {normalize} from 'normalizr';
import {showErrorNotification} from '../service';
import {BASE_URL, API_ID} from '../constants/apiConstants';

export const CALL_API = 'Call API';

const adjustUrl = (endpoint, queryParams) => {
    const url = endpoint.indexOf(BASE_URL) > -1 ? endpoint : BASE_URL + endpoint;
    return introduceQueryToUrl(url, queryParams);
};
const introduceQueryToUrl = (url, queryParams) => {
    queryParams.api_key = API_ID;
    queryParams.language = 'ru';

    return Object.keys(queryParams).reduce(
        (urlString, queryName, i, arr) =>
            `${urlString}${queryName}=${queryParams[queryName]}${arr.length - 1 > i ? '&' : ''}`,
        url + '?'
    );
};

const configureAxios = url => {
    const axiosConfig = {};
    axiosConfig.headers = {
        'Content-Type': 'application/json'
    };

    axiosConfig.method = axiosConfig.method || 'GET';
    axiosConfig.url = url;

    return axiosConfig;
};

const apiMiddleware = () => next => action => {
    const callApi = action[CALL_API];
    if (!callApi || callApi == null) return next(action);

    const {
        endpoint,
        types: [requestAction, successAction],
        schema,
        queryParams = {},
        extractDataForNormalizationFromResponseData,
        extractReadyToUseDataFromResponseData = () => {}
    } = callApi;

    const url = adjustUrl(endpoint, queryParams);

    const actionWith = (data = {}) => {
        const resultAction = Object.assign({}, action, data);
        delete resultAction[CALL_API];
        return resultAction;
    };
    const axiosConfig = configureAxios(url);

    next(requestAction(actionWith()));

    axios(axiosConfig)
        .then(({data}) => {
            const camelizedData = camelizeKeys(data);
            const readyToUseData = extractReadyToUseDataFromResponseData(camelizedData);

            if (extractDataForNormalizationFromResponseData) {
                const dataForNormalizing = extractDataForNormalizationFromResponseData(
                    camelizedData
                );
                const normalisedData = normalize(dataForNormalizing, schema);
                next(successAction(actionWith({...normalisedData, ...readyToUseData})));
            } else next(successAction(actionWith({...readyToUseData})));
        })
        .catch(handleError);
};

const handleError = ({response, request, message}) => {
    console.log('Error Occurred');
    if (response) {
        console.log('Error', response);
        const {data, status} = response;
        showErrorNotification(status, data);
    } else if (request) {
        console.log('Error', request);
        showErrorNotification('', request);
    } else {
        showErrorNotification('', message);
        console.log('Error', message);
    }
};

export default apiMiddleware;
