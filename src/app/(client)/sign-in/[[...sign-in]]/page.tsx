import { SignIn } from "@clerk/nextjs";

function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-white dark:bg-slate-950 absolute top-0 left-0 z-50 px-4">
      <div className="align-middle my-auto mx-auto w-full max-w-md">
        <SignIn forceRedirectUrl="/dashboard" />
      </div>
    </div>
  );
}
export default SignInPage;
