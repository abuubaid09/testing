const httpMocks = require("node-mocks-http");
const {remove} = require("./products");

const mockHapusProduct = jest.fn();
jest.mock("../../storage", () => {
    return {
        models: {
            product: {
                destroy: () => mockHapusProduct()
            },
        },
    };
});

//8. Unit Testing Delapan
test("remove menghapus product", async () => {
    const request = httpMocks.createRequest({
        method: "DELETE",
        url: "/api/merchants/4/products/4",
        params: {
            id: 4,
            merchantId: 4,
        },
        status: "success",
    });
    const response = httpMocks.createResponse();
    mockHapusProduct.mockResolvedValue({
        id: "1",
        merchantId: "4",
    });

    await remove(request, response);

    expect(response.statusCode).toEqual(200);
});

