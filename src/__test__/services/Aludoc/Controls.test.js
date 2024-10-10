
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import {
    getMyControls, getHighestControlId, createControl, editControl, getDetailsControl, deleteControls,
    setControlNotifications, isControlNameAvailable, getPersonDocumentationStatusByControls, getPersonsByControl, getControlPeopleGraphData, getCompaniesByControlId
} from '../../../services/Aludoc/Controls';

describe('getMyControls API Tests', () => {
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

    describe('getMyControls API', () => {
        it('getMyControls should resolve on successful API call', async () => {
            const reader = {};

            // Mock the API call and return a successful response
            mock.onGet('/Aludoc/Controls/Get').reply(200);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            const result = await getMyControls(reader);

            // Expect that the promise resolves
            expect(result.data).toBeNull();
        });

        it('getMyControls should reject with an error object on network error', async () => {
            const reader = { /* Define your reader data here */ };

            // Mock the API call to simulate a network error
            mock.onGet('/Aludoc/Controls/Get').networkError();

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await getMyControls(reader);
            } catch (error) {
                // Expect that the error object contains the expected message
                expect(error?.history).toBeUndefined();
            }
        });

        it('getMyControls should reject with an error object on unauthorized error', async () => {
            const reader = { /* Define your reader data here */ };
            // Mock the API call to return a 401 unauthorized response
            mock.onGet('/Aludoc/Controls/Get').reply(401);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await getMyControls(reader);
            } catch (error) {
                // Expect that the error object contains the expected message or action (e.g., redirection)
                expect(error?.history).toBeUndefined();
            }
        });
    });
});

describe('getHighestControlId API Tests', () => {
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

    describe('getHighestControlId API', () => {
        it('getHighestControlId should resolve on successful API call', async () => {
            const reader = {};

            // Mock the API call and return a successful response
            mock.onGet('/Aludoc/Controls/getHighestControlId').reply(200);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            const result = await getHighestControlId(reader);

            // Expect that the promise resolves
            expect(result.data).toBeNull();
        });

        it('getHighestControlId should reject with an error object on network error', async () => {
            const reader = { /* Define your reader data here */ };

            // Mock the API call to simulate a network error
            mock.onGet('/Aludoc/Controls/getHighestControlId').networkError();

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await getHighestControlId(reader);
            } catch (error) {
                // Expect that the error object contains the expected message
                expect(error?.history).toBeUndefined();
            }
        });

        it('getHighestControlId should reject with an error object on unauthorized error', async () => {
            const reader = { /* Define your reader data here */ };
            // Mock the API call to return a 401 unauthorized response
            mock.onGet('/Aludoc/Controls/getHighestControlId').reply(401);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await getHighestControlId(reader);
            } catch (error) {
                // Expect that the error object contains the expected message or action (e.g., redirection)
                expect(error?.history).toBeUndefined();
            }
        });
    });
});

describe('createControl API Tests', () => {
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

    describe('createControl API', () => {
        it('createControl should resolve on successful API call', async () => {
            const reader = {};

            // Mock the API call and return a successful response
            mock.onPost('/Aludoc/Controls/Create').reply(200);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            const result = await createControl(reader);

            // Expect that the promise resolves
            expect(result.data).toBeNull();
        });

        it('createControl should reject with an error object on network error', async () => {
            const reader = { /* Define your reader data here */ };

            // Mock the API call to simulate a network error
            mock.onPost('/Aludoc/Controls/Create').networkError();

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await createControl(reader);
            } catch (error) {
                // Expect that the error object contains the expected message
                expect(error?.history).toBeUndefined();
            }
        });

        it('createControl should reject with an error object on unauthorized error', async () => {
            const reader = { /* Define your reader data here */ };
            // Mock the API call to return a 401 unauthorized response
            mock.onPost('/Aludoc/Controls/Create').reply(401);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await createControl(reader);
            } catch (error) {
                // Expect that the error object contains the expected message or action (e.g., redirection)
                expect(error?.history).toBeUndefined();
            }
        });
    });
});

