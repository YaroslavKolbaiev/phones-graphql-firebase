import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const serviceAccount = {
  type: 'service_account',
  projectId: 'phone-catalogue-61634',
  privateKeyId: '9b13e8bc86de481e37ac4bfa2fc36210c97d9fcc',
  privateKey:
    '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDQaQW93oqRpcG7\nNsCmoOZBqsD+gmoYDKPH5PRfcUfog1sPCyaqujtAgpY2OsXir4+9rOMbRMXTqUvE\nqfI9W20UunB0cpmqbFW9ehTDg5JSaWwrVFHosK6bdsrpGar0q8NGXgMrjpLdz9xl\nx68bJadcuv+tSg1q9vYV7nS9JFZbG5Pii3vN9+46MD+yKYyzd3N2IZKbzarVMnlz\nw/8320Oys+LEfay5pC8q7PaslNdrX4E315LnT+H9EDEIt6vj2tICOH3i4FKvHOWT\nOypGWxb9Ceco1INa/OFqIMoCs0DlzKGgc8QNN/muD9baL19JCY17dIJ9oWVYNe4e\nBvDbWnffAgMBAAECggEAUFXzcyWqF4ukGpT3/SMvrudx3omJ+PxCU+cTNgk2NVAR\nFULwpEYGWg8cdQoBxqhzCaPvpU7EzRrIzKXP7UvlR+S4PYMBbfq1sESzZUw95ouh\nuTAXJNGadO39OI5+4jKlouXRZgRe46bg59Dp1FaW5X1l2jgd5PoOkRSqplAwA4zy\n1Bc4d2cBhzF/p+zMvVAQzlP40+heAyR6ennYmtxqjSlxLs3ByGvP+jG5f9d/SZ3R\nzkilq8FLVmcHHoSx7QcBqGcn+CeIE4L5v8jCrdDVa764VAswhHF0IIvy72kXRf/T\n1bklhXyKidMcmrwmRf7iP5EqynbE9BVY327D2ZVNYQKBgQD4GGcXoVh6YLoOVRqt\nYmUfR4VgcTYL6oVHQ+Ws5jsrhRnfsSjH/OL8o8gB6e0HMeoBoXVWaIjcqqeciCT7\nXAx4/eRWxvO0xJhF5mNEvywMDvfK0HB0hXCoDk/d5C+XUqds1nePZJB78YGTme+n\ntA/ItoqKYmsXCP5jqkYWN23jIQKBgQDXDO1YU67fG0ORIHReZ/M+Ka/9iKAAh0qY\nTHO4aal77rZrBgGs71NPRuACnMGCyEfjSnVO5hmVVWJT0vdSYxpT2tF90GYJCGgV\nupwX8m68KnCybR5zHB5QeTAEJbqqa4bqgRBiYAvhH4du8Ysydy0c88cSDAa9WEIV\n1PaqaTf6/wKBgEeEYVOCg0rjzz6KceJBVv0pVN10RSwyMrFUdUTeKXhmKgs9uo/L\n6nMBk4pZsKY+UUKfFIAQKkPSPfb1mBONeVr3dXc+aspVUb/0pfEPWtcvCWdBpukv\n/kWzunowaTep7/GD8Xs4dh4EhGHUIi2pzlMBq/YwYMaHJS39y65j1B2BAoGAGp13\n9nmM6AHoz9pTbKey3Buus1MockhMPCMiI024cyUtIHvC01NfXS1pZglejcAZ3ZCG\nijhCLFA/9h3jDChFxuELEmYraqzGrQHGddRETjd2cS6+GQL+4XjOL4U34AWk0fsd\nOv+mGLudOGbekmVbiPzGw34Hi4GT1D3iNV8GVaMCgYEAik2ffDQRg1BFEMvcgAi7\n0LQQewCPLTSWyPiyHTACYWqDUQVb1jCxDvAPb2Cu9FeXxw30EpRgvZfpXzwd4kuK\n+vyKp2WRu6a6zoEP/Pz8VdZKzjQaepjg8GQXHisLisOvZBm4mWTmBTN6DMOzZyQs\nrDI1hJJ/qjTN+WDQQM1nYbc=\n-----END PRIVATE KEY-----\n',
  clientEmail:
    'firebase-adminsdk-um1vt@phone-catalogue-61634.iam.gserviceaccount.com',
  clientId: '117579108462511049073',
  authUri: 'https://accounts.google.com/o/oauth2/auth',
  tokenUri: 'https://oauth2.googleapis.com/token',
  authProviderX509CertUrl: 'https://www.googleapis.com/oauth2/v1/certs',
  clientX509CertUrl:
    'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-um1vt%40phone-catalogue-61634.iam.gserviceaccount.com',
  universeDomain: 'googleapis.com',
};

initializeApp({
  credential: cert(serviceAccount),
});

export const connection = getFirestore();
