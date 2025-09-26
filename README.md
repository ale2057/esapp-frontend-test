# EsappFrontendTest

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.1.5.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash

git  clone  https://github.com/ale2057/esapp-frontend-test.git

cd  your-repo

```

### 2. Install dependencies

```bash

npm  install

```

### 3. Run the Angular application

```bash

npm  run  start

```

By default, the app runs at:\

👉 http://localhost:4200

---

### 4. Run the JSON server

In a separate terminal:

```bash

json-server  --watch  public/db.json

```

By default, the fake API runs at:\

👉 http://localhost:3000

---

## 📦 Packages Used

Mock REST API to simulate backend endpoints.

- **[json-server](https://github.com/typicode/json-server)** --- `^1.0.0-beta.3`

Internationalization (i18n) support.

- **[@ngx-translate/core](https://github.com/ngx-translate/core)** --- `^17.0.0`

Loads translation files over HTTP.

- **[@ngx-translate/http-loader](https://github.com/ngx-translate/core)**--- `^17.0.0`

CSS framework for responsive design.

- **[bootstrap](https://getbootstrap.com/)** --- `^5.3.8`

Icon set for Bootstrap projects.

- **[bootstrap-icons](https://icons.getbootstrap.com/)** --- `^1.13.1`

Charting library for visualizations.

- **[chart.js](https://www.chartjs.org/)** --- `^4.3.0`

Angular wrapper for Chart.js.

- **[ng2-charts](https://valor-software.com/ng2-charts/)** --- `^8.0.0`

---

## 📖 Notes

- Make sure to have **Node.js** (\>=18) and **npm** installed.\

- For real-time WebSocket trades, configure your **Finnhub API key** inside the `WebSocketService`.\

- By default, `json-server` watches `public/db.json`. You can customize endpoints as needed.

- The **i18n configuration** has been set up to **automatically detect the browser language** and adjust the project interface language accordingly.
