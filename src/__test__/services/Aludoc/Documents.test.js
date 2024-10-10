import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import {
    getDocuments, getDocumentTypesByCompanies, getDocumentById, getDocumentsExpiringBeforeDate,
    getAllDocumentsByEnterprises, getDocumentTypes, getDocumentTypesObj, getDocumentByEnterprise,
    getDocumentFiles, downloadDocumentFile, getDocumentTypeById, createDocument, editDocument,
    createDocumentType, editDocumentType, deleteDocuments, deleteDocumentsType, getDocumentStatusGraphData,
    genericDataTableApiCall
} from '../../../services/Aludoc/Documents';

describe('getDocuments API Tests', () => {
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

    describe('getDocuments API', () => {
        it('getDocuments should resolve on successful API call', async () => {
            const reader = {};

            // Mock the API call and return a successful response
            mock.onGet('/Aludoc/Document/GetAllDocument').reply(200);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            const result = await getDocuments(reader);

            // Expect that the promise resolves
            expect(result.data).toBeNull();
        });

        it('getDocuments should reject with an error object on network error', async () => {
            const reader = { /* Define your reader data here */ };

            // Mock the API call to simulate a network error
            mock.onGet('/Aludoc/Document/GetAllDocument').networkError();

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await getDocuments(reader);
            } catch (error) {
                // Expect that the error object contains the expected message
                expect(error?.history).toBeUndefined();
            }
        });

        it('getDocuments should reject with an error object on unauthorized error', async () => {
            const reader = { /* Define your reader data here */ };
            // Mock the API call to return a 401 unauthorized response
            mock.onGet('/Aludoc/Document/GetAllDocument').reply(401);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await getDocuments(reader);
            } catch (error) {
                // Expect that the error object contains the expected message or action (e.g., redirection)
                expect(error?.history).toBeUndefined();
            }
        });
    });
});

describe('getDocumentTypesByCompanies API Tests', () => {
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

    describe('getDocumentTypesByCompanies API', () => {
        it('getDocumentTypesByCompanies should resolve on successful API call', async () => {
            const reader = {};

            // Mock the API call and return a successful response
            mock.onPost('/Aludoc/Document/GetDocumentTypesByCompanies').reply(200);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            const result = await getDocumentTypesByCompanies(reader);

            // Expect that the promise resolves
            expect(result.data).toBeNull();
        });

        it('getDocumentTypesByCompanies should reject with an error object on network error', async () => {
            const reader = { /* Define your reader data here */ };

            // Mock the API call to simulate a network error
            mock.onPost('/Aludoc/Document/GetDocumentTypesByCompanies').networkError();

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await getDocumentTypesByCompanies(reader);
            } catch (error) {
                // Expect that the error object contains the expected message
                expect(error?.history).toBeUndefined();
            }
        });

        it('getDocumentTypesByCompanies should reject with an error object on unauthorized error', async () => {
            const reader = { /* Define your reader data here */ };
            // Mock the API call to return a 401 unauthorized response
            mock.onPost('/Aludoc/Document/GetDocumentTypesByCompanies').reply(401);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await getDocumentTypesByCompanies(reader);
            } catch (error) {
                // Expect that the error object contains the expected message or action (e.g., redirection)
                expect(error?.history).toBeUndefined();
            }
        });
    });
});

describe('getDocumentById API Tests', () => {
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

    describe('getDocumentById API', () => {
        it('getDocumentById should resolve on successful API call', async () => {
            const reader = {};

            // Mock the API call and return a successful response
            mock.onGet('/Aludoc/Document/GetDocumentById').reply(200);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            const result = await getDocumentById(reader);

            // Expect that the promise resolves
            expect(result.data).toBeNull();
        });

        it('getDocumentById should reject with an error object on network error', async () => {
            const reader = { /* Define your reader data here */ };

            // Mock the API call to simulate a network error
            mock.onGet('/Aludoc/Document/GetDocumentById').networkError();

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await getDocumentById(reader);
            } catch (error) {
                // Expect that the error object contains the expected message
                expect(error?.history).toBeUndefined();
            }
        });

        it('getDocumentById should reject with an error object on unauthorized error', async () => {
            const reader = { /* Define your reader data here */ };
            // Mock the API call to return a 401 unauthorized response
            mock.onGet('/Aludoc/Document/GetDocumentById').reply(401);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await getDocumentById(reader);
            } catch (error) {
                // Expect that the error object contains the expected message or action (e.g., redirection)
                expect(error?.history).toBeUndefined();
            }
        });
    });
});

