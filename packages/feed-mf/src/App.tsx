import { Routes, Route } from "react-router-dom";
import FeedPage from "./pages/FeedPage";
import ArtistPage from "./pages/ArtistPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<FeedPage />} />
      <Route path="/artist/:slug" element={<ArtistPage />} />
    </Routes>
  );
}
