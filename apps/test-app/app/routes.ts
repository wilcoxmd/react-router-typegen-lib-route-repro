import { type RouteConfig, index } from "@react-router/dev/routes";
import libraryRoutes from "route-library/routes"

export default [
  index("routes/home.tsx"),
  ...libraryRoutes
] satisfies RouteConfig;
