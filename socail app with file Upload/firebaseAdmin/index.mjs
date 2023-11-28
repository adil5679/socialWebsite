import admin from 'firebase-admin';

// https:firebase.google.com/docs/storage/admin/start
//==============================================


let serviceAccount = {
    "type": "service_account",
    "project_id": "file-upload-3e06a",
    "private_key_id": "c3137713ec070de1cc27ceeb145621126664569f",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDVDBxNzM/IeQ1s\n+gSqzVIRRYKx5K9MUwhCuMhksCAB84TSAVhPDNpHMn5o7uh7632pxgVp3IGOzfv+\nd3mLyN+NoqrDLPArGiFaKMZ6aKJzikapqEwMuF2Tlz0DVt8BJq7Qb1DsADo48j10\nXR4/lAs8NluGk2iJlxpEw7Oj2a/tM3To7vCsJfFEMrVlMnWY+WrDKYoHnGCfBDyS\nvAuViUzkvtsHkt9smrQfPs1hKJolYvqrikMQbZBUbAet9WrbvO0Eyi1ojei4Vdu1\nys4bu3CQ/t+TzeaDYPncRiimzxnedzFMI70r+LP+aBnM06Sm6chXpnrId8zFw7es\nGRzxdrSbAgMBAAECggEAHP/yhFvqNrQqRy4Qij1mO+f1092N8mTlCCFbVGqtrgZQ\nteitSsle7E0WbECE+y/sIZAiYYK8ofcuTjjuHcB16bN9l2axDx+V8E4CQlxRgfUN\ntv9WfBlxJ2txSIM/2h9tW/2jCr+MgqmQAvG/8dCRkkcl6z96fdbId8QZ2lEB7la7\nUdlIFBVlMYDG/7zacG14tR0gQx8PP88gQ2RidttXrKdfsD9xhN2xCdkbcPvhPCBf\ngxd/aTahnXYpd4+GZaiW9QArmzJyoG6FkqIxnAMBZ+v524T7d8xYqcp8Lhjy4bxn\ne9iGpVuYkaLgqT2Q2fdKXWc2V+9PNmzmFG2kDqu5uQKBgQDyAgbPExWsVqJtWyXN\nufjVfZrt17XP1IGan55OVD6Rk06+IRRyQYcbeQc18ggjaYy2Uh4D0pfYlZ2PKDcz\nJP6G0u8Hq7y+XvHh4p+URS6mFAOUMoRBO+vW3iuRkwQnYoH+HYJG9nQbp9NpCz6Y\ncoIdRm0mb3f0upbsKYEoo23hAwKBgQDhXW+wEnnZ99VIcMnZYSZh73KDv9lpav3V\n9Rs6Ro3ERsQfatvyWKpAuI9RsrVSkhqV4gZCHpjaEaRDt/U/9+8Q1o2kxxMbOEZd\niFCiiGBbMbt0fQmQ3OH5t7/Nu6CjmJMhstY/+HQhRKp7YtyXU4NYr/aXtZcZ1Es2\np6T7rP5uiQKBgQCZX0ttZMzxgZ5C6+cTcG8Q7h+H6JNi+WyBz/MF9UIKBG98833/\nwyOa96LoP1GFD9mLmpNHHOn66ycFmRkSorlkPL4cAG0HwShOXc+Aqi+cNUbnXvSO\nWyll7TtzcNbLFxUHNTBhRMPk2wGSqvuqpbdsUjvOhgph4PbRCKTAWoLCfQKBgQCu\nCOvhOsNiseLBKGiYOE/dvX3fhF4u7HLNsZSvMiD0e/mkkW78/b+sb1ouKyWfeDiT\nmpJeqSY88Pa7XOpF1f+GL0n+/8UfdhvQyx4KBerzQbqTQKQMfKb9owq5o7Vv4Llu\ngp61k/aKYm6NDlFvgwyhhnGVwqPHTIwwztG3kWaCkQKBgQDKFe6SiKJEdkpH6ukr\niAlCuefMM888PPyxXKmEz+GFE1rWlTd8sUDAPKMhLdo0yOudDGxwMmJ8AfD9aYuo\n2ktr6tmtsc3SyBJKCKCt6HWiJXrtSMh6lQAic2y8U8Yx9nVQRrqsswrFC3suSKE7\nm58GCBBGhWs1VGcvg4FQHHjDZg==\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-ejgnh@file-upload-3e06a.iam.gserviceaccount.com",
    "client_id": "104630181645601379312",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ejgnh%40file-upload-3e06a.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  };
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://file-upload-3e06a.firebaseio.com"
});
const bucket = admin.storage().bucket("gs://file-upload-3e06a.appspot.com");

export default bucket;