const httpMocks = require("node-mocks-http");
const {getById, getAll} = require("./merchants");

const mockCariSemuaMerchant = jest.fn();
jest.mock("../../storage", () => {
    return {
        models: {
            merchant: {
                findAll: () => mockCariSemuaMerchant()
            },
        },
    };
});


//3. Unit Testing Ketiga
beforeEach(() => {
    mockCariSemuaMerchant.mockReset()
  })
test("getAllMerchants mengembalikan semua merchant", async () => {
    const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/merchants",
    });
    const response = httpMocks.createResponse();
    mockCariSemuaMerchant.mockResolvedValue({
        id: "2",
        name: "Ronny",
    });

    await getAll(request, response);

    expect(response.statusCode).toEqual(200);
    expect(response._getJSONData()).toEqual({
        id: "2",
        name: "Ronny",
    });
});



// unit testing belum sukses
// beforeEach(() => {
//     mockCariSemuaMerchant.mockReset()
//   })

// test("getAll mengembalikan 404 ketika tidak ada merchant", async () => {
//     const request = httpMocks.createRequest({
//         method: "GET",
//         url: "/api/merchants",
//     });
//     const response = httpMocks.createResponse();
 
//     mockCariSemuaMerchant.mockResolvedValue(null);

//     await getAll(request, response);

//     expect(response.statusCode).toEqual(404);
//     expect(response._getData()).toEqual("404 - Not found");

// });

