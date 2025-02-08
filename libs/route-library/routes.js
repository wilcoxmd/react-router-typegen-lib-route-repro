import { route } from '@react-router/dev/routes'

// This is an artificial example that assumes knowledge of point to this route library from 
// our test-app project's routes.ts. In a real world scenario, this route path would be
// resolved more dynamically.
export default [
  route("library-route", "../../../libs/route-library/app/routes/library-route.tsx")
]