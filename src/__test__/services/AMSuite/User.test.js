
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import {
    GetRegistersVisualizations, Create, GetUsers, GetUsersAux, UpdateMyUser, Edit, Delete, GetUser, GetClientPermissions,
    CheckCredentials, GetActiveDirectoryGroups, GetActiveDirectoryGroupByName, GetAMSuiteGroups, CreateADGroups,
    CreateAMSuiteGroup, GroupDetails, DeleteGroups, GetAllUserActivities, CreateSAMLGroups
} from '../../../services/AMSuite/User';

describe('GetRegistersVisualizations API Tests', () => {
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

    describe('GetRegistersVisualizations API', () => {
        it('GetRegistersVisualizations should resolve on successful API call', async () => {
            const reader = {};

            // Mock the API call and return a successful response
            mock.onGet('/AMSuite/Users/RegistersVisualizations').reply(200);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            const result = await GetRegistersVisualizations(reader);

            // Expect that the promise resolves
            expect(result.data).toBeNull();
        });

        it('GetRegistersVisualizations should reject with an error object on network error', async () => {
            const reader = { /* Define your reader data here */ };

            // Mock the API call to simulate a network error
            mock.onGet('/AMSuite/Users/RegistersVisualizations').networkError();

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await GetRegistersVisualizations(reader);
            } catch (error) {
                // Expect that the error object contains the expected message
                expect(error?.history).toBeUndefined();
            }
        });

        it('GetRegistersVisualizations should reject with an error object on unauthorized error', async () => {
            const reader = { /* Define your reader data here */ };
            // Mock the API call to return a 401 unauthorized response
            mock.onGet('/AMSuite/Users/RegistersVisualizations').reply(401);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await GetRegistersVisualizations(reader);
            } catch (error) {
                // Expect that the error object contains the expected message or action (e.g., redirection)
                expect(error?.history).toBeUndefined();
            }
        });
    });
});


describe('Create API Tests', () => {
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

    describe('Create API', () => {
        it('Create should resolve on successful API call', async () => {
            const reader = {};

            // Mock the API call and return a successful response
            mock.onPost('/AMSuite/Users/Create').reply(200);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            const result = await Create(reader);

            // Expect that the promise resolves
            expect(result.data).toBeNull();
        });

        it('Create should reject with an error object on network error', async () => {
            const reader = { /* Define your reader data here */ };

            // Mock the API call to simulate a network error
            mock.onPost('/AMSuite/Users/Create').networkError();

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await Create(reader);
            } catch (error) {
                // Expect that the error object contains the expected message
                expect(error?.history).toBeUndefined();
            }
        });

        it('Create should reject with an error object on unauthorized error', async () => {
            const reader = { /* Define your reader data here */ };
            // Mock the API call to return a 401 unauthorized response
            mock.onPost('/AMSuite/Users/Create').reply(401);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await Create(reader);
            } catch (error) {
                // Expect that the error object contains the expected message or action (e.g., redirection)
                expect(error?.history).toBeUndefined();
            }
        });
    });
});

describe('GetUsers API Tests', () => {
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

    describe('GetUsers API', () => {
        it('GetUsers should resolve on successful API call', async () => {
            const reader = {};

            // Mock the API call and return a successful response
            mock.onPost('/AMSuite/Users/Get').reply(200);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            const result = await GetUsers(reader);

            // Expect that the promise resolves
            expect(result.data).toBeNull();
        });

        it('GetUsers should reject with an error object on network error', async () => {
            const reader = { /* Define your reader data here */ };

            // Mock the API call to simulate a network error
            mock.onPost('/AMSuite/Users/Get').networkError();

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await GetUsers(reader);
            } catch (error) {
                // Expect that the error object contains the expected message
                expect(error?.history).toBeUndefined();
            }
        });

        it('GetUsers should reject with an error object on unauthorized error', async () => {
            const reader = { /* Define your reader data here */ };
            // Mock the API call to return a 401 unauthorized response
            mock.onPost('/AMSuite/Users/Get').reply(401);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await GetUsers(reader);
            } catch (error) {
                // Expect that the error object contains the expected message or action (e.g., redirection)
                expect(error?.history).toBeUndefined();
            }
        });
    });
});