describe('editControl API Tests', () => {
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

    describe('editControl API', () => {
        it('editControl should resolve on successful API call', async () => {
            const reader = {};

            // Mock the API call and return a successful response
            mock.onPut('/Aludoc/Controls/Edit').reply(200);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            const result = await editControl(reader);

            // Expect that the promise resolves
            expect(result.data).toBeNull();
        });

        it('editControl should reject with an error object on network error', async () => {
            const reader = { /* Define your reader data here */ };

            // Mock the API call to simulate a network error
            mock.onPut('/Aludoc/Controls/Edit').networkError();

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await editControl(reader);
            } catch (error) {
                // Expect that the error object contains the expected message
                expect(error?.history).toBeUndefined();
            }
        });

        it('editControl should reject with an error object on unauthorized error', async () => {
            const reader = { /* Define your reader data here */ };
            // Mock the API call to return a 401 unauthorized response
            mock.onPut('/Aludoc/Controls/Edit').reply(401);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await editControl(reader);
            } catch (error) {
                // Expect that the error object contains the expected message or action (e.g., redirection)
                expect(error?.history).toBeUndefined();
            }
        });
    });
});

describe('getDetailsControl API Tests', () => {
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

    describe('getDetailsControl API', () => {
        it('getDetailsControl should resolve on successful API call', async () => {
            const reader = {};

            // Mock the API call and return a successful response
            mock.onGet('/Aludoc/Controls/Details').reply(200);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            const result = await getDetailsControl(reader);

            // Expect that the promise resolves
            expect(result.data).toBeNull();
        });

        it('getDetailsControl should reject with an error object on network error', async () => {
            const reader = { /* Define your reader data here */ };

            // Mock the API call to simulate a network error
            mock.onGet('/Aludoc/Controls/Details').networkError();

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await getDetailsControl(reader);
            } catch (error) {
                // Expect that the error object contains the expected message
                expect(error?.history).toBeUndefined();
            }
        });

        it('getDetailsControl should reject with an error object on unauthorized error', async () => {
            const reader = { /* Define your reader data here */ };
            // Mock the API call to return a 401 unauthorized response
            mock.onGet('/Aludoc/Controls/Details').reply(401);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await getDetailsControl(reader);
            } catch (error) {
                // Expect that the error object contains the expected message or action (e.g., redirection)
                expect(error?.history).toBeUndefined();
            }
        });
    });
});

describe('deleteControls API Tests', () => {
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
    describe('deleteControls API', () => {
        it('deleteControls should resolve on successful API call', async () => {
            const reader = {};

            // Mock the API call and return a successful response
            mock.onDelete('/Aludoc/Controls/DeleteControls').reply(200);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            const result = await deleteControls(reader);

            // Expect that the promise resolves
            expect(result.data).toBeNull();
        });

        it('deleteControls should reject with an error object on network error', async () => {
            const reader = { /* Define your reader data here */ };

            // Mock the API call to simulate a network error
            mock.onDelete('/Aludoc/Controls/DeleteControls').networkError();

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await deleteControls(reader);
            } catch (error) {
                // Expect that the error object contains the expected message
                expect(error?.history).toBeUndefined();
            }
        });

        it('deleteControls should reject with an error object on unauthorized error', async () => {
            const reader = { /* Define your reader data here */ };
            // Mock the API call to return a 401 unauthorized response
            mock.onDelete('/Aludoc/Controls/DeleteControls').reply(401);

            localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

            // Call the API function
            try {
                await deleteControls(reader);
            } catch (error) {
                // Expect that the error object contains the expected message or action (e.g., redirection)
                expect(error?.history).toBeUndefined();
            }
        });
    });
});

