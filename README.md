# 📘 **Incident Management System**

A complete **MERN-stack (Node.js + Express + MongoDB + Vanilla JS)** project for managing incidents.
Built step-by-step from **Day 1 → Day 10** with backend APIs, frontend UI, validation, error handling, testing, and deployment.

---

## 🚀 **Live Demo**

🌐 **Frontend (Netlify):** [https://incident-management-node.netlify.app/](https://incident-management-node.netlify.app/)
🛠 **Backend (Render):** [https://incident-management-node.onrender.com/api/incidents](https://incident-management-node.onrender.com/api/incidents)

---

## 🧠 **Project Overview**

This project allows organizations to manage and track incidents — such as outages, bugs, or system issues from creation to closure.

It includes:

* Backend RESTful APIs with Express + MongoDB
* Frontend built with plain JavaScript, HTML, and CSS
* CRUD operations (Create, Read, Update, Close)
* Full client-side & server-side validation
* Filters, modals, and loading indicators
* Deployment-ready configuration

---

## ✨ **Key Features**

| Feature                      | Description                                            |
| ---------------------------- | ------------------------------------------------------ |
| 🧾 **Incident CRUD**         | Create, Read, Update, and Close incidents              |
| 🧩 **Validation**            | Server-side (Mongoose + middleware) + Client-side (JS) |
| 🔎 **Filter**                | Filter incidents by status (Open / Closed / All)       |
| 💬 **Inline Error Messages** | Beautiful form validation and alerts                   |
| 💾 **MongoDB Integration**   | Persistent database using Mongoose                     |
| 🧰 **REST API**              | Express-based backend                                  |
| 🧪 **Testing**               | API + Model testing using Jest + Supertest             |
| ⚙️ **Deployment Ready**      | Backend on Render, Frontend on Netlify                 |
| 🧭 **Responsive Design**     | Fully responsive for mobile & desktop                  |
| 🔐 **.env Configuration**    | Secure environment variables                           |

---

## 🧱 **Tech Stack**

### 🖥️ **Frontend**

* HTML5
* CSS3 (modern responsive design)
* Vanilla JavaScript (Fetch API, DOM manipulation)

### ⚙️ **Backend**

* Node.js
* Express.js
* Mongoose (MongoDB ODM)
* CORS, dotenv, body-parser


### ☁️ **Deployment**

* Render (Backend)
* Netlify (Frontend)
* MongoDB Atlas (Database)

---

## 📁 **Project Structure**

```
incident-management-system/
│
├── package.json
├── .env
├── .gitignore
│
├── server/
│   ├── server.js
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   └── incidentController.js
│   ├── middleware/
│   │   └── validateIncident.js
│   ├── models/
│   │   └── Incident.js
│   ├── routes/
│   │   └── incidentRoutes.js
│   └── test/
│       └── incidentTest.js
│
└── client/
    └── public/
        ├── index.html
        ├── style.css
        └── script.js
```

---

## ⚡ **Setup Instructions (Local Development)**

### 1️⃣ Clone Repository

```bash
git clone https://github.com/sahuljr7/incident_management_node.git
cd incident_management_node
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Create `.env` File

Create a `.env` file in the root directory:

```
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/incidentsdb
```

### 4️⃣ Start the Server

```bash
npm run dev
```

> The server will start on [http://localhost:3000](http://localhost:3000)

---

## 🧾 **API Endpoints**

| Method    | Endpoint                   | Description           |
| --------- | -------------------------- | --------------------- |
| **POST**  | `/api/incidents`           | Create a new incident |
| **GET**   | `/api/incidents`           | Get all incidents     |
| **GET**   | `/api/incidents/:id`       | Get an incident by ID |
| **PUT**   | `/api/incidents/:id`       | Update an incident    |
| **PATCH** | `/api/incidents/:id/close` | Close an incident     |

---

## 💻 **Frontend Usage**

* Hosted inside `/client/public/`
* Contains:

  * `index.html` – UI layout
  * `style.css` – modern responsive styling
  * `script.js` – API integration, validation, UI logic

Run locally by opening `client/public/index.html` in a browser.

---

## 🌍 **Deployment**

### 🛠 Backend Deployment — Render

1. Push code to GitHub
2. Create a new **Web Service** in Render
3. Add environment variables:

   ```
   PORT=10000
   MONGO_URI=your-mongodb-atlas-uri
   ```
4. Build Command:

   ```
   npm install
   ```
5. Start Command:

   ```
   npm start
   ```
6. Deploy → Note the live URL, e.g.
   `https://incident-management-node.onrender.com`

---

### 💅 Frontend Deployment — Netlify

1. Go to [Netlify](https://app.netlify.com/)
2. Click **“Add new site” → “Deploy manually”**
3. Upload `/client/public` folder
4. In `script.js`, ensure:

```js
const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000/api/incidents"
    : "https://incident-management-node.onrender.com/api/incidents";
```

5. Deploy site → done 🎉

---

## ⚙️ **Environment Variables**

| Variable    | Description                              |
| ----------- | ---------------------------------------- |
| `PORT`      | Port number for Express                  |
| `MONGO_URI` | MongoDB Atlas or local connection string |

---

## 🧠 **Learnings & Highlights**

* Structuring a Node.js project (config, routes, controllers)
* Implementing REST APIs with Mongoose models
* Building dynamic UI with pure JavaScript
* Handling form validation client + server-side
* Managing environment variables securely
* Writing meaningful API tests
* Deploying full-stack applications (Render + Netlify)

---

## 🔥 **Project Summary**

✅ Fully functional backend with Express + MongoDB
✅ Responsive frontend UI built from scratch
✅ Real-time API integration
✅ Full error & validation handling
✅ Production deployed app (Netlify + Render)
✅ Tested and documented thoroughly

