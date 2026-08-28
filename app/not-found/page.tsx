import NotFound from "../not-found";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | AquaGuide",
  description: "Looks like this aquarium is empty. The page you are looking for could not be found.",
};

export default function NotFoundPage() {
  return <NotFound />;
}