describe('GetUsersAux API Tests', () => {
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

    describe('GetUsersAux API', () => {
        it('GetUsersAux should resolve on successful API call', async () => {
            const reader = {};

            // Mock the API call and return a successful response
            mock.onPost('/AMSuite/Users/Get').reply(200);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            const result = await GetUsersAux(reader);

            // Expect that the promise resolves
            expect(result.data).toBeNull();
        });

        it('GetUsersAux should reject with an error object on network error', async () => {
            const reader = { /* Define your reader data here */ };

            // Mock the API call to simulate a network error
            mock.onPost('/AMSuite/Users/Get').networkError();

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await GetUsersAux(reader);
            } catch (error) {
                // Expect that the error object contains the expected message
                expect(error?.history).toBeUndefined();
            }
        });

        it('GetUsersAux should reject with an error object on unauthorized error', async () => {
            const reader = { /* Define your reader data here */ };
            // Mock the API call to return a 401 unauthorized response
            mock.onPost('/AMSuite/Users/Get').reply(401);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await GetUsersAux(reader);
            } catch (error) {
                // Expect that the error object contains the expected message or action (e.g., redirection)
                expect(error?.history).toBeUndefined();
            }
        });
    });
});

describe('UpdateMyUser API Tests', () => {
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

    describe('UpdateMyUser API', () => {
        it('UpdateMyUser should resolve on successful API call', async () => {
            const reader = {};

            // Mock the API call and return a successful response
            mock.onPost('/AMSuite/Users/UpdateMyUser').reply(200);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            const result = await UpdateMyUser(reader);

            // Expect that the promise resolves
            expect(result.data).toBeNull();
        });

        it('UpdateMyUser should reject with an error object on network error', async () => {
            const reader = { /* Define your reader data here */ };

            // Mock the API call to simulate a network error
            mock.onPost('/AMSuite/Users/UpdateMyUser').networkError();

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await UpdateMyUser(reader);
            } catch (error) {
                // Expect that the error object contains the expected message
                expect(error?.history).toBeUndefined();
            }
        });

        it('UpdateMyUser should reject with an error object on unauthorized error', async () => {
            const reader = { /* Define your reader data here */ };
            // Mock the API call to return a 401 unauthorized response
            mock.onPost('/AMSuite/Users/UpdateMyUser').reply(401);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await UpdateMyUser(reader);
            } catch (error) {
                // Expect that the error object contains the expected message or action (e.g., redirection)
                expect(error?.history).toBeUndefined();
            }
        });
    });
});

describe('Edit API Tests', () => {
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

    describe('Edit API', () => {
        it('Edit should resolve on successful API call', async () => {
            const reader = {};

            // Mock the API call and return a successful response
            mock.onPut('/AMSuite/Users/Update').reply(200);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            const result = await Edit(reader);

            // Expect that the promise resolves
            expect(result.data).toBeNull();
        });

        it('Edit should reject with an error object on network error', async () => {
            const reader = { /* Define your reader data here */ };

            // Mock the API call to simulate a network error
            mock.onPut('/AMSuite/Users/Update').networkError();

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await Edit(reader);
            } catch (error) {
                // Expect that the error object contains the expected message
                expect(error?.history).toBeUndefined();
            }
        });

        it('Edit should reject with an error object on unauthorized error', async () => {
            const reader = { /* Define your reader data here */ };
            // Mock the API call to return a 401 unauthorized response
            mock.onPut('/AMSuite/Users/Update').reply(401);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await Edit(reader);
            } catch (error) {
                // Expect that the error object contains the expected message or action (e.g., redirection)
                expect(error?.history).toBeUndefined();
            }
        });
    });
});

