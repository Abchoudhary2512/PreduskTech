import { Toaster } from "react-hot-toast"
import DashboardPage from "./components/Dashboard"


export default function App() {
  return (
    <>
      <DashboardPage />
      <Toaster position="top-right" />
    </>
  )
}
