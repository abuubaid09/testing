const httpMocks = require("node-mocks-http");
const {getById} = require("./products");

const mockCariSatuProduct = jest.fn();
jest.mock("../../storage", () => {
    return {
        models: {
            product: {
                findOne: () => mockCariSatuProduct()
            },
        },
    };
});

//  5. Unit Testing Lima

test("getById Mengembalikan satu produk", async () => {
    const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/merchants/1/products/2",
        params: {
            id: 1,
            merchantId: 2,
        },
    });
    const response = httpMocks.createResponse();
    mockCariSatuProduct.mockResolvedValue({
        id: "1",
        merchantId: "2",
    });

    await getById(request, response);

    expect(response.statusCode).toEqual(200);
    expect(response._getJSONData()).toEqual({
        id: "1",
        merchantId: "2",
    });

});

// 6. Unit Testing Enam
test("getById mengembalikan 404 jika tidak ada id-nya", async () => {
    const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/merchants/1/products/2",
        params: {
            id: 1,
            merchantId: 2,
        },
    });
    const response = httpMocks.createResponse();
    mockCariSatuProduct.mockResolvedValue(null);

    await getById(request, response);

    expect(response.statusCode).toEqual(404);
    expect(response._getData()).toEqual("404 - Not found");
});
//========================================================

