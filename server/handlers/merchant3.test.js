const httpMocks = require("node-mocks-http");
const {remove} = require("./merchants");
const mockHapusMerchant = jest.fn();
jest.mock("../../storage", () => {
    return {
        models: {
            merchant: {
                destroy: () => mockHapusMerchant()
            },
        },
    };
});

//4. Unit testing 4
test("remove menghapus merchant", async () => {
    const request = httpMocks.createRequest({
        method: "DELETE",
        url: "/api/merchants/4",
        params: {
            id: 4,
        },
        status: "success",
    });
    const response = httpMocks.createResponse();
    mockHapusMerchant.mockResolvedValue({
        id: "1",
    });

    await remove(request, response);

    expect(response.statusCode).toEqual(200);
});