describe('setControlNotifications API', () => {
    it('setControlNotifications should resolve on successful API call', async () => {
        const reader = {};

        // Mock the API call and return a successful response
        mock.onPut('/Aludoc/Controls/SetControlNotifications').reply(200);

        localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

        // Call the API function
        const result = await setControlNotifications(reader);

        // Expect that the promise resolves
        expect(result.data).toBeNull();
    });

    it('setControlNotifications should reject with an error object on network error', async () => {
        const reader = { /* Define your reader data here */ };

        // Mock the API call to simulate a network error
        mock.onPut('/Aludoc/Controls/SetControlNotifications').networkError();

        localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

        // Call the API function
        try {
            await setControlNotifications(reader);
        } catch (error) {
            // Expect that the error object contains the expected message
            expect(error?.history).toBeUndefined();
        }
    });

    it('setControlNotifications should reject with an error object on unauthorized error', async () => {
        const reader = { /* Define your reader data here */ };
        // Mock the API call to return a 401 unauthorized response
        mock.onPut('/Aludoc/Controls/SetControlNotifications').reply(401);

        localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

        // Call the API function
        try {
            await setControlNotifications(reader);
        } catch (error) {
            // Expect that the error object contains the expected message or action (e.g., redirection)
            expect(error?.history).toBeUndefined();
        }
    });
});

describe('isControlNameAvailable API', () => {
    it('isControlNameAvailable should resolve on successful API call', async () => {
        const reader = {};

        // Mock the API call and return a successful response
        mock.onGet('/Aludoc/Controls/IsControlNameAvailable').reply(200);

        localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

        // Call the API function
        const result = await isControlNameAvailable(reader);

        // Expect that the promise resolves
        expect(result.data).toBeNull();
    });

    it('isControlNameAvailable should reject with an error object on network error', async () => {
        const reader = { /* Define your reader data here */ };

        // Mock the API call to simulate a network error
        mock.onGet('/Aludoc/Controls/IsControlNameAvailable').networkError();

        localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

        // Call the API function
        try {
            await isControlNameAvailable(reader);
        } catch (error) {
            // Expect that the error object contains the expected message
            expect(error?.history).toBeUndefined();
        }
    });

    it('isControlNameAvailable should reject with an error object on unauthorized error', async () => {
        const reader = { /* Define your reader data here */ };
        // Mock the API call to return a 401 unauthorized response
        mock.onGet('/Aludoc/Controls/IsControlNameAvailable').reply(401);

        localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

        // Call the API function
        try {
            await isControlNameAvailable(reader);
        } catch (error) {
            // Expect that the error object contains the expected message or action (e.g., redirection)
            expect(error?.history).toBeUndefined();
        }
    });
});

describe('getPersonDocumentationStatusByControls API', () => {
    it('getPersonDocumentationStatusByControls should resolve on successful API call', async () => {
        const reader = {};

        // Mock the API call and return a successful response
        mock.onGet('/Aludoc/Controls/GetPeopleByControlId').reply(200);

        localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

        // Call the API function
        const result = await getPersonDocumentationStatusByControls(reader);

        // Expect that the promise resolves
        expect(result.data).toBeNull();
    });

    it('getPersonDocumentationStatusByControls should reject with an error object on network error', async () => {
        const reader = { /* Define your reader data here */ };

        // Mock the API call to simulate a network error
        mock.onGet('/Aludoc/Controls/GetPeopleByControlId').networkError();

        localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

        // Call the API function
        try {
            await getPersonDocumentationStatusByControls(reader);
        } catch (error) {
            // Expect that the error object contains the expected message
            expect(error?.history).toBeUndefined();
        }
    });

    it('getPersonDocumentationStatusByControls should reject with an error object on unauthorized error', async () => {
        const reader = { /* Define your reader data here */ };
        // Mock the API call to return a 401 unauthorized response
        mock.onGet('/Aludoc/Controls/GetPeopleByControlId').reply(401);

        localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

        // Call the API function
        try {
            await getPersonDocumentationStatusByControls(reader);
        } catch (error) {
            // Expect that the error object contains the expected message or action (e.g., redirection)
            expect(error?.history).toBeUndefined();
        }
    });
});