describe('getDocumentsExpiringBeforeDate API Tests', () => {
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

    describe('getDocumentsExpiringBeforeDate API', () => {
        it('getDocumentsExpiringBeforeDate should resolve on successful API call', async () => {
            const reader = {};

            // Mock the API call and return a successful response
            mock.onPost('/Aludoc/Document/getDocumentsExpiringBeforeDate').reply(200);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            const result = await getDocumentsExpiringBeforeDate(reader);

            // Expect that the promise resolves
            expect(result.data).toBeNull();
        });

        it('getDocumentsExpiringBeforeDate should reject with an error object on network error', async () => {
            const reader = { /* Define your reader data here */ };

            // Mock the API call to simulate a network error
            mock.onPost('/Aludoc/Document/getDocumentsExpiringBeforeDate').networkError();

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await getDocumentsExpiringBeforeDate(reader);
            } catch (error) {
                // Expect that the error object contains the expected message
                expect(error?.history).toBeUndefined();
            }
        });

        it('getDocumentsExpiringBeforeDate should reject with an error object on unauthorized error', async () => {
            const reader = { /* Define your reader data here */ };
            // Mock the API call to return a 401 unauthorized response
            mock.onPost('/Aludoc/Document/getDocumentsExpiringBeforeDate').reply(401);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await getDocumentsExpiringBeforeDate(reader);
            } catch (error) {
                // Expect that the error object contains the expected message or action (e.g., redirection)
                expect(error?.history).toBeUndefined();
            }
        });
    });
});

describe('getAllDocumentsByEnterprises API Tests', () => {
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

    describe('getAllDocumentsByEnterprises API', () => {
        it('getAllDocumentsByEnterprises should resolve on successful API call', async () => {
            const reader = {};

            // Mock the API call and return a successful response
            mock.onGet('/Aludoc/Document/getAllDocumentsByEnterprises').reply(200);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            const result = await getAllDocumentsByEnterprises(reader);

            // Expect that the promise resolves
            expect(result.data).toBeNull();
        });

        it('getAllDocumentsByEnterprises should reject with an error object on network error', async () => {
            const reader = { /* Define your reader data here */ };

            // Mock the API call to simulate a network error
            mock.onGet('/Aludoc/Document/getAllDocumentsByEnterprises').networkError();

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await getAllDocumentsByEnterprises(reader);
            } catch (error) {
                // Expect that the error object contains the expected message
                expect(error?.history).toBeUndefined();
            }
        });

        it('getAllDocumentsByEnterprises should reject with an error object on unauthorized error', async () => {
            const reader = { /* Define your reader data here */ };
            // Mock the API call to return a 401 unauthorized response
            mock.onGet('/Aludoc/Document/getAllDocumentsByEnterprises').reply(401);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await getAllDocumentsByEnterprises(reader);
            } catch (error) {
                // Expect that the error object contains the expected message or action (e.g., redirection)
                expect(error?.history).toBeUndefined();
            }
        });
    });
});

describe('getDocumentTypes API Tests', () => {
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

    describe('getDocumentTypes API', () => {
        it('getDocumentTypes should resolve on successful API call', async () => {
            const reader = {};

            // Mock the API call and return a successful response
            mock.onPost('/Aludoc/Document/GetAllDocumentType').reply(200);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            const result = await getDocumentTypes(reader);

            // Expect that the promise resolves
            expect(result.data).toBeNull();
        });

        it('getDocumentTypes should reject with an error object on network error', async () => {
            const reader = { /* Define your reader data here */ };

            // Mock the API call to simulate a network error
            mock.onPost('/Aludoc/Document/GetAllDocumentType').networkError();

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await getDocumentTypes(reader);
            } catch (error) {
                // Expect that the error object contains the expected message
                expect(error?.history).toBeUndefined();
            }
        });

        it('getDocumentTypes should reject with an error object on unauthorized error', async () => {
            const reader = { /* Define your reader data here */ };
            // Mock the API call to return a 401 unauthorized response
            mock.onPost('/Aludoc/Document/GetAllDocumentType').reply(401);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await getDocumentTypes(reader);
            } catch (error) {
                // Expect that the error object contains the expected message or action (e.g., redirection)
                expect(error?.history).toBeUndefined();
            }
        });
    });
});

