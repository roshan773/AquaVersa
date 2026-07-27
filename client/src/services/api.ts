import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to inject token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('fv_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('fv_refresh_token');
        if (!refreshToken) throw new Error('No refresh token available');

        const res = await axios.post(`${API_BASE_URL}/auth/refresh`, { refreshToken });
        const { accessToken, refreshToken: newRefreshToken } = res.data;

        localStorage.setItem('fv_token', accessToken);
        localStorage.setItem('fv_refresh_token', newRefreshToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('fv_token');
        localStorage.removeItem('fv_refresh_token');
        localStorage.removeItem('fv_user');
        window.location.href = '/admin/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;

// ==========================================
// API Endpoints
// ==========================================

// Auth
export const loginUser = async (payload: any) => {
  const res = await api.post('/auth/login', payload);
  return res.data;
};

export const forgotPassword = async (payload: any) => {
  const res = await api.post('/auth/forgot-password', payload);
  return res.data;
};

export const resetPassword = async (payload: any) => {
  const res = await api.post('/auth/reset-password', payload);
  return res.data;
};

// Fish
export const fetchFishes = async (params?: any) => {
  const res = await api.get('/fish', { params });
  return res.data;
};

export const fetchFishBySlug = async (slug: string) => {
  const res = await api.get(`/fish/${slug}`);
  return res.data;
};

export const createFish = async (payload: any) => {
  const res = await api.post('/fish', payload);
  return res.data;
};

export const updateFish = async (id: string, payload: any) => {
  const res = await api.put(`/fish/${id}`, payload);
  return res.data;
};

export const deleteFish = async (id: string) => {
  const res = await api.delete(`/fish/${id}`);
  return res.data;
};

// Plants
export const fetchPlants = async (params?: any) => {
  const res = await api.get('/plants', { params });
  return res.data;
};

export const fetchPlantBySlug = async (slug: string) => {
  const res = await api.get(`/plants/${slug}`);
  return res.data;
};

export const createPlant = async (payload: any) => {
  const res = await api.post('/plants', payload);
  return res.data;
};

export const updatePlant = async (id: string, payload: any) => {
  const res = await api.put(`/plants/${id}`, payload);
  return res.data;
};

export const deletePlant = async (id: string) => {
  const res = await api.delete(`/plants/${id}`);
  return res.data;
};

// Equipment
export const fetchEquipment = async (params?: any) => {
  const res = await api.get('/equipment', { params });
  return res.data;
};

export const fetchEquipmentBySlug = async (slug: string) => {
  const res = await api.get(`/equipment/${slug}`);
  return res.data;
};

export const getEquipmentRecommendation = async (payload: any) => {
  const res = await api.post('/equipment/recommend', payload);
  return res.data;
};

export const createEquipment = async (payload: any) => {
  const res = await api.post('/equipment', payload);
  return res.data;
};

export const updateEquipment = async (id: string, payload: any) => {
  const res = await api.put(`/equipment/${id}`, payload);
  return res.data;
};

export const deleteEquipment = async (id: string) => {
  const res = await api.delete(`/equipment/${id}`);
  return res.data;
};

// Food
export const fetchFood = async (params?: any) => {
  const res = await api.get('/food', { params });
  return res.data;
};

export const fetchFoodBySlug = async (slug: string) => {
  const res = await api.get(`/food/${slug}`);
  return res.data;
};

export const createFood = async (payload: any) => {
  const res = await api.post('/food', payload);
  return res.data;
};

export const updateFood = async (id: string, payload: any) => {
  const res = await api.put(`/food/${id}`, payload);
  return res.data;
};

export const deleteFood = async (id: string) => {
  const res = await api.delete(`/food/${id}`);
  return res.data;
};

// Diseases
export const fetchDiseases = async (params?: any) => {
  const res = await api.get('/diseases', { params });
  return res.data;
};

export const fetchDiseaseBySlug = async (slug: string) => {
  const res = await api.get(`/diseases/${slug}`);
  return res.data;
};

export const createDisease = async (payload: any) => {
  const res = await api.post('/diseases', payload);
  return res.data;
};

export const updateDisease = async (id: string, payload: any) => {
  const res = await api.put(`/diseases/${id}`, payload);
  return res.data;
};

export const deleteDisease = async (id: string) => {
  const res = await api.delete(`/diseases/${id}`);
  return res.data;
};

// Medicines
export const fetchMedicines = async (params?: any) => {
  const res = await api.get('/medicines', { params });
  return res.data;
};

export const fetchMedicineBySlug = async (slug: string) => {
  const res = await api.get(`/medicines/${slug}`);
  return res.data;
};

export const createMedicine = async (payload: any) => {
  const res = await api.post('/medicines', payload);
  return res.data;
};

export const updateMedicine = async (id: string, payload: any) => {
  const res = await api.put(`/medicines/${id}`, payload);
  return res.data;
};

export const deleteMedicine = async (id: string) => {
  const res = await api.delete(`/medicines/${id}`);
  return res.data;
};

// Blogs
export const fetchBlogs = async (params?: any) => {
  const res = await api.get('/blogs', { params });
  return res.data;
};

export const fetchBlogBySlug = async (slug: string) => {
  const res = await api.get(`/blogs/${slug}`);
  return res.data;
};

export const createBlog = async (payload: any) => {
  const res = await api.post('/blogs', payload);
  return res.data;
};

export const updateBlog = async (id: string, payload: any) => {
  const res = await api.put(`/blogs/${id}`, payload);
  return res.data;
};

export const deleteBlog = async (id: string) => {
  const res = await api.delete(`/blogs/${id}`);
  return res.data;
};

// Guides
export const fetchGuides = async (params?: any) => {
  const res = await api.get('/guides', { params });
  return res.data;
};

export const fetchGuideBySlug = async (slug: string) => {
  const res = await api.get(`/guides/${slug}`);
  return res.data;
};

export const createGuide = async (payload: any) => {
  const res = await api.post('/guides', payload);
  return res.data;
};

export const updateGuide = async (id: string, payload: any) => {
  const res = await api.put(`/guides/${id}`, payload);
  return res.data;
};

export const deleteGuide = async (id: string) => {
  const res = await api.delete(`/guides/${id}`);
  return res.data;
};

// FAQs
export const fetchFAQs = async (params?: any) => {
  const res = await api.get('/faqs', { params });
  return res.data;
};

export const createFAQ = async (payload: any) => {
  const res = await api.post('/faqs', payload);
  return res.data;
};

export const updateFAQ = async (id: string, payload: any) => {
  const res = await api.put(`/faqs/${id}`, payload);
  return res.data;
};

export const deleteFAQ = async (id: string) => {
  const res = await api.delete(`/faqs/${id}`);
  return res.data;
};

// Water Parameters
export const fetchWaterParameters = async () => {
  const res = await api.get('/water-parameters');
  return res.data;
};

export const createWaterParameter = async (payload: any) => {
  const res = await api.post('/water-parameters', payload);
  return res.data;
};

export const updateWaterParameter = async (id: string, payload: any) => {
  const res = await api.put(`/water-parameters/${id}`, payload);
  return res.data;
};

export const deleteWaterParameter = async (id: string) => {
  const res = await api.delete(`/water-parameters/${id}`);
  return res.data;
};

// Species Groups
export const fetchSpeciesGroups = async () => {
  const res = await api.get('/species-groups');
  return res.data;
};

export const createSpeciesGroup = async (payload: any) => {
  const res = await api.post('/species-groups', payload);
  return res.data;
};

export const updateSpeciesGroup = async (id: string, payload: any) => {
  const res = await api.put(`/species-groups/${id}`, payload);
  return res.data;
};

export const deleteSpeciesGroup = async (id: string) => {
  const res = await api.delete(`/species-groups/${id}`);
  return res.data;
};

// Comments
export const fetchComments = async (params?: any) => {
  const res = await api.get('/comments', { params });
  return res.data;
};

export const postComment = async (payload: any) => {
  const res = await api.post('/comments', payload);
  return res.data;
};

export const updateComment = async (id: string, payload: any) => {
  const res = await api.put(`/comments/${id}`, payload);
  return res.data;
};

export const deleteComment = async (id: string) => {
  const res = await api.delete(`/comments/${id}`);
  return res.data;
};

// Compatibility
export const checkCompatibility = async (fishIds: string[]) => {
  const res = await api.post('/compatibility/check', { fishIds });
  return res.data;
};

// Bookmarks
export const fetchBookmarks = async () => {
  const res = await api.get('/bookmarks');
  return res.data;
};

export const toggleBookmark = async (payload: { itemType: string; itemId: string }) => {
  const res = await api.post('/bookmarks', payload);
  return res.data;
};

// Settings
export const fetchSettings = async () => {
  const res = await api.get('/settings');
  return res.data;
};

export const updateSettings = async (payload: any) => {
  const res = await api.put('/settings', payload);
  return res.data;
};

// Newsletter
export const subscribeNewsletter = async (email: string) => {
  const res = await api.post('/newsletter/subscribe', { email });
  return res.data;
};

