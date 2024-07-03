import {
  collection,
  where,
  getFirestore,
  query,
  getDocs,
} from "firebase/firestore";
import { getNowMonth } from "@/helpers/dateMonth";
import axios from "axios";

const db = getFirestore();
const nowMonth = getNowMonth();
export const getAllOperationsByMonth = async (userId) => {
  const incomeOperationRef = collection(db, `users/${userId}/income_operation`);
  const lossOperationRef = collection(db, `users/${userId}/loss_operation`);

  const incomeOperationsQuery = query(
    incomeOperationRef,
    where("month", "==", nowMonth)
  );
  const lossOperationsQuery = query(
    lossOperationRef,
    where("month", "==", nowMonth)
  );

  const [incomeOperationsSnapshot, lossOperationsSnapshot] = await Promise.all([
    getDocs(incomeOperationsQuery),
    getDocs(lossOperationsQuery),
  ]);

  const incomeOperationsData = incomeOperationsSnapshot.docs.map((doc) =>
    doc.data()
  );
  const lossOperationsData = lossOperationsSnapshot.docs.map((doc) =>
    doc.data()
  );

  const allOperationsData = [...incomeOperationsData, ...lossOperationsData];

  return { allOperationsData, incomeOperationsData, lossOperationsData };
};

export const getAllOperationsAllMonth = async (userId) => {
  const incomeOperationRef = collection(db, `users/${userId}/income_operation`);
  const lossOperationRef = collection(db, `users/${userId}/loss_operation`);

  const incomeOperationsQuery = query(incomeOperationRef);
  const lossOperationsQuery = query(lossOperationRef);

  const [incomeOperationsSnapshot, lossOperationsSnapshot] = await Promise.all([
    getDocs(incomeOperationsQuery),
    getDocs(lossOperationsQuery),
  ]);

  const incomeOperationsData = incomeOperationsSnapshot.docs.map((doc) =>
    doc.data()
  );
  const lossOperationsData = lossOperationsSnapshot.docs.map((doc) =>
    doc.data()
  );

  const allOperationsData = [...incomeOperationsData, ...lossOperationsData];

  return { allOperationsData, incomeOperationsData, lossOperationsData };
};

export const getGoal = async (userId) => {
  const goalRef = collection(db, `users/${userId}/goal`);
  const incomeOperationsQuery = query(goalRef);
  const goalDataDocs = await getDocs(incomeOperationsQuery);
  const goalData = goalDataDocs.docs.map((doc) => doc.data());
  return goalData;
};

export const getCrypto = async (userId) => {
  const cryptoRef = collection(db, `users/${userId}/crypto`);
  const cryptoQuery = query(cryptoRef);
  const cryptoDataDocs = await getDocs(cryptoQuery);
  const cryptoData = cryptoDataDocs.docs.map((doc) => doc.data());
  return cryptoData;
};

export const getCryptoPrice = async (selectedCryptocurrency) => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${selectedCryptocurrency}&vs_currencies=usd`
    );
    return response.data[selectedCryptocurrency].usd;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
