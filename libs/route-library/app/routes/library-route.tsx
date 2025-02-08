import { Link } from "react-router";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <>
    <h1>This route is from a library</h1>
    <Link className="text-blue-600 hover:underline" to="/">Go to host route</Link>
    </>
  )
}
