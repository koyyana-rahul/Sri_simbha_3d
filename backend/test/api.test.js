const test = require("node:test");
const assert = require("node:assert");
const http = require("node:http");
const app = require("../src/app");

let server;
let baseUrl;

test.before((t, done) => {
  server = http.createServer(app);
  server.listen(0, () => {
    const port = server.address().port;
    baseUrl = `http://127.0.0.1:${port}`;
    done();
  });
});

test.after((t, done) => {
  server.close(done);
});

async function makeRequest(path, options = {}) {
  const url = `${baseUrl}${path}`;
  const response = await fetch(url, options);
  const data = await response.json();
  return { status: response.status, data };
}

test("GET /api/health returns 200 and status ok", async () => {
  const { status, data } = await makeRequest("/api/health");
  assert.strictEqual(status, 200);
  assert.strictEqual(data.status, "ok");
  assert.strictEqual(typeof data.uptime, "number");
  assert.ok(data.timestamp);
});

test("POST /api/contact succeeds with valid enquiry payload", async () => {
  const payload = {
    name: "Suresh Kumar",
    email: "suresh@example.com",
    phone: "+91 9876543210",
    company: "Suresh Enterprises",
    service: "LED Display Advertising",
    message: "We need digital billboards for 3 months in Gajuwaka.",
  };

  const { status, data } = await makeRequest("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  assert.strictEqual(status, 201);
  assert.strictEqual(data.success, true);
  assert.strictEqual(data.data.name, "Suresh Kumar");
  assert.strictEqual(data.data.service, "LED Display Advertising");
});

test("POST /api/contact rejects invalid email format with 400", async () => {
  const payload = {
    name: "Suresh Kumar",
    email: "invalid-email-address",
    phone: "+91 9876543210",
    service: "LED Display Advertising",
  };

  const { status, data } = await makeRequest("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  assert.strictEqual(status, 400);
  assert.strictEqual(data.success, false);
  assert.match(data.error, /email/i);
});

test("POST /api/contact rejects invalid phone format with 400", async () => {
  const payload = {
    name: "Suresh Kumar",
    email: "suresh@example.com",
    phone: "123", // too short
    service: "LED Display Advertising",
  };

  const { status, data } = await makeRequest("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  assert.strictEqual(status, 400);
  assert.strictEqual(data.success, false);
  assert.match(data.error, /phone/i);
});

test("POST /api/contact rejects missing name with 400", async () => {
  const payload = {
    name: "",
    email: "suresh@example.com",
    phone: "+91 9876543210",
    service: "LED Display Advertising",
  };

  const { status, data } = await makeRequest("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  assert.strictEqual(status, 400);
  assert.strictEqual(data.success, false);
  assert.match(data.error, /name/i);
});

test("POST /api/contact neutralizes spam honeypot cleanly", async () => {
  const payload = {
    name: "Bot User",
    email: "bot@example.com",
    phone: "+91 9876543210",
    service: "LED Display Advertising",
    honeypot: "i am a spam bot",
  };

  const { status, data } = await makeRequest("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  assert.strictEqual(status, 200);
  assert.strictEqual(data.success, true);
});
