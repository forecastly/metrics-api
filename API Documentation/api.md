# ChartMogul Metrics API

> **IMPORTANT:** The ChartMogul Metrics API is currently in closed beta - you will not have access to the API from your account unless you have been added to the API beta program.

## Overview

The ChartMogul Metrics API allows you to programmatically access to much of the data you see in your ChartMogul account. You can use this API to consume the revenue data for a specific ChartMogul company, and use this in an external application or system.

The API supports [Cross-origin Resource Sharing (CORS)](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing) to allow you to consume it from a clientside application (However be careful to never expose your API key in any clientside code).

All response bodies are formatted in [JSON](http://json.org/).

**Note:** This API is READ-ONLY - you cannot make changes to your account's data, and the API only supports HTML GET requests.

## API Endpoint

The endpoint for version 1 of the ChartMogul Metrics API can be found at: `https://api.chartmogul.com/v1/`.

All requests to the endpoint must be made over [HTTPS](http://en.wikipedia.org/wiki/HTTP_Secure) - requests over HTTP will fail.

## Authentication

The ChartMogul Metrics API uses [HTTP Basic Authentication](http://en.wikipedia.org/wiki/Basic_access_authentication). This means that with **every** request you must provide your API key in the request header.

**Where's my API key?**

If you have access to the API, you can find your API key in the ChartMogul Settings page (click the gear icon in the top right of your account) - then you'll see an API tab:

SCREENSHOT



## HTTP Response Codes

The following response codes may be returned by the endpoint:

- `200` - OK (Everything worked as expected)
- `400` - Bad Request (Often missing a required parameter)
- `401` - Unauthorized (No valid API key provided in the request header - see Authentication)
- `402` - Request Failed (Parameters were valid but request failed)
- `404` - Not Found (The requested item doesn't exist)
- `500`, `502`, `503`, `504` - Server Errors (Something went wrong on ChartMogul's end)

## Endpoint Overview

- `/metrics/all` - All key metrics, for the specified time period
- `/metrics/mrr` - Monthly Recurring Revenue
- `/metrics/arr` - Annualized Run Rate
- `/metrics/arpa` - Average Revenue Per Account
- `/metrics/asp` - Average Sale Price
- `/metrics/customer-count` - Number of customers
- `/metrics/customer-churn-rate` - Customer Churn Rate
- `/metrics/mrr-churn-rate` - MRR Churn Rate
- `/metrics/ltv` - Customer Lifetime Value
- `/customers/search` - Find information for a specific customer


## Requesting Metrics Data


### /metrics/all

Returns an array of entries containing all of the key metrics for the specified time period and interval.

 - `start-date` (Date) (*required*) - The start date of the required period of data. An [ISO-8601](http://en.wikipedia.org/wiki/ISO_8601) formatted date, e.g. `"2015-05-12"`

 - `end-date` (Date) (*required*) - The end date of the required period of data. An [ISO-8601](http://en.wikipedia.org/wiki/ISO_8601) formatted date, e.g. `"2015-05-12"`

 - `interval` (String) - either `"day"` (default), `"week"`, `"month"`, `"quarter"`

 - `geo` (String) - A comma-separated list of [ISO 3166-1 Alpha-2](ISO 3166-1) formatted country codes to filter the results to, e.g. `"US","UK","DE"`.

 - `plans` (String) - A comma-separated list of plan names (as configured in your ChartMogul account) to filter the results to. Note that spaces must be url-encoded and the names are case-sensitive, e.g. `"Silver%20plan", "Gold%20plan", "Enterprise%20plan"`.

#### Example Request

```
https://api.chartmogul.com/v1/metrics/all?start-date=2009-01-01&end-date=2009-02-05
```

#### Example Response

```JSON
{
   "entries":[
      {
         "date":"2015-02-01",
         "customer-churn-rate":20,
         "mrr-churn-rate":14,
         "ltv":1250.3,
         "customers":331,
         "asp":125,
         "arpa":1250,
         "arr":254000,
         "mrr":21166
      },
      {
         "date":"2015-02-02",
         "customer-churn-rate":20,
         "mrr-churn-rate":22,
         "ltv":1248,
         "customers":329,
         "asp":125,
         "arpa":1250,
         "arr":238000,
         "mrr":21089
      },
      {...},
   ]
}
```
---

### /metrics/arr

Returns an array of entries containing Annualized Run Rate (ARR) values for the specified time period and filters.

#### Supported Parameters


 - `start-date` (Date) (*required*) - The start date of the required period of data. An [ISO-8601](http://en.wikipedia.org/wiki/ISO_8601) formatted date, e.g. `"2015-05-12"`

 - `end-date` (Date) (*required*) - The end date of the required period of data. An [ISO-8601](http://en.wikipedia.org/wiki/ISO_8601) formatted date, e.g. `"2015-05-12"`

 - `interval` (String) - either `"day"` (default), `"week"`, `"month"`, `"quarter"`

 - `geo` (String) - A comma-separated list of [ISO 3166-1 Alpha-2](ISO 3166-1) formatted country codes to filter the results to, e.g. `"US","UK","DE"`.

 - `plans` (String) - A comma-separated list of plan names (as configured in your ChartMogul account) to filter the results to. Note that spaces must be url-encoded and the names are case-sensitive, e.g. `"Silver%20plan", "Gold%20plan", "Enterprise%20plan"`.

#### Example Request

```
https://api.chartmogul.com/v1/metrics/arr?start-date=2009-01-01&end-date=2009-02-05&interval=days&geo=US
```

#### Example Response

```JSON
{
   "entries":[
      {
         "date":"2015-01-30",
         "arr":516000.5
      },
      {...}
   ],
   "summary":{
      "current":516000.5,
      "previous":509152.5,
      "percentage-change":15.7
   }
}
```
---

### /metrics/mrr

Returns an array of entries containing Monthly Recurring Revenue (MRR) values for the specified time period and filters.

#### Supported Parameters


 - `start-date` (Date) (*required*) - The start date of the required period of data. An [ISO-8601](http://en.wikipedia.org/wiki/ISO_8601) formatted date, e.g. `"2015-05-12"`

 - `end-date` (Date) (*required*) - The end date of the required period of data. An [ISO-8601](http://en.wikipedia.org/wiki/ISO_8601) formatted date, e.g. `"2015-05-12"`

 - `interval` (String) - either `"day"` (default), `"week"`, `"month"`, `"quarter"`

 - `geo` (String) - A comma-separated list of [ISO 3166-1 Alpha-2](ISO 3166-1) formatted country codes to filter the results to, e.g. `"US","UK","DE"`.

 - `plans` (String) - A comma-separated list of plan names (as configured in your ChartMogul account) to filter the results to. Note that spaces must be url-encoded and the names are case-sensitive, e.g. `"Silver%20plan", "Gold%20plan", "Enterprise%20plan"`.

#### Example Request

```
https://api.chartmogul.com/v1/metrics/mrr?start-date=2009-01-01&end-date=2009-02-05&interval=days&geo=US
```

#### Example Response

```JSON
{
   "entries":[
      {
         "date":"2015-01-30",
         "mrr":43000
      },
      {...}
   ],
   "summary":{
      "current":43000,
      "previous":41750,
      "percentage-change":5.2
   }
}
```
---

### /metrics/arpa

Returns an array of entries containing Average Revenue Per Account (ARPA) values for the specified time period and filters.

#### Supported Parameters


 - `start-date` (Date) (*required*) - The start date of the required period of data. An [ISO-8601](http://en.wikipedia.org/wiki/ISO_8601) formatted date, e.g. `"2015-05-12"`

 - `end-date` (Date) (*required*) - The end date of the required period of data. An [ISO-8601](http://en.wikipedia.org/wiki/ISO_8601) formatted date, e.g. `"2015-05-12"`

 - `interval` (String) - either `"day"` (default), `"week"`, `"month"`, `"quarter"`

 - `geo` (String) - A comma-separated list of [ISO 3166-1 Alpha-2](ISO 3166-1) formatted country codes to filter the results to, e.g. `"US","UK","DE"`.

 - `plans` (String) - A comma-separated list of plan names (as configured in your ChartMogul account) to filter the results to. Note that spaces must be url-encoded and the names are case-sensitive, e.g. `"Silver%20plan", "Gold%20plan", "Enterprise%20plan"`.

#### Example Request

```
https://api.chartmogul.com/v1/metrics/arpa?start-date=2009-01-01&end-date=2009-02-05&interval=days&geo=US
```

#### Example Response

```JSON
{
   "entries":[
      {
         "date":"2015-01-30",
         "arpa":223.7
      },
      {...}
   ],
   "summary":{
      "current":265.5,
      "previous":223.7,
      "percentage-change":15.7
   }
}
```
---

### /metrics/ltv

Returns an array of entries containing Customer Lifetime Value (LTV) values for the specified time period and filters.

#### Supported Parameters


 - `start-date` (Date) (*required*) - The start date of the required period of data. An [ISO-8601](http://en.wikipedia.org/wiki/ISO_8601) formatted date, e.g. `"2015-05-12"`

 - `end-date` (Date) (*required*) - The end date of the required period of data. An [ISO-8601](http://en.wikipedia.org/wiki/ISO_8601) formatted date, e.g. `"2015-05-12"`

 - `interval` (String) - either `"day"` (default), `"week"`, `"month"`, `"quarter"`

 - `geo` (String) - A comma-separated list of [ISO 3166-1 Alpha-2](ISO 3166-1) formatted country codes to filter the results to, e.g. `"US","UK","DE"`.

 - `plans` (String) - A comma-separated list of plan names (as configured in your ChartMogul account) to filter the results to. Note that spaces must be url-encoded and the names are case-sensitive, e.g. `"Silver%20plan", "Gold%20plan", "Enterprise%20plan"`.

#### Example Request

```
https://api.chartmogul.com/v1/metrics/ltv?start-date=2009-01-01&end-date=2009-02-05&interval=days&geo=US
```

#### Example Response

```JSON
{
   "entries":[
      {
         "date":"2015-01-30",
         "ltv":12580
      },
      {...}
   ],
   "summary":{
      "current":12580,
      "previous":8029,
      "percentage-change":42.6
   }
}
```
---

### /metrics/customer-count

Returns an array of entries containing Customer Count (number of customers) values for the specified time period and filters.

#### Supported Parameters


 - `start-date` (Date) (*required*) - The start date of the required period of data. An [ISO-8601](http://en.wikipedia.org/wiki/ISO_8601) formatted date, e.g. `"2015-05-12"`

 - `end-date` (Date) (*required*) - The end date of the required period of data. An [ISO-8601](http://en.wikipedia.org/wiki/ISO_8601) formatted date, e.g. `"2015-05-12"`

 - `interval` (String) - either `"day"` (default), `"week"`, `"month"`, `"quarter"`

 - `geo` (String) - A comma-separated list of [ISO 3166-1 Alpha-2](ISO 3166-1) formatted country codes to filter the results to, e.g. `"US","UK","DE"`.

 - `plans` (String) - A comma-separated list of plan names (as configured in your ChartMogul account) to filter the results to. Note that spaces must be url-encoded and the names are case-sensitive, e.g. `"Silver%20plan", "Gold%20plan", "Enterprise%20plan"`.

#### Example Request

```
https://api.chartmogul.com/v1/metrics/customer-count?start-date=2009-01-01&end-date=2009-02-05&interval=days&geo=US
```

#### Example Response

```JSON
{
   "entries":[
      {
         "date":"2015-01-30",
         "customer-count":382
      },
      {...}
   ],
   "summary":{
      "current":382,
      "previous":379,
      "percentage-change":4
   }
}
```
---

### /metrics/mrr-churn-rate

Returns an array of entries containing MRR Churn Rate values for the specified time period and filters.

#### Supported Parameters


 - `start-date` (Date) (*required*) - The start date of the required period of data. An [ISO-8601](http://en.wikipedia.org/wiki/ISO_8601) formatted date, e.g. `"2015-05-12"`

 - `end-date` (Date) (*required*) - The end date of the required period of data. An [ISO-8601](http://en.wikipedia.org/wiki/ISO_8601) formatted date, e.g. `"2015-05-12"`

 - `interval` (String) - either `"day"` (default), `"week"`, `"month"`, `"quarter"`

 - `geo` (String) - A comma-separated list of [ISO 3166-1 Alpha-2](ISO 3166-1) formatted country codes to filter the results to, e.g. `"US","UK","DE"`.

 - `plans` (String) - A comma-separated list of plan names (as configured in your ChartMogul account) to filter the results to. Note that spaces must be url-encoded and the names are case-sensitive, e.g. `"Silver%20plan", "Gold%20plan", "Enterprise%20plan"`.

#### Example Request

```
https://api.chartmogul.com/v1/metrics/mrr-churn-rate?start-date=2009-01-01&end-date=2009-02-05&interval=days&geo=US
```

#### Example Response

```JSON
{
   "entries":[
      {
         "date":"2015-01-30",
         "mrr-churn-rate":8.4
      },
      {...}
   ],
   "summary":{
      "current":8.4,
      "previous":9.6,
      "percentage-change":2
   }
}
```
---

### /metrics/customer-churn-rate

Returns an array of entries containing Customer Churn Rate values for the specified time period and filters.

#### Supported Parameters


 - `start-date` (Date) (*required*) - The start date of the required period of data. An [ISO-8601](http://en.wikipedia.org/wiki/ISO_8601) formatted date, e.g. `"2015-05-12"`

 - `end-date` (Date) (*required*) - The end date of the required period of data. An [ISO-8601](http://en.wikipedia.org/wiki/ISO_8601) formatted date, e.g. `"2015-05-12"`

 - `interval` (String) - either `"day"` (default), `"week"`, `"month"`, `"quarter"`

 - `geo` (String) - A comma-separated list of [ISO 3166-1 Alpha-2](ISO 3166-1) formatted country codes to filter the results to, e.g. `"US","UK","DE"`.

 - `plans` (String) - A comma-separated list of plan names (as configured in your ChartMogul account) to filter the results to. Note that spaces must be url-encoded and the names are case-sensitive, e.g. `"Silver%20plan", "Gold%20plan", "Enterprise%20plan"`.

#### Example Request

```
https://api.chartmogul.com/v1/metrics/customer-churn-rate?start-date=2009-01-01&end-date=2009-02-05&interval=days&geo=US
```

#### Example Response

```JSON
{
   "entries":[
      {
         "date":"2015-01-30",
         "customer-churn-rate":9.8
      },
      {...}
   ],
   "summary":{
      "current":9.8,
      "previous":8.5,
      "percentage-change":2
   }
}
```
---

### /metrics/asp

Returns an array of entries containing Average Sale Price values for the specified time period and filters.

#### Supported Parameters


 - `start-date` (Date) (*required*) - The start date of the required period of data. An [ISO-8601](http://en.wikipedia.org/wiki/ISO_8601) formatted date, e.g. `"2015-05-12"`

 - `end-date` (Date) (*required*) - The end date of the required period of data. An [ISO-8601](http://en.wikipedia.org/wiki/ISO_8601) formatted date, e.g. `"2015-05-12"`

 - `interval` (String) - either `"day"` (default), `"week"`, `"month"`, `"quarter"`

 - `geo` (String) - A comma-separated list of [ISO 3166-1 Alpha-2](ISO 3166-1) formatted country codes to filter the results to, e.g. `"US","UK","DE"`.

 - `plans` (String) - A comma-separated list of plan names (as configured in your ChartMogul account) to filter the results to. Note that spaces must be url-encoded and the names are case-sensitive, e.g. `"Silver%20plan", "Gold%20plan", "Enterprise%20plan"`.

#### Example Request

```
https://api.chartmogul.com/v1/metrics/asp?start-date=2009-01-01&end-date=2009-02-05&interval=days&geo=US
```

#### Example Response

```JSON
{
   "entries":[
      {
         "date":"2015-01-30",
         "asp":85.0
      },
      {...}
   ],
   "summary":{
      "current":85.0,
      "previous":88.0,
      "percentage-change":2.2
   }
}
```

## Requesting Customer Data (Coming Soon)

### /customers/search

Returns an array of entries containing customer data.

#### Supported Parameters

- `email` (String) (*required*) - The email address of the required customer.

#### Example Request

```
https://api.chartmogul.com/v1/customers/search?email=john@healthyfoodboxes.com
```

#### Example Response

```JSON
{
	"entries":[
		{
			"company":"Healthy Foodboxes inc.",
			"owner-email":"john@healthyfoodboxes.com",
			"customer-since":"2015-06-15",
			"location":"California, USA",
			"arr":"3228",
			"percentage-of-world-mrr":"1.3",
			"mrr":"269",
			"status":"active",
			"billing-system-type":"stripe",
			"billing-system-url":"https://dashboard.stripe.com/customers/cus_6QtIjg9oa1Awij",
			"chartmogul-url":"https://app.chartmogul.com/#customers/6652512-Sentry,"
			"subscriptions":[
				{
					"plan":"Gold Enterprise",
					"quantity": 1,
					"mrr":"269",
					"billing-cycle":"monthly",
					"next-payment":"2015-07-15",
					"start-date":"2015-06-15",
					"currency":"usd",
					"discount":0,
					"status":"active"
				}
			],
			"activities":[
				{
					"description":"purchased the PRO Plan (3,000 active cust.) monthly plan (1)",
					"activity-mrr":"269",
					"activity-arr":"3228",
					"date":"2015-06-15T19:37",
					"type":"subscribe"
				},
				{
					"description":"upgraded to the Gold Enterprise Plan (10,000 active cust.) monthly plan (1)",
					"activity-mrr":"529",
					"activity-arr":"6348",
					"date":"2015-06-30T18:02",
					"type":"upgrade"
				}
			]
		}
	]
}
```
