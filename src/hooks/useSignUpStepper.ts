import { create } from "zustand";

import { AccountIdentifier, BrandInfo } from "@/services/auth";

type useSignUpStepperState = {
  step: number;
  setStep: (step: number) => void;
  accountIdentifier: AccountIdentifier | null;
  setAccountIdentifier: (accountIdentifier: AccountIdentifier) => void;
  brandInfo: BrandInfo | null;
  setBrandInfo: (brandInfo: BrandInfo) => void;
  reset: () => void;
};

const useSignUpStepper = create<useSignUpStepperState>((set) => ({
  step: 0,
  setStep: (step: number) => set({ step }),
  accountIdentifier: null,
  setAccountIdentifier: (accountIdentifier: AccountIdentifier | null) => set({ accountIdentifier }),
  brandInfo: null,
  setBrandInfo: (brandInfo: BrandInfo | null) => set({ brandInfo }),
  reset: () => set({ step: 0, accountIdentifier: null, brandInfo: null }),
}));

export default useSignUpStepper;