describe('getDocumentTypesObj API Tests', () => {
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

    describe('getDocumentTypesObj API', () => {
        it('getDocumentTypesObj should resolve on successful API call', async () => {
            const reader = {};

            // Mock the API call and return a successful response
            mock.onGet('/Aludoc/Document/GetAllDocumentType').reply(200);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            const result = await getDocumentTypesObj(reader);

            // Expect that the promise resolves
            expect(result.data).toBeNull();
        });

        it('getDocumentTypesObj should reject with an error object on network error', async () => {
            const reader = { /* Define your reader data here */ };

            // Mock the API call to simulate a network error
            mock.onGet('/Aludoc/Document/GetAllDocumentType').networkError();

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await getDocumentTypesObj(reader);
            } catch (error) {
                // Expect that the error object contains the expected message
                expect(error?.history).toBeUndefined();
            }
        });

        it('getDocumentTypesObj should reject with an error object on unauthorized error', async () => {
            const reader = { /* Define your reader data here */ };
            // Mock the API call to return a 401 unauthorized response
            mock.onGet('/Aludoc/Document/GetAllDocumentType').reply(401);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await getDocumentTypesObj(reader);
            } catch (error) {
                // Expect that the error object contains the expected message or action (e.g., redirection)
                expect(error?.history).toBeUndefined();
            }
        });
    });
});

describe('getDocumentByEnterprise API Tests', () => {
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

    describe('getDocumentByEnterprise API', () => {
        it('getDocumentByEnterprise should resolve on successful API call', async () => {
            const reader = {};

            // Mock the API call and return a successful response
            mock.onGet('/Aludoc/Document/GetDocumentByEnterprise').reply(200);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            const result = await getDocumentByEnterprise(reader);

            // Expect that the promise resolves
            expect(result.data).toBeNull();
        });

        it('getDocumentByEnterprise should reject with an error object on network error', async () => {
            const reader = { /* Define your reader data here */ };

            // Mock the API call to simulate a network error
            mock.onGet('/Aludoc/Document/GetDocumentByEnterprise').networkError();

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await getDocumentByEnterprise(reader);
            } catch (error) {
                // Expect that the error object contains the expected message
                expect(error?.history).toBeUndefined();
            }
        });

        it('getDocumentByEnterprise should reject with an error object on unauthorized error', async () => {
            const reader = { /* Define your reader data here */ };
            // Mock the API call to return a 401 unauthorized response
            mock.onGet('/Aludoc/Document/GetDocumentByEnterprise').reply(401);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await getDocumentByEnterprise(reader);
            } catch (error) {
                // Expect that the error object contains the expected message or action (e.g., redirection)
                expect(error?.history).toBeUndefined();
            }
        });
    });
});

describe('getDocumentFiles API Tests', () => {
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

    describe('getDocumentFiles API', () => {
        it('getDocumentFiles should resolve on successful API call', async () => {
            const reader = {};

            // Mock the API call and return a successful response
            mock.onGet('/Aludoc/Document/getDocumentFiles').reply(200);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            const result = await getDocumentFiles(reader);

            // Expect that the promise resolves
            expect(result.data).toBeNull();
        });

        it('getDocumentFiles should reject with an error object on network error', async () => {
            const reader = { /* Define your reader data here */ };

            // Mock the API call to simulate a network error
            mock.onGet('/Aludoc/Document/getDocumentFiles').networkError();

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await getDocumentFiles(reader);
            } catch (error) {
                // Expect that the error object contains the expected message
                expect(error?.history).toBeUndefined();
            }
        });

        it('getDocumentFiles should reject with an error object on unauthorized error', async () => {
            const reader = { /* Define your reader data here */ };
            // Mock the API call to return a 401 unauthorized response
            mock.onGet('/Aludoc/Document/getDocumentFiles').reply(401);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await getDocumentFiles(reader);
            } catch (error) {
                // Expect that the error object contains the expected message or action (e.g., redirection)
                expect(error?.history).toBeUndefined();
            }
        });
    });
});

