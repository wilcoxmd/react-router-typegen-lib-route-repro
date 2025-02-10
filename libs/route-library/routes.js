// In a real world package, this route path would be
// resolved more dynamically. For the sake of this example, we hardcode
// our library route's `file` to be the relative path from `test-app`'s routes.ts to
// the library's route module.
export default [
  { path: "library-route", file: "../../../libs/route-library/library-route.jsx" }
]