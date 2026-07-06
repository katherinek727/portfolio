import { HashRouter, BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Use HashRouter for GitHub Pages, BrowserRouter for Vercel/local
const RouterComponent = process.env.VERCEL === '1' ? BrowserRouter : HashRouter;

const App = () => (
  <RouterComponent>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </RouterComponent>
);

export default App;
