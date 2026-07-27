import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import RootLayout from './layouts/RootLayout';

// Pages
import Home from './pages/Home';
import FishEncyclopedia from './pages/FishEncyclopedia';
import FishDetail from './pages/FishDetail';
import Plants from './pages/Plants';
import PlantDetail from './pages/PlantDetail';
import Equipment from './pages/Equipment';
import EquipmentDetail from './pages/EquipmentDetail';
import Calculators from './pages/Calculators';
import Compatibility from './pages/Compatibility';
import Diseases from './pages/Diseases';
import DiseaseDetail from './pages/DiseaseDetail';
import Medicines from './pages/Medicines';
import MedicineDetail from './pages/MedicineDetail';
import Guides from './pages/Guides';
import GuideDetail from './pages/GuideDetail';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Search from './pages/Search';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Disclaimer from './pages/Disclaimer';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <RootLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/fish" element={<FishEncyclopedia />} />
              <Route path="/fish/:slug" element={<FishDetail />} />
              <Route path="/plants" element={<Plants />} />
              <Route path="/plants/:slug" element={<PlantDetail />} />
              <Route path="/equipment" element={<Equipment />} />
              <Route path="/equipment/:slug" element={<EquipmentDetail />} />
              <Route path="/calculators" element={<Calculators />} />
              <Route path="/compatibility" element={<Compatibility />} />
              <Route path="/diseases" element={<Diseases />} />
              <Route path="/diseases/:slug" element={<DiseaseDetail />} />
              <Route path="/medicines" element={<Medicines />} />
              <Route path="/medicines/:slug" element={<MedicineDetail />} />
              <Route path="/guides" element={<Guides />} />
              <Route path="/guides/:slug" element={<GuideDetail />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogDetail />} />
              <Route path="/search" element={<Search />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/disclaimer" element={<Disclaimer />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </RootLayout>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
