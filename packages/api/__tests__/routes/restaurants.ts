import request from "supertest";
import expressApp from "../../src";

import { prismaMock } from "../../src/singleton";

const URL = "http://localhost:3001";

describe("Restaurants API", () => {
  it("GET /restaurants --> array restaurants", async () => {
    return request(URL)
      .get("/restaurants")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toBeTruthy();
        expect(response.body).toEqual(
          expect.objectContaining({
            results: expect.arrayContaining([
              expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String),
                createdAt: expect.any(String),
              }),
            ]),
          })
        );
      });
  });

  it("GET /restaurants/:id --> Correct restaurant for that ID", async () => {
    return request(URL)
      .get("/restaurants/1")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toBeTruthy();
        expect(response.body).toEqual(
          expect.objectContaining({
            results: expect.objectContaining({
              id: expect.any(Number),
              name: expect.any(String),
              createdAt: expect.any(String),
            }),
          })
        );
      });
  });
});
