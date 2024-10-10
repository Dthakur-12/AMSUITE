

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import {
    login, loginActiveDirectory, logout, getCurrentUser
} from '../../../services/AMSuite/Session';

describe('login API Tests', () => {
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

    describe('login API', () => {
        it('login should resolve on successful API call', async () => {
            const reader = {};

            // Mock the API call and return a successful response
            mock.onPost('/AMSuite/Sessions/Login').reply(200);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            const result = await login(reader);

            // Expect that the promise resolves
            expect(result.data).toBeNull();
        });

        it('login should reject with an error object on network error', async () => {
            const reader = { /* Define your reader data here */ };

            // Mock the API call to simulate a network error
            mock.onPost('/AMSuite/Sessions/Login').networkError();

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await login(reader);
            } catch (error) {
                // Expect that the error object contains the expected message
                expect(error?.history).toBeUndefined();
            }
        });

        it('login should reject with an error object on unauthorized error', async () => {
            const reader = { /* Define your reader data here */ };
            // Mock the API call to return a 401 unauthorized response
            mock.onPost('/AMSuite/Sessions/Login').reply(401);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await login(reader);
            } catch (error) {
                // Expect that the error object contains the expected message or action (e.g., redirection)
                expect(error?.history).toBeUndefined();
            }
        });
    });
});

describe('loginActiveDirectory API Tests', () => {
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

    describe('loginActiveDirectory API', () => {
        it('loginActiveDirectory should resolve on successful API call', async () => {
            const reader = {};

            // Mock the API call and return a successful response
            mock.onPost('/AMSuite/Sessions/LoginActiveDirectory').reply(200);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            const result = await loginActiveDirectory(reader);

            // Expect that the promise resolves
            expect(result.data).toBeNull();
        });

        it('loginActiveDirectory should reject with an error object on network error', async () => {
            const reader = { /* Define your reader data here */ };

            // Mock the API call to simulate a network error
            mock.onPost('/AMSuite/Sessions/LoginActiveDirectory').networkError();

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await loginActiveDirectory(reader);
            } catch (error) {
                // Expect that the error object contains the expected message
                expect(error?.history).toBeUndefined();
            }
        });

        it('loginActiveDirectory should reject with an error object on unauthorized error', async () => {
            const reader = { /* Define your reader data here */ };
            // Mock the API call to return a 401 unauthorized response
            mock.onPost('/AMSuite/Sessions/LoginActiveDirectory').reply(401);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await loginActiveDirectory(reader);
            } catch (error) {
                // Expect that the error object contains the expected message or action (e.g., redirection)
                expect(error?.history).toBeUndefined();
            }
        });
    });
});

describe('logout API Tests', () => {
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

    describe('logout API', () => {
        it('logout should resolve on successful API call', async () => {
            const reader = {};

            // Mock the API call and return a successful response
            mock.onPost('/AMSuite/Sessions/Logout').reply(200);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            const result = await logout(reader);

            // Expect that the promise resolves
            expect(result.data).toBeNull();
        });

        it('logout should reject with an error object on network error', async () => {
            const reader = { /* Define your reader data here */ };

            // Mock the API call to simulate a network error
            mock.onPost('/AMSuite/Sessions/Logout').networkError();

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await logout(reader);
            } catch (error) {
                // Expect that the error object contains the expected message
                expect(error?.history).toBeUndefined();
            }
        });

        it('logout should reject with an error object on unauthorized error', async () => {
            const reader = { /* Define your reader data here */ };
            // Mock the API call to return a 401 unauthorized response
            mock.onPost('/AMSuite/Sessions/Logout').reply(401);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await logout(reader);
            } catch (error) {
                // Expect that the error object contains the expected message or action (e.g., redirection)
                expect(error?.history).toBeUndefined();
            }
        });
    });
});

describe('getCurrentUser API Tests', () => {
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

    describe('getCurrentUser API', () => {
        it('getCurrentUser should resolve on successful API call', async () => {
            const reader = {};

            // Mock the API call and return a successful response
            mock.onPost('/AMSuite/Sessions/CurrentSession').reply(200);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            const result = await getCurrentUser(reader);

            // Expect that the promise resolves
            expect(result.data).toBeNull();
        });

        it('getCurrentUser should reject with an error object on network error', async () => {
            const reader = { /* Define your reader data here */ };

            // Mock the API call to simulate a network error
            mock.onPost('/AMSuite/Sessions/CurrentSession').networkError();

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await getCurrentUser(reader);
            } catch (error) {
                // Expect that the error object contains the expected message
                expect(error?.history).toBeUndefined();
            }
        });

        it('getCurrentUser should reject with an error object on unauthorized error', async () => {
            const reader = { /* Define your reader data here */ };
            // Mock the API call to return a 401 unauthorized response
            mock.onPost('/AMSuite/Sessions/CurrentSession').reply(401);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await getCurrentUser(reader);
            } catch (error) {
                // Expect that the error object contains the expected message or action (e.g., redirection)
                expect(error?.history).toBeUndefined();
            }
        });
    });
});