describe('Delete API Tests', () => {
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

    describe('Delete API', () => {
        it('Delete should resolve on successful API call', async () => {
            const reader = {};

            // Mock the API call and return a successful response
            mock.onDelete('/AMSuite/Users/Delete').reply(200);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            const result = await Delete(reader);

            // Expect that the promise resolves
            expect(result.data).toBeNull();
        });

        it('Delete should reject with an error object on network error', async () => {
            const reader = { /* Define your reader data here */ };

            // Mock the API call to simulate a network error
            mock.onDelete('/AMSuite/Users/Delete').networkError();

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await Delete(reader);
            } catch (error) {
                // Expect that the error object contains the expected message
                expect(error?.history).toBeUndefined();
            }
        });

        it('Delete should reject with an error object on unauthorized error', async () => {
            const reader = { /* Define your reader data here */ };
            // Mock the API call to return a 401 unauthorized response
            mock.onDelete('/AMSuite/Users/Delete').reply(401);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await Delete(reader);
            } catch (error) {
                // Expect that the error object contains the expected message or action (e.g., redirection)
                expect(error?.history).toBeUndefined();
            }
        });
    });
});

describe('GetUser API Tests', () => {
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

    describe('GetUser API', () => {
        it('GetUser should resolve on successful API call', async () => {
            const reader = {};

            // Mock the API call and return a successful response
            mock.onGet('/AMSuite/Users/Details').reply(200);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            const result = await GetUser(reader);

            // Expect that the promise resolves
            expect(result.data).toBeNull();
        });

        it('GetUser should reject with an error object on network error', async () => {
            const reader = { /* Define your reader data here */ };

            // Mock the API call to simulate a network error
            mock.onGet('/AMSuite/Users/Details').networkError();

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await GetUser(reader);
            } catch (error) {
                // Expect that the error object contains the expected message
                expect(error?.history).toBeUndefined();
            }
        });

        it('GetUser should reject with an error object on unauthorized error', async () => {
            const reader = { /* Define your reader data here */ };
            // Mock the API call to return a 401 unauthorized response
            mock.onGet('/AMSuite/Users/Details').reply(401);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await GetUser(reader);
            } catch (error) {
                // Expect that the error object contains the expected message or action (e.g., redirection)
                expect(error?.history).toBeUndefined();
            }
        });
    });
});

describe('GetClientPermissions API Tests', () => {
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

    describe('GetClientPermissions API', () => {
        it('GetClientPermissions should resolve on successful API call', async () => {
            const reader = {};

            // Mock the API call and return a successful response
            mock.onGet('/AMSuite/Users/Permissions').reply(200);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            const result = await GetClientPermissions(reader);

            // Expect that the promise resolves
            expect(result.data).toBeNull();
        });

        it('GetClientPermissions should reject with an error object on network error', async () => {
            const reader = { /* Define your reader data here */ };

            // Mock the API call to simulate a network error
            mock.onGet('/AMSuite/Users/Permissions').networkError();

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await GetUser(reader);
            } catch (error) {
                // Expect that the error object contains the expected message
                expect(error?.history).toBeUndefined();
            }
        });

        it('GetClientPermissions should reject with an error object on unauthorized error', async () => {
            const reader = { /* Define your reader data here */ };
            // Mock the API call to return a 401 unauthorized response
            mock.onGet('/AMSuite/Users/Permissions').reply(401);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await GetClientPermissions(reader);
            } catch (error) {
                // Expect that the error object contains the expected message or action (e.g., redirection)
                expect(error?.history).toBeUndefined();
            }
        });
    });
});

describe('CheckCredentials API Tests', () => {
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

    describe('CheckCredentials API', () => {
        it('CheckCredentials should resolve on successful API call', async () => {
            const reader = {};

            // Mock the API call and return a successful response
            mock.onPost('/AMSuite/Users/TestActiveDirectoryUserCredentials').reply(200);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            const result = await CheckCredentials(reader);

            // Expect that the promise resolves
            expect(result.data).toBeNull();
        });

        it('CheckCredentials should reject with an error object on network error', async () => {
            const reader = { /* Define your reader data here */ };

            // Mock the API call to simulate a network error
            mock.onPost('/AMSuite/Users/TestActiveDirectoryUserCredentials').networkError();

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await CheckCredentials(reader);
            } catch (error) {
                // Expect that the error object contains the expected message
                expect(error?.history).toBeUndefined();
            }
        });

        it('CheckCredentials should reject with an error object on unauthorized error', async () => {
            const reader = { /* Define your reader data here */ };
            // Mock the API call to return a 401 unauthorized response
            mock.onPost('/AMSuite/Users/TestActiveDirectoryUserCredentials').reply(401);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await CheckCredentials(reader);
            } catch (error) {
                // Expect that the error object contains the expected message or action (e.g., redirection)
                expect(error?.history).toBeUndefined();
            }
        });
    });
});

