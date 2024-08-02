"use client";

import { useEffect } from "react";

import AccountIdentifierForm from "./account-identifier-form";
import BrandInfoForm from "./brand-info-form";
import useSignUpStepper from "./useSignUpStepper";

export default function SignUp() {
  const { step, setStep, reset } = useSignUpStepper();
  useEffect(() => {
    return () => {
      setStep(0);
      reset();
    };
  }, []);
  if (step) return <BrandInfoForm />;
  return <AccountIdentifierForm />;
}
