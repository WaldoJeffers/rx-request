'use strict';

const JSONStream  = require('JSONStream');
const request     = require('request');
const Rx          = require('rx');

function rxify(method){
  return (url, path = null) =>
    Rx.Observable.create(observer =>
      method(url)
        .on('response', function onResponse(res){ // needs to be an ES5 function, otherwise `this` is undefined
          if (res.statusCode !== 200){
            this.emit('error', {
              statusCode    : res.statusCode,
              statusMessage : res.statusMessage
            });
          }
        })
        .on('error', err => observer.onError(err))  // JSONStream can not handle errors. Thus, we can not pipe to JSONStream directly if there is an error
        .pipe(JSONStream.parse(path))
        .on('data', data => observer.onNext(data))
        .on('end', () => observer.onCompleted())
    );
}

module.exports  = {
  get   : rxify(request.get),
  head  : rxify(request.head)
};
