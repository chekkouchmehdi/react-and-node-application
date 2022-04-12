import { server } from "../../utils/testUtils";

describe("Document Controller Test", () => {
  let accessToken: string;

  it("Should be login and get accessToken", async () => {
    const res: any = await server.post("/api/v1/login").send({
      username: "mehdi",
      password: "admin",
    });
    accessToken = res.body.accessToken;
    expect(res.statusCode).toEqual(200);
  });

  it("Should add Document", async () => {
    const res = await server
      .post("/api/v1/doc")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        content: "test 1",
        id: "doc-1",
      });
    expect(res.statusCode).toEqual(201);
  });

  it("Should Get Document", async () => {
    const res = await server
      .get("/api/v1/doc")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(res.statusCode).toEqual(200);
  });
});
