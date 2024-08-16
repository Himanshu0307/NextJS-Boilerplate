import AuthCard from "@/components/auth/auth-card";
import RegisterForm from "@/components/auth/register-form";

export default function RegisterPage(){
    return ( <div className="">
        <AuthCard
          backTitle="Already have account"
          cardTitle="Create an account"
          showSocial={true}
          backhref="/auth/login"
        >
         <RegisterForm />
        </AuthCard>
      </div>)
}