import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getDatabase, Database } from "firebase/database";

export const firebaseConfig = {
  apiKey: "AIzaSyDwYZkAYBOYRgMKhCqYhKBIBjhJTT4bFmY",
  authDomain: "thegrils-79663.firebaseapp.com",
  databaseURL: "https://thegrils-79663-default-rtdb.firebaseio.com",
  projectId: "thegrils-79663",
  storageBucket: "thegrils-79663.firebasestorage.app",
  messagingSenderId: "487123252212",
  appId: "1:487123252212:web:baf8bc459027c341cb3fa1",
  measurementId: "G-7QF2GYHEB6",
};

let _app: FirebaseApp | null = null;
let _auth: Auth | null = null;
let _db: Database | null = null;

export function firebaseApp(): FirebaseApp {
  if (_app) return _app;
  _app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  return _app;
}

export function firebaseAuth(): Auth {
  if (_auth) return _auth;
  _auth = getAuth(firebaseApp());
  return _auth;
}

export function firebaseDb(): Database {
  if (_db) return _db;
  _db = getDatabase(firebaseApp());
  return _db;
}
