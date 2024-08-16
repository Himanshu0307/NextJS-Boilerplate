
import AuthCard from "@/components/auth/auth-card";
import LoginForm from "@/components/auth/login-form";


export default function LoginPage() {
 
  return (
    <div className="">
      <AuthCard
        backTitle="Create an account"
        cardTitle="Welcome back!"
        showSocial={true}
        backhref="/auth/register"
      >
       <LoginForm />
      </AuthCard>
    </div>
  );
}
