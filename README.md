# 🧠 MemoraAI

An AI-powered personal memory assistant that lets users upload documents, search through them, and ask questions using Google's Gemini AI.

MemoraAI extracts text from uploaded PDFs, stores it securely, retrieves relevant information using keyword-based search, and generates intelligent answers and summaries.

---

## 🚀 Features

- 🔐 JWT Authentication (Signup/Login)
- 📄 Upload PDF documents
- 📚 Automatic text extraction using Apache PDFBox
- ✂️ Intelligent text chunking
- 🔎 Keyword-based document retrieval
- 🤖 AI-powered Question Answering using Gemini API
- 📝 AI-generated document summaries
- 🗑️ Delete uploaded documents
- 👤 User-specific document storage
- 🎨 Modern React frontend

---

## 🛠 Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- JavaScript

### Backend

- Java
- Spring Boot
- Spring Security
- Spring Data JPA
- JWT Authentication

### Database

- MySQL

### AI

- Google Gemini API

### Libraries

- Apache PDFBox

---

## 📂 Project Structure

```
MemoraAI
│
├── frontend
│   ├── React
│   ├── Components
│   └── Pages
│
├── backend
│   ├── Controllers
│   ├── Services
│   ├── Repositories
│   ├── Models
│   └── Security
│
└── Database (MySQL)
```

---

## ⚙️ How It Works

1. User signs up or logs in.
2. A PDF is uploaded.
3. Apache PDFBox extracts the document text.
4. The extracted text is divided into smaller chunks.
5. Chunks are stored in MySQL.
6. When a question is asked:
   - Relevant chunks are retrieved using keyword search.
   - The selected context is sent to the Gemini API.
7. Gemini generates an answer or summary based on the retrieved document content.

---

## 📸 Screenshots

### Login

(Add Screenshot)

### Dashboard

(Add Screenshot)

### Upload

(Add Screenshot)

### AI Chat

(Add Screenshot)

---

## 🧠 Future Improvements

- Semantic Search using Embeddings
- Vector Database Integration
- Support for DOCX and TXT files
- Chat History
- Multi-document comparison
- OCR support for scanned PDFs

---

## 🔧 Installation

### Clone the repository

```bash
git clone https://github.com/Anam-imtiyaz/memoraAI.git
```

### Backend

```bash
cd backend
```

Configure your `application.properties`

```properties
spring.datasource.url=YOUR_DATABASE_URL
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD

gemini.api.key=YOUR_GEMINI_API_KEY
```

Run

```bash
mvn spring-boot:run
```

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 📌 API Endpoints

### Authentication

```
POST /api/auth/signup
POST /api/auth/login
```

### Documents

```
POST /hello
GET /memories
DELETE /memories/{fileName}
```

### AI

```
POST /ask
```

---

## 👩‍💻 Author

**Anam Imtiyaz**

- GitHub: https://github.com/Anam-imtiyaz
- LinkedIn: https://www.linkedin.com/in/anam-imtiyaz-418110375/

---

## ⭐ If you like this project

Give it a ⭐ on GitHub!