# 💰 Personal Finance Manager (MERN)

The **Personal Finance Manager** is a full-stack web application built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js).  
It helps users **track their income and expenses**, manage transactions, and visualize financial data with filters and reports.

---

## 🚀 Features
- 👤 **User Authentication** – Register, login, JWT-protected routes.  
- 📝 **Transaction Management** – Add, edit, delete, and view transactions.  
- 🔄 **Real-Time Updates** – Instantly reflect changes across reports.  
- 📊 **Filtering** – Filter by **date range**, **type** (credit/debit), and **category**.  
- 💵 **Income & Expense Tracking** – Manage salaries, dividends, rent, bills, etc.  
- 📈 **Reports & Analytics** – Switch between **table view** and **chart view**.  
- 🎨 **Responsive UI** – User-friendly interface with modern design.  

---

## 🏗️ Project Structure

```
FINMANAGERAPP/
│── backend/
│   ├── controllers/           # Controllers for business logic
│   ├── DB/                    # Database connection config
│   ├── models/
│   │   ├── TransactionModel.js # Transaction schema
│   │   └── UserSchema.js       # User schema
│   ├── Routers/
│   │   ├── Transactions.js     # Routes for transactions
│   │   └── userRouter.js       # Routes for user auth
│   ├── app.js                  # Express server entry
│   ├── .env                    # Environment variables
│   ├── package.json            # Backend dependencies
│
│── frontend/
│   ├── public/                 # Static files
│   ├── src/                    # React components, pages, hooks
│   ├── index.html              # Entry HTML file
│   ├── vite.config.js          # Vite config
│   ├── package.json            # Frontend dependencies
│
│── .gitignore
│── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/your-username/finmanagerapp.git
cd finmanagerapp
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install
```

Create `.env` in `/backend`:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run backend:
```bash
npm start
```

### 3️⃣ Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

Frontend → `http://localhost:5173`  
Backend → `http://localhost:5000`  

---

## 📌 API Endpoints

### Auth
- `POST /api/auth/register` → Register new user  
- `POST /api/auth/login` → Login & receive JWT  

### Transactions
- `GET /api/transactions` → Fetch all user transactions  
- `POST /api/transactions` → Add new transaction  
- `PUT /api/transactions/:id` → Update a transaction  
- `DELETE /api/transactions/:id` → Delete a transaction  

---

## 📊 Database Schema

### User (`UserSchema.js`)
```js
{
  username: String,
  email: String,
  password: String
}
```

### Transaction (`TransactionModel.js`)
```js
{
  userId: ObjectId,
  title: String,
  amount: Number,
  type: String,       // "credit" or "debit"
  category: String,   // e.g. "Salary", "Food", "Other"
  date: Date
}
```

---

## 📷 Screenshots

### Transactions List
- Date: `2025-02-10`  
- Title: `Salary`  
- Amount: `50000`  
- Type: `credit`  
- Category: `Salary`  

Actions → **Edit ✏️ | Delete 🗑️**  

![Transactions Page](screenshot.png)

---

## 🛠️ Tech Stack
- **Frontend**: React.js (Vite), Axios, TailwindCSS / Ant Design  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB with Mongoose  
- **Authentication**: JWT + bcrypt  
- **Reports/Charts**: Chart.js / Recharts  

---

## 📜 License
Licensed under the **MIT License** – feel free to use and modify.

---

## 👨‍💻 Author
Developed by **[Your Name]** 🚀
