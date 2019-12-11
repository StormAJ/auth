const config = require("config");
const request = require("supertest");
let server;
let token;

const urlPrefix = "/api";

describe("controllers", function() {
  beforeAll(async () => {
    server = require("../../app");
  });

  afterAll(async () => {
    // SQL: "DROP TABLE ${table}"
    await server.close();
  });

  describe("users", () => {
    describe("POST /users", () => {
      it("should create a user", async () => {
        const res = await request(server)
          .post(urlPrefix + "/users")
          .set("x-api-key", config.get("APIKey"))
          .send({ name: "string", email: "1@string.de" });
        expect(res.status).toBe(200);
      });

      it("should return 403, if user exists", async () => {
        const res = await request(server)
          .post(urlPrefix + "/users")
          .set("x-api-key", config.get("APIKey"))
          .send({ name: "string", email: "1@string.de" });
        expect(res.status).toBe(403);
      });
    });

    describe("GET /users", () => {
      it("should return users", async () => {
        const res = await request(server)
          .get(urlPrefix + "/users")
          .set("x-api-key", config.get("APIKey"));
        expect(res.status).toBe(200);
      });
    });

    describe("POST /login", () => {
      it("should return token", async () => {
        const res = await request(server)
          .post(urlPrefix + "/login")
          .send({ email: "1@string.de", password: "string" });
        expect(res.status).toBe(200);
        token = res.text;
      });
    });

    describe("GET /auth", () => {
      it("should return decoded token", async () => {
        const res = await request(server)
          .get(urlPrefix + "/auth")
          //.set("Accept", "application/json")
          .set("x-token", token);
        expect(res.status).toBe(200);
        expect(res.body.email).toBe("1@string.de");
      });
    });

    describe("PATCH /users", () => {
      it("should return 200 after having changed PW", async () => {
        const res = await request(server)
          .patch(urlPrefix + "/users")
          .set("x-token", token)
          .send({ password: "newPW" });
        expect(res.status).toBe(200);
      });
    });

    describe("DELETE /email", () => {
      it("should send 403, if no api-key", async () => {
        const res = await request(server).delete(
          urlPrefix + "/users/" + "1@string.de"
        );
        expect(res.status).toBe(403);
      });

      it("should delete user", async () => {
        const res = await request(server)
          .delete(urlPrefix + "/users/" + "1@string.de")
          .set("x-api-key", config.get("APIKey"));
        expect(res.status).toBe(200);
      });
    });
  });
});
