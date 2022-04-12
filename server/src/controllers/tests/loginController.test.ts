import { server } from "../../utils/testUtils";

describe("Login Controller Test", () => {
  let accessToken: string;

  it("Should be login and get accessToken", async () => {
    const res: any = await server.post("/api/v1/login").send({
      username: "mehdi",
      password: "admin",
    });
    accessToken = res.body.accessToken;
    expect(res.statusCode).toEqual(200);
  });

  it("Should be return 401", async () => {
    const res: any = await server.post("/api/v1/login").send({
      username: "mohammed",
      password: "admin",
    });
    accessToken = res.body.accessToken;
    expect(res.statusCode).toEqual(401);
  });
});
