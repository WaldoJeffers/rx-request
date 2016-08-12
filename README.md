# rx-request
[![Dependency Status](https://david-dm.org/WaldoJeffers/rx-request.svg)](https://david-dm.org/WaldoJeffers/rx-request)

**request + RxJS + JSONStream**

## Description
A small module that allows you to manipulate the result of an HTTP request as an observable sequence.

## Usage
### RxRequest.HTTP_METHOD(url | options, [path = null])
where :
* `HTTP_METHOD` : any HTTP method supported by [request](https://github.com/request/request#convenience-methods)
* `url | options` (String | Object) : string URL, or an options object to pass to [request](https://github.com/request/request#requestoptions-callback)
* `path` (String) : a JSON path that will be passed to [JSONStream.parse](https://github.com/dominictarr/JSONStream#jsonstreamparsepath).

## Examples
### Without JSON path
The following request :
```
RxRequest.get(''https://swapi.co/api/starships/').subscribe(...)
```
will give you the entire JSON response as **one** element in the observable sequence :
```
{
  count: 37,
  next: 'http://swapi.co/api/starships/?page=2',
  previous: null,
  results: [
    {
      name: 'Sentinel-class landing craft',
      ...
    },
    ...
  ]
}
```

### With a JSON path
The following request :
```
RxRequest.get(''https://swapi.co/api/starships/', 'results.*').subscribe(...)
```

will emit each starship as an element of the observable sequence, avoiding you the extra flattening operation :
```
{
  name: 'Death Star',
  ...
}
{
  name: 'Millennium Falcon',
  ...
}
```
