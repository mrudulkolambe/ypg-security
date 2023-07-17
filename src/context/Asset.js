import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "./firebase_config";
import { useAuthContext } from "./Auth";


const AssetContext = createContext();

export function AssetContextProvider({ children }) {
	const [assets, setAssets] = useState([])
	const { user } = useAuthContext()


	useEffect(() => {
		if (user) {
			const q = query(collection(db, "Asset"));
			const unsubscribe = onSnapshot(q, (querySnapshot) => {
				const assets = [];
				querySnapshot.forEach((doc) => {
					assets.push({ ...doc.data(), assetId: doc.id });
				});
				setAssets(assets)
			});
			return () => {
				unsubscribe()
			}
		}
	}, [user])

	const addAssets = (data) => {
	}

	return (
		<AssetContext.Provider value={{ addAssets, assets }}>
			{children}
		</AssetContext.Provider>
	);
}

export function useAssetContext() {
	return useContext(AssetContext);
}
