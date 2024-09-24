import { Provider } from "react-redux";
import "./App.css";
import Router from "./Router/Router";
import { Store } from "./Store/Store";
import { useEffect, useState } from "react";
import { LangProvider } from "./Components/Contexts/lang";

function App() {
  const [lang, setLang] = useState(localStorage.getItem("lang"));
  useEffect(() => {
    if (!localStorage.getItem("lang")) {
      localStorage.setItem("lang", "en");
    }
  }, []);
  return (
    <>
      <Provider store={Store}>
        <LangProvider value={{ lang, setLang }}>
          <Router />
        </LangProvider>
      </Provider>
    </>
  );
}

export default App;
