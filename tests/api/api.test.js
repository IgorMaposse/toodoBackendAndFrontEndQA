const request = require("supertest");
const app = require("../../backend/server");

let token;

describe("API Tests", () => {
  it("Valid login", async () => {
    const res = await request(app)
      .post("/login")
      .send({ username: "admin", password: "12345" });
    expect(res.statusCode).toBe(200);
    token = res.body.token;
  });

  it("Invalid login", async () => {
    const res = await request(app)
      .post("/login")
      .send({ username: "admin", password: "wrong" });
    expect(res.statusCode).toBe(401);
  });

  it("POST /items - Create item", async () => {
    const res = await request(app)
      .post("/items")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Test API Item" });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Test API Item");
  });

  it("GET /items - Get all items", async () => {
    const res = await request(app)
      .get("/items")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("PUT /items/:id - Update item", async () => {
    const res = await request(app)
      .put("/items/1")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Updated" });
    expect(res.statusCode).toBe(200);
  });

  it("DELETE /items/:id - Delete item", async () => {
    const res = await request(app)
      .delete("/items/1")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
});