describe('GetActiveDirectoryGroups API Tests', () => {
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

    describe('GetActiveDirectoryGroups API', () => {
        it('GetActiveDirectoryGroups should resolve on successful API call', async () => {
            const reader = {};

            // Mock the API call and return a successful response
            mock.onPost('/AMSuite/Users/GetActiveDirectoryGroups').reply(200);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            const result = await GetActiveDirectoryGroups(reader);

            // Expect that the promise resolves
            expect(result.data).toBeNull();
        });

        it('GetActiveDirectoryGroups should reject with an error object on network error', async () => {
            const reader = { /* Define your reader data here */ };

            // Mock the API call to simulate a network error
            mock.onPost('/AMSuite/Users/GetActiveDirectoryGroups').networkError();

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await GetActiveDirectoryGroups(reader);
            } catch (error) {
                // Expect that the error object contains the expected message
                expect(error?.history).toBeUndefined();
            }
        });

        it('GetActiveDirectoryGroups should reject with an error object on unauthorized error', async () => {
            const reader = { /* Define your reader data here */ };
            // Mock the API call to return a 401 unauthorized response
            mock.onPost('/AMSuite/Users/GetActiveDirectoryGroups').reply(401);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await GetActiveDirectoryGroups(reader);
            } catch (error) {
                // Expect that the error object contains the expected message or action (e.g., redirection)
                expect(error?.history).toBeUndefined();
            }
        });
    });
});


describe('GetActiveDirectoryGroupByName API Tests', () => {
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

    describe('GetActiveDirectoryGroupByName API', () => {
        it('GetActiveDirectoryGroupByName should resolve on successful API call', async () => {
            const reader = {};

            // Mock the API call and return a successful response
            mock.onGet('/AMSuite/Users/GetActiveDirectoryGroupByName').reply(200);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            const result = await GetActiveDirectoryGroupByName(reader);

            // Expect that the promise resolves
            expect(result.data).toBeNull();
        });

        it('GetActiveDirectoryGroupByName should reject with an error object on network error', async () => {
            const reader = { /* Define your reader data here */ };

            // Mock the API call to simulate a network error
            mock.onGet('/AMSuite/Users/GetActiveDirectoryGroupByName').networkError();

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await GetActiveDirectoryGroupByName(reader);
            } catch (error) {
                // Expect that the error object contains the expected message
                expect(error?.history).toBeUndefined();
            }
        });

        it('GetActiveDirectoryGroupByName should reject with an error object on unauthorized error', async () => {
            const reader = { /* Define your reader data here */ };
            // Mock the API call to return a 401 unauthorized response
            mock.onGet('/AMSuite/Users/GetActiveDirectoryGroupByName').reply(401);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await GetActiveDirectoryGroupByName(reader);
            } catch (error) {
                // Expect that the error object contains the expected message or action (e.g., redirection)
                expect(error?.history).toBeUndefined();
            }
        });
    });
});

describe('GetAMSuiteGroups API Tests', () => {
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

    describe('GetAMSuiteGroups API', () => {
        it('GetAMSuiteGroups should resolve on successful API call', async () => {
            const reader = {};

            // Mock the API call and return a successful response
            mock.onPost('/AMSuite/Users/GetGroups').reply(200);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            const result = await GetAMSuiteGroups(reader);

            // Expect that the promise resolves
            expect(result.data).toBeNull();
        });

        it('GetAMSuiteGroups should reject with an error object on network error', async () => {
            const reader = { /* Define your reader data here */ };

            // Mock the API call to simulate a network error
            mock.onPost('/AMSuite/Users/GetGroups').networkError();

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await GetAMSuiteGroups(reader);
            } catch (error) {
                // Expect that the error object contains the expected message
                expect(error?.history).toBeUndefined();
            }
        });

        it('GetAMSuiteGroups should reject with an error object on unauthorized error', async () => {
            const reader = { /* Define your reader data here */ };
            // Mock the API call to return a 401 unauthorized response
            mock.onPost('/AMSuite/Users/GetGroups').reply(401);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await GetAMSuiteGroups(reader);
            } catch (error) {
                // Expect that the error object contains the expected message or action (e.g., redirection)
                expect(error?.history).toBeUndefined();
            }
        });
    });
});

