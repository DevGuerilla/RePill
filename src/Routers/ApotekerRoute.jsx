import React from "react";
import ScanApoteker from "../Pages/Scan/ScanApoteker";
import ScanRestocker from "../Pages/Scan/ScanRestocker";

export const apotekerRoutes = [
  {
    path: "/scan",
    element: <ScanApoteker />,
  },
  {
    path: "/restocker",
    element: <ScanRestocker />,
  },
];