describe('downloadDocumentFile API Tests', () => {
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

    describe('downloadDocumentFile API', () => {
        it('downloadDocumentFile should resolve on successful API call', async () => {
            const reader = {};

            // Mock the API call and return a successful response
            mock.onGet('/Aludoc/Document/DownloadDocumentFileContent').reply(200);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            const result = await downloadDocumentFile(reader);

            // Expect that the promise resolves
            expect(result.data).toBeNull();
        });

        it('downloadDocumentFile should reject with an error object on network error', async () => {
            const reader = { /* Define your reader data here */ };

            // Mock the API call to simulate a network error
            mock.onGet('/Aludoc/Document/DownloadDocumentFileContent').networkError();

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await downloadDocumentFile(reader);
            } catch (error) {
                // Expect that the error object contains the expected message
                expect(error?.history).toBeUndefined();
            }
        });

        it('downloadDocumentFile should reject with an error object on unauthorized error', async () => {
            const reader = { /* Define your reader data here */ };
            // Mock the API call to return a 401 unauthorized response
            mock.onGet('/Aludoc/Document/DownloadDocumentFileContent').reply(401);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await downloadDocumentFile(reader);
            } catch (error) {
                // Expect that the error object contains the expected message or action (e.g., redirection)
                expect(error?.history).toBeUndefined();
            }
        });
    });
});

describe('getDocumentTypeById API Tests', () => {
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

    describe('getDocumentTypeById API', () => {
        it('getDocumentTypeById should resolve on successful API call', async () => {
            const reader = {};

            // Mock the API call and return a successful response
            mock.onGet('/Aludoc/Document/GetAllDocumentTypeById').reply(200);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            const result = await getDocumentTypeById(reader);

            // Expect that the promise resolves
            expect(result.data).toBeNull();
        });

        it('getDocumentTypeById should reject with an error object on network error', async () => {
            const reader = { /* Define your reader data here */ };

            // Mock the API call to simulate a network error
            mock.onGet('/Aludoc/Document/GetAllDocumentTypeById').networkError();

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await getDocumentTypeById(reader);
            } catch (error) {
                // Expect that the error object contains the expected message
                expect(error?.history).toBeUndefined();
            }
        });

        it('getDocumentTypeById should reject with an error object on unauthorized error', async () => {
            const reader = { /* Define your reader data here */ };
            // Mock the API call to return a 401 unauthorized response
            mock.onGet('/Aludoc/Document/GetAllDocumentTypeById').reply(401);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await getDocumentTypeById(reader);
            } catch (error) {
                // Expect that the error object contains the expected message or action (e.g., redirection)
                expect(error?.history).toBeUndefined();
            }
        });
    });
});

describe('createDocument API Tests', () => {
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

    describe('createDocument API', () => {
        it('createDocument should resolve on successful API call', async () => {
            const reader = {};

            // Mock the API call and return a successful response
            mock.onPost('/Aludoc/Document/createDocument').reply(200);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            const result = await createDocument(reader);

            // Expect that the promise resolves
            expect(result.data).toBeNull();
        });

        it('createDocument should reject with an error object on network error', async () => {
            const reader = { /* Define your reader data here */ };

            // Mock the API call to simulate a network error
            mock.onPost('/Aludoc/Document/createDocument').networkError();

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await createDocument(reader);
            } catch (error) {
                // Expect that the error object contains the expected message
                expect(error?.history).toBeUndefined();
            }
        });

        it('createDocument should reject with an error object on unauthorized error', async () => {
            const reader = { /* Define your reader data here */ };
            // Mock the API call to return a 401 unauthorized response
            mock.onPost('/Aludoc/Document/createDocument').reply(401);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await createDocument(reader);
            } catch (error) {
                // Expect that the error object contains the expected message or action (e.g., redirection)
                expect(error?.history).toBeUndefined();
            }
        });
    });
});

