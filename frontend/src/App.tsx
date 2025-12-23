import { BrowserRouter } from "react-router-dom";
import Routes from '../src/router/routes';

export default function App() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}