describe('getPersonsByControl API', () => {
    it('getPersonsByControl should resolve on successful API call', async () => {
        const reader = {};

        // Mock the API call and return a successful response
        mock.onGet('/Aludoc/Controls/GetPeopleByControlId').reply(200);

        localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

        // Call the API function
        const result = await getPersonsByControl(reader);

        // Expect that the promise resolves
        expect(result.data).toBeNull();
    });

    it('getPersonsByControl should reject with an error object on network error', async () => {
        const reader = { /* Define your reader data here */ };

        // Mock the API call to simulate a network error
        mock.onGet('/Aludoc/Controls/GetPeopleByControlId').networkError();

        localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

        // Call the API function
        try {
            await getPersonsByControl(reader);
        } catch (error) {
            // Expect that the error object contains the expected message
            expect(error?.history).toBeUndefined();
        }
    });

    it('getPersonsByControl should reject with an error object on unauthorized error', async () => {
        const reader = { /* Define your reader data here */ };
        // Mock the API call to return a 401 unauthorized response
        mock.onGet('/Aludoc/Controls/GetPeopleByControlId').reply(401);

        localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

        // Call the API function
        try {
            await getPersonsByControl(reader);
        } catch (error) {
            // Expect that the error object contains the expected message or action (e.g., redirection)
            expect(error?.history).toBeUndefined();
        }
    });
});

describe('getControlPeopleGraphData API', () => {
    it('getControlPeopleGraphData should resolve on successful API call', async () => {
        const reader = {};

        // Mock the API call and return a successful response
        mock.onGet('/Aludoc/Controls/ControlPeopleGraphData').reply(200);

        localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

        // Call the API function
        const result = await getControlPeopleGraphData(reader);

        // Expect that the promise resolves
        expect(result.data).toBeNull();
    });

    it('getControlPeopleGraphData should reject with an error object on network error', async () => {
        const reader = { /* Define your reader data here */ };

        // Mock the API call to simulate a network error
        mock.onGet('/Aludoc/Controls/ControlPeopleGraphData').networkError();

        localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

        // Call the API function
        try {
            await getControlPeopleGraphData(reader);
        } catch (error) {
            // Expect that the error object contains the expected message
            expect(error?.history).toBeUndefined();
        }
    });

    it('getControlPeopleGraphData should reject with an error object on unauthorized error', async () => {
        const reader = { /* Define your reader data here */ };
        // Mock the API call to return a 401 unauthorized response
        mock.onGet('/Aludoc/Controls/ControlPeopleGraphData').reply(401);

        localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

        // Call the API function
        try {
            await getControlPeopleGraphData(reader);
        } catch (error) {
            // Expect that the error object contains the expected message or action (e.g., redirection)
            expect(error?.history).toBeUndefined();
        }
    });
});

describe('getCompaniesByControlId API', () => {
    it('getCompaniesByControlId should resolve on successful API call', async () => {
        const reader = {};

        // Mock the API call and return a successful response
        mock.onGet('/Aludoc/Controls/GetCompaniesByControlId').reply(200);

        localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

        // Call the API function
        const result = await getControlPeopleGraphData(reader);

        // Expect that the promise resolves
        expect(result.data).toBeNull();
    });

    it('getCompaniesByControlId should reject with an error object on network error', async () => {
        const reader = { /* Define your reader data here */ };

        // Mock the API call to simulate a network error
        mock.onGet('/Aludoc/Controls/GetCompaniesByControlId').networkError();

        localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

        // Call the API function
        try {
            await getCompaniesByControlId(reader);
        } catch (error) {
            // Expect that the error object contains the expected message
            expect(error?.history).toBeUndefined();
        }
    });

    it('getCompaniesByControlId should reject with an error object on unauthorized error', async () => {
        const reader = { /* Define your reader data here */ };
        // Mock the API call to return a 401 unauthorized response
        mock.onGet('/Aludoc/Controls/GetCompaniesByControlId').reply(401);

        localStorageMock.getItem.mockReturnValue("Bearer " + localStorage.getItem("userToken")); // Mock localStorage values

        // Call the API function
        try {
            await getCompaniesByControlId(reader);
        } catch (error) {
            // Expect that the error object contains the expected message or action (e.g., redirection)
            expect(error?.history).toBeUndefined();
        }
    });
});

