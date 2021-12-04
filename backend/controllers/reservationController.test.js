const { availableTables, bookTables } = require("./reservationController");

test("availableTables() on new day returns tables", () => {
  const request = {
    body: { date: new Date(2100, 11, 15) },
  };

  const response = {
    body: "",
    send: function (res_body) {
      this.body = res_body;
    },
  };

  availableTables(request, response);
  expect(JSON.parse(response.body)["tables"].length).toBeGreaterThanOrEqual(1);
});

test("bookTables() on new day returns 200", () => {
  const availableTablesRequest = {
    body: { date: new Date(2100, 11, 16) },
  };

  const availableTablesResponse = {
    body: "",
    send: function (res_body) {
      this.body = res_body;
    },
  };

  availableTables(availableTablesRequest, availableTablesResponse);

  const request = {
    body: {
      date: new Date(2100, 11, 16),
      table: availableTablesResponse["tables"][0]["_id"],
    },
  };

  const response = {
    body: "",
    send: function (res_body) {
      this.body = res_body;
    },
  };

  bookTables(request, response);
  expect(response.body).toBe("Added Reservation");
});
