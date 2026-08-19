"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { makeStore, AppStore } from "@/store";
import { persistStore } from "redux-persist";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | undefined>(undefined);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  const persistor = persistStore(storeRef.current!);

  return (
    <Provider store={storeRef.current!}>
      {/* PersistGate delays rendering until rehydration is complete */}
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
