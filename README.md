
# Reliability Kit: Serverless Example

This is an example [Serverless](https://www.serverless.com/) application which illustrates how to use [FT.com Reliability Kit](https://github.com/Financial-Times/dotcom-reliability-kit#readme).

All of the code for this example app is in [`index.js`](./index.js) and [`serverless.yml`](./serverless.yml).

> **Warning**
> It's important to remember that this app isn't an example of how to correctly set up a Financial Times Serverless application – it's used to illustrate how to integrate Reliability Kit with as little boilerplate code as possible.


## Running locally

First, you'll need to clone this repo and install dependencies with:

```
npm install
```

You can then invoke the Serverless function using one of the following.

Get a successful response with a debug log:

```
npm run invoke
```

Get a partially-successful response with a warning log:

```
npm run invoke-questionable
```

Get a bad response with an error log:

```
npm run invoke-bad
```


## Contributing

See the [central contributing guide for Reliability Kit](https://github.com/Financial-Times/dotcom-reliability-kit/blob/main/docs/contributing.md).


## License

Licensed under the [MIT](https://github.com/Financial-Times/dotcom-reliability-kit/blob/main/LICENSE) license.<br/>
Copyright &copy; 2023, The Financial Times Ltd.
