import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import BackButton from "./back-button";
import Socials from "./socials";

type AutCardWrapperProps = {
  cardTitle: string;
  children: React.ReactNode;
  backTitle: string;
  backhref:string
  showSocial?: boolean;
};

export default function AuthCard({
  cardTitle,
  children,
  showSocial,
  backTitle,
  backhref
}: AutCardWrapperProps) {
  return (
    <div className="text-center">
      <Card className="justify-center">
        <CardHeader>
          <CardTitle>{cardTitle}</CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
        {showSocial && (
          <CardFooter className="justify-center">
            <Socials />
          </CardFooter>
        )}
        <CardFooter className="justify-center">
          <BackButton href={backhref} label={backTitle}></BackButton>
        </CardFooter>
      </Card>
    </div>
  );
}
