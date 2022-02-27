const httpMocks = require("node-mocks-http");
const {getById} = require("./merchants");

const mockCariSatuMerchant = jest.fn();
jest.mock("../../storage", () => {
    return {
        models: {
            merchant: {
                findOne: () => mockCariSatuMerchant()
            },
        },
    };
});

//  1. Unit Testing Pertama

test("getByIdMengembalikan satu merchant", async () => {
    const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/merchants/1",
        params: {
            id: 1,
        },
    });
    const response = httpMocks.createResponse();
    mockCariSatuMerchant.mockResolvedValue({
        id: "1",
        name: "Ricky",
    });

    await getById(request, response);

    expect(response.statusCode).toEqual(200);
    expect(response._getJSONData()).toEqual({
        id: "1",
        name: "Ricky",
    });

});

// 2. Unit Testing Kedua
test("getById mengembalikan 404 jika tidak ada id-nya", async () => {
    const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/merchants/2",
        params: {
            id: 1,
        },
    });
    const response = httpMocks.createResponse();
    mockCariSatuMerchant.mockResolvedValue(null);

    await getById(request, response);

    expect(response.statusCode).toEqual(404);
    expect(response._getData()).toEqual("404 - Not found");
});

//========================================================