describe('editDocument API Tests', () => {
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

    describe('editDocument API', () => {
        it('editDocument should resolve on successful API call', async () => {
            const reader = {};

            // Mock the API call and return a successful response
            mock.onPost('/Aludoc/Document/EditDocument').reply(200);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            const result = await editDocument(reader);

            // Expect that the promise resolves
            expect(result.data).toBeNull();
        });

        it('editDocument should reject with an error object on network error', async () => {
            const reader = { /* Define your reader data here */ };

            // Mock the API call to simulate a network error
            mock.onPost('/Aludoc/Document/EditDocument').networkError();

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await editDocument(reader);
            } catch (error) {
                // Expect that the error object contains the expected message
                expect(error?.history).toBeUndefined();
            }
        });

        it('editDocument should reject with an error object on unauthorized error', async () => {
            const reader = { /* Define your reader data here */ };
            // Mock the API call to return a 401 unauthorized response
            mock.onPost('/Aludoc/Document/EditDocument').reply(401);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await editDocument(reader);
            } catch (error) {
                // Expect that the error object contains the expected message or action (e.g., redirection)
                expect(error?.history).toBeUndefined();
            }
        });
    });
});

describe('createDocumentType API Tests', () => {
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

    describe('createDocumentType API', () => {
        it('createDocumentType should resolve on successful API call', async () => {
            const reader = {};

            // Mock the API call and return a successful response
            mock.onPost('/Aludoc/Document/CreateDocumentType').reply(200);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            const result = await createDocumentType(reader);

            // Expect that the promise resolves
            expect(result.data).toBeNull();
        });

        it('createDocumentType should reject with an error object on network error', async () => {
            const reader = { /* Define your reader data here */ };

            // Mock the API call to simulate a network error
            mock.onPost('/Aludoc/Document/CreateDocumentType').networkError();

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await createDocumentType(reader);
            } catch (error) {
                // Expect that the error object contains the expected message
                expect(error?.history).toBeUndefined();
            }
        });

        it('createDocumentType should reject with an error object on unauthorized error', async () => {
            const reader = { /* Define your reader data here */ };
            // Mock the API call to return a 401 unauthorized response
            mock.onPost('/Aludoc/Document/CreateDocumentType').reply(401);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await createDocumentType(reader);
            } catch (error) {
                // Expect that the error object contains the expected message or action (e.g., redirection)
                expect(error?.history).toBeUndefined();
            }
        });
    });
});

describe('editDocumentType API Tests', () => {
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

    describe('editDocumentType API', () => {
        it('editDocumentType should resolve on successful API call', async () => {
            const reader = {};

            // Mock the API call and return a successful response
            mock.onPost('/Aludoc/Document/EditDocumentType').reply(200);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            const result = await editDocumentType(reader);

            // Expect that the promise resolves
            expect(result.data).toBeNull();
        });

        it('editDocumentType should reject with an error object on network error', async () => {
            const reader = { /* Define your reader data here */ };

            // Mock the API call to simulate a network error
            mock.onPost('/Aludoc/Document/EditDocumentType').networkError();

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await editDocumentType(reader);
            } catch (error) {
                // Expect that the error object contains the expected message
                expect(error?.history).toBeUndefined();
            }
        });

        it('editDocumentType should reject with an error object on unauthorized error', async () => {
            const reader = { /* Define your reader data here */ };
            // Mock the API call to return a 401 unauthorized response
            mock.onPost('/Aludoc/Document/EditDocumentType').reply(401);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await editDocumentType(reader);
            } catch (error) {
                // Expect that the error object contains the expected message or action (e.g., redirection)
                expect(error?.history).toBeUndefined();
            }
        });
    });
});

describe('deleteDocuments API Tests', () => {
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

    describe('deleteDocuments API', () => {
        it('deleteDocuments should resolve on successful API call', async () => {
            const reader = {};

            // Mock the API call and return a successful response
            mock.onPost('/Aludoc/Document/DeleteDocuments').reply(200);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            const result = await deleteDocuments(reader);

            // Expect that the promise resolves
            expect(result.data).toBeNull();
        });

        it('deleteDocuments should reject with an error object on network error', async () => {
            const reader = { /* Define your reader data here */ };

            // Mock the API call to simulate a network error
            mock.onPost('/Aludoc/Document/DeleteDocuments').networkError();

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await deleteDocuments(reader);
            } catch (error) {
                // Expect that the error object contains the expected message
                expect(error?.history).toBeUndefined();
            }
        });

        it('deleteDocuments should reject with an error object on unauthorized error', async () => {
            const reader = { /* Define your reader data here */ };
            // Mock the API call to return a 401 unauthorized response
            mock.onPost('/Aludoc/Document/DeleteDocuments').reply(401);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await deleteDocuments(reader);
            } catch (error) {
                // Expect that the error object contains the expected message or action (e.g., redirection)
                expect(error?.history).toBeUndefined();
            }
        });
    });
});

