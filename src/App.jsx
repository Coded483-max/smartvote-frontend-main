import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "./hooks/useSession";
import InactivityWarning from "./UI/InactivityWarning";

console.log(InactivityWarning);

function App() {
  const session = useSession();
  return (
    <>
      {session.showWarning && (
        <InactivityWarning
          onExtend={session.extendSession}
          onLogout={session.logout}
          timeRemaining={session.timeUntilExpiry}
          userType={session.userType}
        />
      )}

      <main>
        <Outlet />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          className="!font-sans"
          toastClassName="text-sm"
          bodyClassName="text-sm"
        />
      </main>
    </>
  );
}

export default App;
