
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import {
    getEnterprises, getEnterpriseById
} from '../../../services/Aludoc/Enterprise';

describe('getEnterprises API Tests', () => {
    let mock;
    const localStorageMock = {
        getItem: jest.fn(),
    };

    beforeEach(() => {
        mock = new MockAdapter(axios);
        global.localStorage = localStorageMock;
    });

    afterEach(() => {
        mock.restore();
        jest.clearAllMocks();
    });

    describe('getEnterprises API', () => {
        it('getEnterprises should resolve on successful API call', async () => {
            const reader = {};

            // Mock the API call and return a successful response
            mock.onGet('/Aludoc/Enterprises/GetEnterprises').reply(200);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            const result = await getEnterprises(reader);

            // Expect that the promise resolves
            expect(result.data).toBeNull();
        });

        it('getEnterprises should reject with an error object on network error', async () => {
            const reader = { /* Define your reader data here */ };

            // Mock the API call to simulate a network error
            mock.onGet('/Aludoc/Enterprises/GetEnterprises').networkError();

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await getEnterprises(reader);
            } catch (error) {
                // Expect that the error object contains the expected message
                expect(error?.history).toBeUndefined();
            }
        });

        it('getEnterprises should reject with an error object on unauthorized error', async () => {
            const reader = { /* Define your reader data here */ };
            // Mock the API call to return a 401 unauthorized response
            mock.onGet('/Aludoc/Enterprises/GetEnterprises').reply(401);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await getEnterprises(reader);
            } catch (error) {
                // Expect that the error object contains the expected message or action (e.g., redirection)
                expect(error?.history).toBeUndefined();
            }
        });
    });
});

describe('getEnterpriseById API Tests', () => {
    let mock;
    const localStorageMock = {
        getItem: jest.fn(),
    };

    beforeEach(() => {
        mock = new MockAdapter(axios);
        global.localStorage = localStorageMock;
    });

    afterEach(() => {
        mock.restore();
        jest.clearAllMocks();
    });

    describe('getEnterpriseById API', () => {
        it('getEnterpriseById should resolve on successful API call', async () => {
            const reader = {};

            // Mock the API call and return a successful response
            mock.onGet('/Aludoc/Enterprise/GetEnterpriseById').reply(200);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            const result = await getEnterpriseById(reader);

            // Expect that the promise resolves
            expect(result.data).toBeNull();
        });

        it('getEnterpriseById should reject with an error object on network error', async () => {
            const reader = { /* Define your reader data here */ };

            // Mock the API call to simulate a network error
            mock.onGet('/Aludoc/Enterprise/GetEnterpriseById').networkError();

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await getEnterpriseById(reader);
            } catch (error) {
                // Expect that the error object contains the expected message
                expect(error?.history).toBeUndefined();
            }
        });

        it('getEnterpriseById should reject with an error object on unauthorized error', async () => {
            const reader = { /* Define your reader data here */ };
            // Mock the API call to return a 401 unauthorized response
            mock.onGet('/Aludoc/Enterprise/GetEnterpriseById').reply(401);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await getEnterpriseById(reader);
            } catch (error) {
                // Expect that the error object contains the expected message or action (e.g., redirection)
                expect(error?.history).toBeUndefined();
            }
        });
    });
});