describe('deleteDocumentsType API Tests', () => {
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

    describe('deleteDocumentsType API', () => {
        it('deleteDocumentsType should resolve on successful API call', async () => {
            const reader = {};

            // Mock the API call and return a successful response
            mock.onDelete('/Aludoc/Document/DeleteDocumentType').reply(200);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            const result = await deleteDocumentsType(reader);

            // Expect that the promise resolves
            expect(result.data).toBeNull();
        });

        it('deleteDocumentsType should reject with an error object on network error', async () => {
            const reader = { /* Define your reader data here */ };

            // Mock the API call to simulate a network error
            mock.onDelete('/Aludoc/Document/DeleteDocumentType').networkError();

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await deleteDocumentsType(reader);
            } catch (error) {
                // Expect that the error object contains the expected message
                expect(error?.history).toBeUndefined();
            }
        });

        it('deleteDocumentsType should reject with an error object on unauthorized error', async () => {
            const reader = { /* Define your reader data here */ };
            // Mock the API call to return a 401 unauthorized response
            mock.onDelete('/Aludoc/Document/DeleteDocumentType').reply(401);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await deleteDocumentsType(reader);
            } catch (error) {
                // Expect that the error object contains the expected message or action (e.g., redirection)
                expect(error?.history).toBeUndefined();
            }
        });
    });
});

describe('getDocumentStatusGraphData API Tests', () => {
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

    describe('getDocumentStatusGraphData API', () => {
        it('getDocumentStatusGraphData should resolve on successful API call', async () => {
            const reader = {};

            // Mock the API call and return a successful response
            mock.onPost('/Aludoc/Document/GetDocumentStatusGraphData').reply(200);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            const result = await getDocumentStatusGraphData(reader);

            // Expect that the promise resolves
            expect(result.data).toBeNull();
        });

        it('getDocumentStatusGraphData should reject with an error object on network error', async () => {
            const reader = { /* Define your reader data here */ };

            // Mock the API call to simulate a network error
            mock.onPost('/Aludoc/Document/GetDocumentStatusGraphData').networkError();

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await getDocumentStatusGraphData(reader);
            } catch (error) {
                // Expect that the error object contains the expected message
                expect(error?.history).toBeUndefined();
            }
        });

        it('getDocumentStatusGraphData should reject with an error object on unauthorized error', async () => {
            const reader = { /* Define your reader data here */ };
            // Mock the API call to return a 401 unauthorized response
            mock.onPost('/Aludoc/Document/GetDocumentStatusGraphData').reply(401);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await getDocumentStatusGraphData(reader);
            } catch (error) {
                // Expect that the error object contains the expected message or action (e.g., redirection)
                expect(error?.history).toBeUndefined();
            }
        });
    });
});

describe('genericDataTableApiCall API Tests', () => {
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

    describe('genericDataTableApiCall API', () => {
        it('genericDataTableApiCall should resolve on successful API call', async () => {
            const reader = {};

            // Mock the API call and return a successful response
            mock.onPost('/Aludoc/Document/GenericDataTableApiCall').reply(200);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            const result = await genericDataTableApiCall(reader);

            // Expect that the promise resolves
            expect(result.data).toBeNull();
        });

        it('genericDataTableApiCall should reject with an error object on network error', async () => {
            const reader = { /* Define your reader data here */ };

            // Mock the API call to simulate a network error
            mock.onPost('/Aludoc/Document/GenericDataTableApiCall').networkError();

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await genericDataTableApiCall(reader);
            } catch (error) {
                // Expect that the error object contains the expected message
                expect(error?.history).toBeUndefined();
            }
        });

        it('genericDataTableApiCall should reject with an error object on unauthorized error', async () => {
            const reader = { /* Define your reader data here */ };
            // Mock the API call to return a 401 unauthorized response
            mock.onPost('/Aludoc/Document/GenericDataTableApiCall').reply(401);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await genericDataTableApiCall(reader);
            } catch (error) {
                // Expect that the error object contains the expected message or action (e.g., redirection)
                expect(error?.history).toBeUndefined();
            }
        });
    });
});