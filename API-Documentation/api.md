# ChartMogul Metrics API

## Overview

The ChartMogul Metrics API allows you to programmatically access much of the data you see in your ChartMogul account. You can consume the revenue data for your whole account or a specific customer, and use this in an external application or system.

The API supports [Cross-origin Resource Sharing (CORS)](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing) to allow you to consume it from a clientside application (However be careful to never expose your API key in any clientside code).

All response bodies are formatted in [JSON](http://json.org/).

**Note:** This API is READ-ONLY - you cannot make changes to your account's data, and the API only supports HTML GET requests.

## API Endpoint

The endpoint for version 1 of the ChartMogul Metrics API can be found at: `https://api.chartmogul.com/v1/`.

All requests to the endpoint must be made over [HTTPS](http://en.wikipedia.org/wiki/HTTP_Secure) - requests over HTTP will fail.

## Authentication

The ChartMogul Metrics API uses [HTTP Basic Authentication](http://en.wikipedia.org/wiki/Basic_access_authentication). This means that with **every** request you must provide your API key in the request header.

**Where's my API key?**

You can find your API key in the ChartMogul [Admin pages](https://app.chartmogul.com/#admin/api) (click the gear icon in the top right of your account - you need to be an admin on your account) - then you'll see an API tab:

![Admin - API](admin-api.jpg?raw=true "Admin API")



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
- `/customers/{id}/subscriptions` - Get a list of subscriptions for a single customer
- `/customers/{id}/activities` - Get a list of activities for a single customer


## Requesting Metrics Data


### /metrics/all

Returns an array of entries containing all of the key metrics for the specified time period and interval.

 - `start-date` (Date) (*required*) - The start date of the required period of data. An [ISO-8601](http://en.wikipedia.org/wiki/ISO_8601) formatted date, e.g. `"2015-05-12"`

 - `end-date` (Date) (*required*) - The end date of the required period of data. An [ISO-8601](http://en.wikipedia.org/wiki/ISO_8601) formatted date, e.g. `"2015-05-12"`

 - `interval` (String) - either `"day"` (default), `"week"`, `"month"`, `"quarter"`

 - `geo` (String) - A comma-separated list of [ISO 3166-1 Alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) formatted country codes to filter the results to, e.g. `"US","GB","DE"`.

 - `plans` (String) - A comma-separated list of plan names (as configured in your ChartMogul account) to filter the results to. Note that spaces must be url-encoded and the names are case-sensitive, e.g. `"Silver%20plan", "Gold%20plan", "Enterprise%20plan"`.

#### Example Request

```
https://api.chartmogul.com/v1/metrics/all?start-date=2009-01-01&end-date=2009-02-05
```

#### Example cURL Request

```
curl https://api.chartmogul.com/v1/metrics/all \
-X GET \
-u 41e70131daaf56b516f32a38c8b8628d:187583e8b9d77eadae8c6a1db83f7875 \
-d interval=month \
-d start-date=2015-01-01 \
-d end-date=2015-11-24 \
-d geo=GB \
-d plan="PRO Plan" 
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

 - `geo` (String) - A comma-separated list of [ISO 3166-1 Alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) formatted country codes to filter the results to, e.g. `"US","UK","DE"`.

 - `plans` (String) - A comma-separated list of plan names (as configured in your ChartMogul account) to filter the results to. Note that spaces must be url-encoded and the names are case-sensitive, e.g. `"Silver%20plan", "Gold%20plan", "Enterprise%20plan"`.

#### Example Request

```
https://api.chartmogul.com/v1/metrics/arr?start-date=2009-01-01&end-date=2009-02-05&interval=days&geo=US
```

#### Example cURL Request

```
curl https://api.chartmogul.com/v1/metrics/arr \
-X GET \
-u 41e70131daaf56b516f32a38c8b8628d:187583e8b9d77eadae8c6a1db83f7875 \
-d interval=month \
-d start-date=2015-01-01 \
-d end-date=2015-11-24 \
-d geo=US
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

 - `geo` (String) - A comma-separated list of [ISO 3166-1 Alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) formatted country codes to filter the results to, e.g. `"US","UK","DE"`.

 - `plans` (String) - A comma-separated list of plan names (as configured in your ChartMogul account) to filter the results to. Note that spaces must be url-encoded and the names are case-sensitive, e.g. `"Silver%20plan", "Gold%20plan", "Enterprise%20plan"`.

#### Example Request

```
https://api.chartmogul.com/v1/metrics/mrr?start-date=2009-01-01&end-date=2009-02-05&interval=days&geo=US
```

#### Example cURL Request

```
curl https://api.chartmogul.com/v1/metrics/mrr \
-X GET \
-u 41e70131daaf56b516f32a38c8b8628d:187583e8b9d77eadae8c6a1db83f7875 \
-d interval=week \
-d start-date=2015-01-01 \
-d end-date=2015-11-01
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

 - `geo` (String) - A comma-separated list of [ISO 3166-1 Alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) formatted country codes to filter the results to, e.g. `"US","UK","DE"`.

 - `plans` (String) - A comma-separated list of plan names (as configured in your ChartMogul account) to filter the results to. Note that spaces must be url-encoded and the names are case-sensitive, e.g. `"Silver%20plan", "Gold%20plan", "Enterprise%20plan"`.

#### Example Request

```
https://api.chartmogul.com/v1/metrics/arpa?start-date=2009-01-01&end-date=2009-02-05&interval=days&geo=US
```

#### Example cURL Request

```
curl https://api.chartmogul.com/v1/metrics/arpa \
-X GET \
-u 41e70131daaf56b516f32a38c8b8628d:187583e8b9d77eadae8c6a1db83f7875 \
-d interval=week \
-d start-date=2015-01-01 \
-d end-date=2015-11-01
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

 - `geo` (String) - A comma-separated list of [ISO 3166-1 Alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) formatted country codes to filter the results to, e.g. `"US","UK","DE"`.

 - `plans` (String) - A comma-separated list of plan names (as configured in your ChartMogul account) to filter the results to. Note that spaces must be url-encoded and the names are case-sensitive, e.g. `"Silver%20plan", "Gold%20plan", "Enterprise%20plan"`.

#### Example Request

```
https://api.chartmogul.com/v1/metrics/ltv?start-date=2009-01-01&end-date=2009-02-05&interval=days&geo=US
```

Example cURL Request

```
curl https://api.chartmogul.com/v1/metrics/ltv \
-X GET \
-u 41e70131daaf56b516f32a38c8b8628d:187583e8b9d77eadae8c6a1db83f7875 \
-d interval=week \
-d start-date=2015-01-01 \
-d end-date=2015-11-01
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

 - `geo` (String) - A comma-separated list of [ISO 3166-1 Alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) formatted country codes to filter the results to, e.g. `"US","UK","DE"`.

 - `plans` (String) - A comma-separated list of plan names (as configured in your ChartMogul account) to filter the results to. Note that spaces must be url-encoded and the names are case-sensitive, e.g. `"Silver%20plan", "Gold%20plan", "Enterprise%20plan"`.

#### Example Request

```
https://api.chartmogul.com/v1/metrics/customer-count?start-date=2009-01-01&end-date=2009-02-05&interval=days&geo=US
```

#### Example cURL Request

```
curl https://api.chartmogul.com/v1/metrics/customer-count \
-X GET \
-u 41e70131daaf56b516f32a38c8b8628d:187583e8b9d77eadae8c6a1db83f7875 \
-d interval=week \
-d start-date=2015-07-01 \
-d end-date=2015-11-01
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

 - `geo` (String) - A comma-separated list of [ISO 3166-1 Alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) formatted country codes to filter the results to, e.g. `"US","UK","DE"`.

 - `plans` (String) - A comma-separated list of plan names (as configured in your ChartMogul account) to filter the results to. Note that spaces must be url-encoded and the names are case-sensitive, e.g. `"Silver%20plan", "Gold%20plan", "Enterprise%20plan"`.

#### Example Request

```
https://api.chartmogul.com/v1/metrics/mrr-churn-rate?start-date=2009-01-01&end-date=2009-02-05&interval=days&geo=US
```

#### Example cURL Request

```
curl https://api.chartmogul.com/v1/metrics/mrr-churn-rate \
-X GET \
-u 41e70131daaf56b516f32a38c8b8628d:187583e8b9d77eadae8c6a1db83f7875 \
-d interval=week \
-d start-date=2015-10-01 \
-d end-date=2015-11-01
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

 - `geo` (String) - A comma-separated list of [ISO 3166-1 Alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) formatted country codes to filter the results to, e.g. `"US","UK","DE"`.

 - `plans` (String) - A comma-separated list of plan names (as configured in your ChartMogul account) to filter the results to. Note that spaces must be url-encoded and the names are case-sensitive, e.g. `"Silver%20plan", "Gold%20plan", "Enterprise%20plan"`.

#### Example Request

```
https://api.chartmogul.com/v1/metrics/customer-churn-rate?start-date=2009-01-01&end-date=2009-02-05&interval=days&geo=US
```

#### Example cURL Request

```
curl https://api.chartmogul.com/v1/metrics/customer-churn-rate \
-X GET \
-u 41e70131daaf56b516f32a38c8b8628d:187583e8b9d77eadae8c6a1db83f7875 \
-d interval=week \
-d start-date=2015-10-01 \
-d end-date=2015-11-01
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

:warning: ([Issue](https://github.com/chartmogul/metrics-api/issues/5)) - `interval` (String) - either `"day"` (default), `"week"`, `"month"`, `"quarter"`

 - `geo` (String) - A comma-separated list of [ISO 3166-1 Alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) formatted country codes to filter the results to, e.g. `"US","UK","DE"`.

 - `plans` (String) - A comma-separated list of plan names (as configured in your ChartMogul account) to filter the results to. Note that spaces must be url-encoded and the names are case-sensitive, e.g. `"Silver%20plan", "Gold%20plan", "Enterprise%20plan"`.

#### Example Request

```
https://api.chartmogul.com/v1/metrics/asp?start-date=2009-01-01&end-date=2009-02-05&interval=days&geo=US
```

#### Example cURL Request

```
curl https://api.chartmogul.com/v1/metrics/asp \
-X GET \
-u 41e70131daaf56b516f32a38c8b8628d:187583e8b9d77eadae8c6a1db83f7875 \
-d interval=week \
-d start-date=2015-10-01 \
-d end-date=2015-11-01
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

## Requesting Customer Data

### /customers/search

Returns an array of entries containing customer data.

#### Supported Parameters

- `email` (String) (*required*) - The email address of the required customer.

#### Example Request

```
https://api.chartmogul.com/v1/customers/search?email=bob@examplecompany.com
```

#### Example cURL Request

```
curl https://api.chartmogul.com/v1/customers/search?email=bob@examplecompany.com \
-X GET \
-u 41e70131daaf56b516f32a38c8b8628d:187583e8b9d77eadae8c6a1db83f7875
```

#### Example Response

```JSON
{
    "entries":[
        {
            "address": {
  				"address_line1": "First line of address"
  				"address_line2": "Second line of address"
  				"address_zip": "0185128"
  				"city": "Nowhereville"
  				"country": "US"
  				"state": "Alaska"
			}
			"arr": 24000
			"billing-system-type": "Manual"
			"billing-system-url": null
			"chartmogul-url": "http://chartmogul.com/#customers/25647-Example-Company"
			"currency": "USD"
			"currency-sign": "$"
			"customer-since": "2015-06-09T13:16:00-04:00"
			"email": "bob@examplecompany.com"
			"id": 25647
			"mrr": 2000
			"name": "Example Company"
			"status": "Active"
        }
    ]
}
```

### /customers/{id}/activities

Returns an array of entries containing the given customer's recent activities.

#### Supported Parameters

none

#### Example Request

```
https://api.chartmogul.com/v1/customers/{12345}/activities
```


#### Example cURL Request

```
curl https://api.chartmogul.com/v1/customers/7283428/activities \
-X GET \
-u 41e70131daaf56b516f32a38c8b8628d:187583e8b9d77eadae8c6a1db83f7875
```

#### Example Response

```JSON
{
	"entries":[
		{
			"activity-arr": 24000,
			"activity-mrr": 2000,
			"activity-mrr-movement": 2000
			"currency": "USD"
			"currency-sign": "$"
			"date": "2015-06-09T13:16:00-04:00"
			"description": "purchased the Silver Monthly plan (1)"
			"id": 48730
			"type": "new_biz"
		}
	]
}
```

### /customers/{id}/plans

Returns an array of entries containing the given customer's plans.

#### Supported Parameters

none

#### Example Request

```
https://api.chartmogul.com/v1/customers/{12345}/plans
```

#### Example cURL Request

```
curl https://api.chartmogul.com/v1/customers/7283428/plans \
-X GET \
-u 41e70131daaf56b516f32a38c8b8628d:187583e8b9d77eadae8c6a1db83f7875
```

#### Example Response

```JSON
{
	"entries":[
		{
			"arpa": 30718.7199565509
			"arr": 5160744.952700544
			"asp": 2762.66666666667
			"customer-churn-rate": 0
			"customers": 14
			"date": "2015-05-01"
			"ltv": 0
			"mrr": 430062.079391712
			"mrr-churn-rate": 5.5
		}
	]
}
```