describe('CreateADGroups API Tests', () => {
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

    describe('CreateADGroups API', () => {
        it('CreateADGroups should resolve on successful API call', async () => {
            const reader = {};

            // Mock the API call and return a successful response
            mock.onPost('/AMSuite/Users/CreateSeveralActiveDirectoryUserGroups').reply(200);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            const result = await CreateADGroups(reader);

            // Expect that the promise resolves
            expect(result.data).toBeNull();
        });

        it('CreateADGroups should reject with an error object on network error', async () => {
            const reader = { /* Define your reader data here */ };

            // Mock the API call to simulate a network error
            mock.onPost('/AMSuite/Users/CreateSeveralActiveDirectoryUserGroups').networkError();

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await CreateADGroups(reader);
            } catch (error) {
                // Expect that the error object contains the expected message
                expect(error?.history).toBeUndefined();
            }
        });

        it('CreateADGroups should reject with an error object on unauthorized error', async () => {
            const reader = { /* Define your reader data here */ };
            // Mock the API call to return a 401 unauthorized response
            mock.onPost('/AMSuite/Users/CreateSeveralActiveDirectoryUserGroups').reply(401);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await CreateADGroups(reader);
            } catch (error) {
                // Expect that the error object contains the expected message or action (e.g., redirection)
                expect(error?.history).toBeUndefined();
            }
        });
    });
});

describe('CreateAMSuiteGroup API Tests', () => {
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

    describe('CreateAMSuiteGroup API', () => {
        it('CreateAMSuiteGroup should resolve on successful API call', async () => {
            const reader = {};

            // Mock the API call and return a successful response
            mock.onPost('/AMSuite/Users/CreateOrUpdateUserGroup').reply(200);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            const result = await CreateAMSuiteGroup(reader);

            // Expect that the promise resolves
            expect(result.data).toBeNull();
        });

        it('CreateAMSuiteGroup should reject with an error object on network error', async () => {
            const reader = { /* Define your reader data here */ };

            // Mock the API call to simulate a network error
            mock.onPost('/AMSuite/Users/CreateOrUpdateUserGroup').networkError();

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await CreateAMSuiteGroup(reader);
            } catch (error) {
                // Expect that the error object contains the expected message
                expect(error?.history).toBeUndefined();
            }
        });

        it('CreateAMSuiteGroup should reject with an error object on unauthorized error', async () => {
            const reader = { /* Define your reader data here */ };
            // Mock the API call to return a 401 unauthorized response
            mock.onPost('/AMSuite/Users/CreateOrUpdateUserGroup').reply(401);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await CreateAMSuiteGroup(reader);
            } catch (error) {
                // Expect that the error object contains the expected message or action (e.g., redirection)
                expect(error?.history).toBeUndefined();
            }
        });
    });
});

describe('GroupDetails API Tests', () => {
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

    describe('GroupDetails API', () => {
        it('GroupDetails should resolve on successful API call', async () => {
            const reader = {};

            // Mock the API call and return a successful response
            mock.onGet('/AMSuite/Users/GroupDetails').reply(200);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            const result = await GroupDetails(reader);

            // Expect that the promise resolves
            expect(result.data).toBeNull();
        });

        it('GroupDetails should reject with an error object on network error', async () => {
            const reader = { /* Define your reader data here */ };

            // Mock the API call to simulate a network error
            mock.onGet('/AMSuite/Users/GroupDetails').networkError();

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await GroupDetails(reader);
            } catch (error) {
                // Expect that the error object contains the expected message
                expect(error?.history).toBeUndefined();
            }
        });

        it('GroupDetails should reject with an error object on unauthorized error', async () => {
            const reader = { /* Define your reader data here */ };
            // Mock the API call to return a 401 unauthorized response
            mock.onGet('/AMSuite/Users/GroupDetails').reply(401);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await GroupDetails(reader);
            } catch (error) {
                // Expect that the error object contains the expected message or action (e.g., redirection)
                expect(error?.history).toBeUndefined();
            }
        });
    });
});

