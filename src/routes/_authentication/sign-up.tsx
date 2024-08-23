import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

import AccountIdentifierForm from "@components/organisms/account-identifier-form";
import BrandInfoForm from "@components/organisms/brand-info-form";
import useSignUpStepper from "@hooks/useSignUpStepper";

export const Route = createFileRoute("/_authentication/sign-up")({
  component: SignUp,
});

function SignUp() {
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
