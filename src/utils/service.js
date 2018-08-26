import _ from 'lodash';
import request from 'superagent';
import Config from './config';
import URLs from './urls';

function _replaceUrlParams(url, urlParams) {
  const _urlParams = urlParams;
  return url.replace(/:(.*?)\//g, (rawUrl, urlParam) => {
    const value = _urlParams[urlParam];
    delete _urlParams[urlParam];
    return rawUrl.replace(urlParam, value).replace(':', '');
  });
}

function _getUrl(url, urlParams) {
  const API_HOST = Config.getApi();
  url = `${URLs[url]}`;
  if (urlParams) {
    url = _replaceUrlParams(url, urlParams);
  }
  return API_HOST + url;
}

function rejectWithAnError(error) {
  let err = null;
  if (error.response) {
    err = {error: true, message: error.response};
  } else {
    err = {error: true, message: error};
  }
  return Promise.reject(err);
}

function errorCallback(error) {
  return (
    rejectWithAnError(error)
      // Comment out this catch handler completely, and the Promise stack trace
      // will correctly show the "RejectWithAnError" method as the error origin.
      .catch(status =>
        // Neither of these lines will show "RejectWithAnError" in the Promise chain stack trace.
        // throw status;
        Promise.reject(status)
      )
  );
}

function _getHeaders(headers, files, token) {
  const _headers = {
    Authorization: `Token ${token}`,
    ...headers
  };
  // if files are not defined, set content type
  if (_.isEmpty(files)) {
    _headers['Content-Type'] = 'application/json';
  }
  return _headers;
}

function _callbackProcessor({text: response}) {
  return JSON.parse(response);
}

function _doRequest(method, params, files, fileFieldName = 'file') {
  let req = null;
  const url = _getUrl(params.url, params.urlParams);
  const requestData = params.params || {};
  const queryData = params.query || {};
  const headers = _getHeaders(params.headers, files, params.token);
  const callbackProcessor = params.callbackProcessor || _callbackProcessor;
  let imageName = null;
  let imageNameWithExt = null;
  switch (method) {
    case 'GET':
      req = request.get(url).query(requestData || queryData);
      break;
    case 'POST': //eslint-disable-line
      req = request
        .post(url)
        .type('application/json')
        .set('Cache-Control', 'no-cache');
      if (!_.isEmpty(files)) {
        req = req.set(headers); // attach headers now to prevent breaking the request
        // req.type('multipart/form-data');
        files.forEach(file => {
          req = req.attach(fileFieldName, file, file.name);
        });
        // set the form field data
        for (const k in requestData) {
          if (typeof requestData[k] === 'object') {
            req = req.field(k, JSON.stringify(requestData[k]));
          } else {
            req = req.field(k, requestData[k] || '');
          }
        }
        return req.then(callbackProcessor);
      }

      req = req.query(queryData).send(requestData);

      break;

    case 'DELETE':
      req = request.del(url).query(requestData);
      break;
    default:
      if (process.env.NODE_ENV === 'development') {
        throw new Error(`"${method}" is not a valid method.`);
      }
  }
  return req
    .accept('application/json')
    .set(headers)
    .then(callbackProcessor)
    .catch(errorCallback);
}

export function doGet(params) {
  return _doRequest('GET', params);
}

export function doPost(params, files, fileFieldName = 'file') {
  return _doRequest('POST', params, files, fileFieldName);
}

export function doMultipart(params, files, fileFieldName = 'file') {
  return _doRequest('MULTIPART', params, files, fileFieldName);
}

export function doDelete(params) {
  return _doRequest('DELETE', params);
}

export default {
  doGet,
  doPost,
  doDelete,
  doMultipart
};
