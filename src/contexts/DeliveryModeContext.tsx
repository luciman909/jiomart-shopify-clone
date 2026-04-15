import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

type DeliveryMode = 'quick' | 'scheduled';

interface DeliveryModeContextType {
  mode: DeliveryMode;
  setMode: (mode: DeliveryMode) => void;
  selectedStoreId: string | null;
  setSelectedStoreId: (storeId: string | null) => void;
  isQuickMode: boolean;
  isScheduledMode: boolean;
}

const DeliveryModeContext = createContext<DeliveryModeContextType | undefined>(undefined);

export function DeliveryModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<DeliveryMode>('quick');
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);

  const setMode = useCallback((newMode: DeliveryMode) => {
    setModeState(newMode);
    // When switching to scheduled, clear store selection to show all inventory
    if (newMode === 'scheduled') {
      setSelectedStoreId(null);
    }
  }, []);

  return (
    <DeliveryModeContext.Provider
      value={{
        mode,
        setMode,
        selectedStoreId,
        setSelectedStoreId,
        isQuickMode: mode === 'quick',
        isScheduledMode: mode === 'scheduled',
      }}
    >
      {children}
    </DeliveryModeContext.Provider>
  );
}

export function useDeliveryMode() {
  const context = useContext(DeliveryModeContext);
  if (context === undefined) {
    throw new Error('useDeliveryMode must be used within a DeliveryModeProvider');
  }
  return context;
}
