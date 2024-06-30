
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import '@fontsource-variable/montserrat';
import { ThemeProvider } from "./context/Theme-shadcn.jsx";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
        <App /> <Toaster expand={false} closeButton />
        </ThemeProvider>
        
        <ReactQueryDevtools position="top-left" initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  </>
);

