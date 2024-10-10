export const REQUEST_CREDENTIAL = "REQUEST_CREDENTIAL";
export const RECEIVE_CREDENTIAL = "RECEIVE_CREDENTIAL";

export const REQUEST_LOGIN_SAML = "REQUEST_LOGIN_SAML";
export const RECEIVE_LOGIN_SAML = "RECEIVE_LOGIN_SAML";

export const requestLoginSAML = payload => {
  return { type: REQUEST_LOGIN_SAML, payload };
};

export const requestCredential = file => {
  return { type: REQUEST_CREDENTIAL, file };
};
