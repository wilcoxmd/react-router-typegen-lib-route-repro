import { Link } from "react-router";

export function meta() {
  return [
    { title: "My library route" },
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
