import { render } from "@testing-library/react";
// import { Provider } from "react-redux";
import App from "./App";
// import { Store } from "./redux/store";

test("renders learn react link", () => {
  render(
    // <Provider store={Store}>
    <App />
    // {/* </Provider> */}
  );
});
