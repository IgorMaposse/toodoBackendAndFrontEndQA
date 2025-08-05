
---

## 📄 TEST_PLAN.md

```markdown
# Test Plan: React + Node.js App

## 1. Objective

To validate the functionality of a small full-stack application by automating both frontend (UI) and backend (API) tests.

---

## 2. Scope of Testing

### UI Functional Automation (React App)

- Login with valid credentials
- Login with invalid credentials
- Create a new todo item
- Edit an existing todo item
- Delete a todo item
- Verify UI reflects changes after actions

### API Automation (Node.js Backend)

- POST /login: Valid and invalid credentials
- GET : Fetch list of todos
- POST: Create new todo
- PUT :id: Edit existing todo
- DELETE:id: Remove todo
- Negative tests: Invalid payloads, unauthorized access, etc.

---

## 3. Tools and Justification

| Tool       | Purpose            | Reason                                       |
|------------|--------------------|----------------------------------------------|
| Cypress    | UI Testing         | Easy syntax, good for React apps             |
| Supertest  | API Testing        | Works directly with Express apps             |
| Jest       | Test runner/assertions | Popular and well-supported in Node       |

---

## 4. Test Coverage

| Area           | Type         | Covered |
|----------------|--------------|---------|
| Login          | UI + API     | ✅      |
| CRUD Items     | UI + API     | ✅      |
| Edge Cases     | API          | ✅      |
| Data Assertions| UI + API     | ✅      |

---

## 5. How to Run Tests

Refer to the `README.md` for instructions on:

- Starting the backend and frontend
- Running Cypress UI tests
- Running Supertest API tests

---