describe('DeleteGroups API Tests', () => {
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

    describe('DeleteGroups API', () => {
        it('DeleteGroups should resolve on successful API call', async () => {
            const reader = {};

            // Mock the API call and return a successful response
            mock.onPost('/AMSuite/Users/DeleteGroups').reply(200);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            const result = await DeleteGroups(reader);

            // Expect that the promise resolves
            expect(result.data).toBeNull();
        });

        it('DeleteGroups should reject with an error object on network error', async () => {
            const reader = { /* Define your reader data here */ };

            // Mock the API call to simulate a network error
            mock.onPost('/AMSuite/Users/DeleteGroups').networkError();

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await DeleteGroups(reader);
            } catch (error) {
                // Expect that the error object contains the expected message
                expect(error?.history).toBeUndefined();
            }
        });

        it('DeleteGroups should reject with an error object on unauthorized error', async () => {
            const reader = { /* Define your reader data here */ };
            // Mock the API call to return a 401 unauthorized response
            mock.onPost('/AMSuite/Users/DeleteGroupss').reply(401);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await DeleteGroups(reader);
            } catch (error) {
                // Expect that the error object contains the expected message or action (e.g., redirection)
                expect(error?.history).toBeUndefined();
            }
        });
    });
});

describe('GetAllUserActivities API Tests', () => {
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

    describe('GetAllUserActivities API', () => {
        it('GetAllUserActivities should resolve on successful API call', async () => {
            const reader = {};

            // Mock the API call and return a successful response
            mock.onPost('/AMSuite/Users/GetAllUserActivities').reply(200);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            const result = await GetAllUserActivities(reader);

            // Expect that the promise resolves
            expect(result.data).toBeNull();
        });

        it('GetAllUserActivities should reject with an error object on network error', async () => {
            const reader = { /* Define your reader data here */ };

            // Mock the API call to simulate a network error
            mock.onPost('/AMSuite/Users/GetAllUserActivities').networkError();

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await GetAllUserActivities(reader);
            } catch (error) {
                // Expect that the error object contains the expected message
                expect(error?.history).toBeUndefined();
            }
        });

        it('GetAllUserActivities should reject with an error object on unauthorized error', async () => {
            const reader = { /* Define your reader data here */ };
            // Mock the API call to return a 401 unauthorized response
            mock.onPost('/AMSuite/Users/GetAllUserActivities').reply(401);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await GetAllUserActivities(reader);
            } catch (error) {
                // Expect that the error object contains the expected message or action (e.g., redirection)
                expect(error?.history).toBeUndefined();
            }
        });
    });
});

describe('CreateSAMLGroups API Tests', () => {
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

    describe('CreateSAMLGroups API', () => {
        it('CreateSAMLGroups should resolve on successful API call', async () => {
            const reader = {};

            // Mock the API call and return a successful response
            mock.onPost('/AMSuite/Users/CreateSAML').reply(200);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            const result = await CreateSAMLGroups(reader);

            // Expect that the promise resolves
            expect(result.data).toBeNull();
        });

        it('CreateSAMLGroups should reject with an error object on network error', async () => {
            const reader = { /* Define your reader data here */ };

            // Mock the API call to simulate a network error
            mock.onPost('/AMSuite/Users/CreateSAML').networkError();

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await CreateSAMLGroups(reader);
            } catch (error) {
                // Expect that the error object contains the expected message
                expect(error?.history).toBeUndefined();
            }
        });

        it('CreateSAMLGroups should reject with an error object on unauthorized error', async () => {
            const reader = { /* Define your reader data here */ };
            // Mock the API call to return a 401 unauthorized response
            mock.onPost('/AMSuite/Users/CreateSAML').reply(401);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await CreateSAMLGroups(reader);
            } catch (error) {
                // Expect that the error object contains the expected message or action (e.g., redirection)
                expect(error?.history).toBeUndefined();
            }
        });
    });
});








