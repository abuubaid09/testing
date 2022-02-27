const httpMocks = require("node-mocks-http");
const {getAll} = require("./products");

const mockCariSemuaProduct = jest.fn();
jest.mock("../../storage", () => {
    return {
        models: {
            product: {
                findAll: () => mockCariSemuaProduct()
            },
        },
    };
});

//  7. Unit Testing Tujuh

test("getAll Mengembalikan semua produk", async () => {
    const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/merchants/3/products",
        params: {
            merchantId: 3,
        },
    });
    const response = httpMocks.createResponse();
    mockCariSemuaProduct.mockResolvedValue({
        merchantId: "3",
    });

    await getAll(request, response);

    expect(response.statusCode).toEqual(200);
    expect(response._getJSONData()).toEqual({
        merchantId: "3",
    });

});



// // 2. Unit Testing Kedua
// test("getAll mengembalikan 404 jika tidak ada id-nya", async () => {
//     const request = httpMocks.createRequest({
//         method: "GET",
//         url: "/api/merchants/1/products",
//         params: {
//             merchantId: 2,
//         },
//     });
//     const response = httpMocks.createResponse();
//     mockCariSemuaProduct.mockResolvedValue(null);

//     await getAll(request, response);

//     expect(response.statusCode).toEqual(404);
//     expect(response._getData()).toEqual("404 - Not found");
// });
//========================================================

