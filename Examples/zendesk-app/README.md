# Zendesk app

> App for Zendesk communicating with the ChartMogul API

## Instructions for running locally

To modify the app locally and see the changes reflected immediately within Zendesk, follow these instructions.

### Prerequisites

- Ruby
- Zendesk App Tools: `gem install zendesk_apps_tools`

### Run locally

1. Clone this repository and cd into it. Then spin up the ZAT server:

    ```bash
    git clone git@github.com:chartmogul/zendesk-app.git
    cd zendesk-app/
    zat server
    ```

    When prompted, provide your `token` & `apiKey`.

2. Log into Zendesk, open up a ticket and append `?zat=true` to the URL:

    ```
    https://subdomain.zendesk.com/agent/tickets/321?zat=true
    ```

Further instructions can be found in the [Zendesk documentation](https://support.zendesk.com/hc/en-us/articles/203691236-Installing-and-using-the-Zendesk-apps-tools).

## CSS

The `app.css` file always needs to be compiled from the `app.scss` file. You can do this from the Terminal, make sure to have SASS installed first:

```bash
gem install sass
```

Then compiling is as simple as running:

```bash
sass app.scss app.css
```

If you don't want to manually compile like an animal, just watch the project folder with SASS:

```bash
sass --watch .:.
```

This will just auto-compile the `app.css` file whenever changes to the `app.scss` file are detected.

**Make sure to always commit the compiled CSS file.**
