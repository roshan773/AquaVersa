import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  fetchComments, updateComment, deleteComment,
  fetchFishes, deleteFish, createFish,
  fetchPlants, deletePlant, createPlant,
  fetchEquipment, deleteEquipment
} from '../services/api';
import { MessageSquare, Check, Trash, Plus, ShieldAlert, LogOut, Compass, Grid, Wrench, Leaf } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { logout, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<'comments' | 'fish' | 'plants' | 'equipment'>('comments');

  // Form states for creating new records
  const [newFishName, setNewFishName] = useState('');
  const [newFishSci, setNewFishSci] = useState('');
  const [newFishImage, setNewFishImage] = useState('');
  const [newPlantName, setNewPlantName] = useState('');
  const [newPlantSci, setNewPlantSci] = useState('');
  const [newPlantImage, setNewPlantImage] = useState('');

  // 1. Comments list
  const { data: comments = [], isLoading: isCommentsLoading } = useQuery({
    queryKey: ['admin-comments'],
    queryFn: () => fetchComments({ approvedOnly: 'false' }) // Fetch both approved and unapproved
  });

  // Approve comment mutation
  const approveCommentMutation = useMutation({
    mutationFn: (id: string) => updateComment(id, { isApproved: true }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-comments'] });
    }
  });

  // Delete comment mutation
  const deleteCommentMutation = useMutation({
    mutationFn: (id: string) => deleteComment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-comments'] });
    }
  });

  // 2. Fish List
  const { data: fishData, isLoading: isFishLoading } = useQuery({
    queryKey: ['admin-fish'],
    queryFn: () => fetchFishes({ limit: 100 })
  });
  const fishes = fishData?.fishes || [];

  const deleteFishMutation = useMutation({
    mutationFn: (id: string) => deleteFish(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-fish'] });
    }
  });

  const createFishMutation = useMutation({
    mutationFn: createFish,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-fish'] });
      setNewFishName('');
      setNewFishSci('');
      setNewFishImage('');
    }
  });

  // 3. Plants List
  const { data: plants = [], isLoading: isPlantsLoading } = useQuery({
    queryKey: ['admin-plants'],
    queryFn: () => fetchPlants()
  });

  const deletePlantMutation = useMutation({
    mutationFn: (id: string) => deletePlant(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-plants'] });
    }
  });

  const createPlantMutation = useMutation({
    mutationFn: createPlant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-plants'] });
      setNewPlantName('');
      setNewPlantSci('');
      setNewPlantImage('');
    }
  });

  // 4. Equipment List
  const { data: equipment = [], isLoading: isEquipLoading } = useQuery({
    queryKey: ['admin-equipment'],
    queryFn: () => fetchEquipment()
  });

  const deleteEquipMutation = useMutation({
    mutationFn: (id: string) => deleteEquipment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-equipment'] });
    }
  });

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const handleAddFish = (e: React.FormEvent) => {
    e.preventDefault();
    if (newFishName && newFishSci) {
      createFishMutation.mutate({
        commonName: newFishName,
        scientificName: newFishSci,
        slug: newFishName.toLowerCase().replace(/\s+/g, '-'),
        family: 'Characidae',
        difficulty: 'Beginner',
        temperament: 'Peaceful',
        lifespan: 5,
        dietType: 'Omnivore',
        minTankSize: { liters: 38, gallons: 10 },
        waterParams: { tempMin: 22, tempMax: 26, phMin: 6.5, phMax: 7.2, dghMin: 4, dghMax: 12, waterType: 'Freshwater' },
        images: newFishImage ? [newFishImage] : ['https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&q=80&w=600']
      });
    }
  };

  const handleAddPlant = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPlantName && newPlantSci) {
      createPlantMutation.mutate({
        name: newPlantName,
        scientificName: newPlantSci,
        slug: newPlantName.toLowerCase().replace(/\s+/g, '-'),
        category: 'Midground',
        difficulty: 'Easy',
        co2Needs: false,
        lightingNeeds: 'Low',
        growthRate: 'Slow',
        description: 'Hardy plant created via dashboard.',
        images: newPlantImage ? [newPlantImage] : ['https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=600']
      });
    }
  };

  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto text-center py-20 space-y-4">
        <ShieldAlert className="h-12 w-12 text-rose-500 mx-auto animate-pulse" />
        <h3 className="text-xl font-extrabold text-slate-100">Access Denied</h3>
        <p className="text-xs text-slate-400 font-semibold">Administrative permissions are required to view this control panel.</p>
        <Link to="/admin/login" className="inline-block px-5 py-2.5 bg-sky-500 hover:bg-sky-600 text-slate-950 rounded-xl text-xs font-bold transition-colors">
          Login Portal
        </Link>
      </div>
    );
  }

  const tabs = [
    { id: 'comments', label: 'Comment Moderation', icon: MessageSquare },
    { id: 'fish', label: 'Manage Fish Database', icon: Grid },
    { id: 'plants', label: 'Manage Plants', icon: Leaf },
    { id: 'equipment', label: 'Manage Equipment', icon: Wrench },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-semibold text-xs text-slate-350">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800/80 pb-6 gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-100 flex items-center space-x-2">
            <span>Fish Versa CMS Dashboard</span>
          </h1>
          <p className="text-slate-500">Manage directory databases, edit parameters, and moderate public discussion blocks.</p>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl hover:bg-rose-500/10 hover:text-rose-400 hover:border-rose-400/20 text-slate-400 font-bold transition-all flex items-center space-x-2 cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
          <span>Exit Dashboard</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800/60 pb-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl border transition-all cursor-pointer ${
                isActive
                  ? 'bg-sky-500 border-sky-400 text-slate-950 btn-glow-cyan'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-sky-400'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Content panels */}
      <div className="glass rounded-3xl p-6 bg-gradient-to-br from-slate-950 to-[#071224]/50 border border-slate-800/80 min-h-[300px]">
        
        {/* COMMENTS PANEL */}
        {activeTab === 'comments' && (
          <div className="space-y-6">
            <h3 className="text-base font-extrabold text-slate-200">Comment Moderation Queue</h3>
            {isCommentsLoading ? (
              <div className="flex items-center space-x-2 text-sky-400 py-10 font-bold justify-center">
                <Compass className="h-5 w-5 animate-spin" />
                <span>Loading moderation queue...</span>
              </div>
            ) : comments.length > 0 ? (
              <div className="space-y-4">
                {comments.map((comment: any) => (
                  <div key={comment._id} className="p-4 bg-slate-950/20 border border-slate-850 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-extrabold text-sky-400 text-sm">{comment.userName}</span>
                        {!comment.isApproved && (
                          <span className="text-[9px] font-bold px-2 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded">
                            Awaiting Approval
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-300 leading-normal">{comment.content}</p>
                      <span className="text-[10px] text-slate-500 block uppercase">Target: {comment.targetType} ({comment.targetId})</span>
                    </div>

                    <div className="flex space-x-2">
                      {!comment.isApproved && (
                        <button
                          onClick={() => approveCommentMutation.mutate(comment._id)}
                          className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500 hover:text-slate-950 text-emerald-400 rounded-xl transition-all cursor-pointer"
                          title="Approve Comment"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteCommentMutation.mutate(comment._id)}
                        className="p-2.5 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500 hover:text-slate-950 text-rose-400 rounded-xl transition-all cursor-pointer"
                        title="Delete Comment"
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 italic text-center py-10">All clean! The moderation queue is empty.</p>
            )}
          </div>
        )}

        {/* FISH PANEL */}
        {activeTab === 'fish' && (
          <div className="space-y-6">
            <h3 className="text-base font-extrabold text-slate-200">Manage Fish Database</h3>
            
            {/* Quick Add Fish */}
            <form onSubmit={handleAddFish} className="p-4 bg-slate-900/50 border border-slate-800 rounded-2xl grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Common Name</label>
                <input
                  type="text"
                  placeholder="Neon Tetra"
                  value={newFishName}
                  onChange={(e) => setNewFishName(e.target.value)}
                  className="w-full bg-slate-950/60 border border-slate-700/60 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-sky-400 font-semibold"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Scientific Name</label>
                <input
                  type="text"
                  placeholder="Paracheirodon innesi"
                  value={newFishSci}
                  onChange={(e) => setNewFishSci(e.target.value)}
                  className="w-full bg-slate-950/60 border border-slate-700/60 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-sky-400 font-semibold"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Image URL (Optional)</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={newFishImage}
                  onChange={(e) => setNewFishImage(e.target.value)}
                  className="w-full bg-slate-950/60 border border-slate-700/60 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-sky-400 font-semibold text-slate-200"
                />
              </div>
              <button
                type="submit"
                className="py-2.5 bg-sky-500 hover:bg-sky-600 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-colors btn-glow-cyan flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>Add Species</span>
              </button>
            </form>

            {isFishLoading ? (
              <p className="text-slate-500 text-center py-10">Loading catalog...</p>
            ) : fishes.length > 0 ? (
              <div className="divide-y divide-slate-800/60 space-y-3">
                {fishes.map((f: any) => (
                  <div key={f._id} className="pt-3 flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-slate-200 text-sm">{f.commonName}</h4>
                      <p className="text-[10px] text-slate-500 italic mt-0.5">{f.scientificName}</p>
                    </div>
                    <button
                      onClick={() => deleteFishMutation.mutate(f._id)}
                      className="p-2 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500 hover:text-slate-950 text-rose-400 rounded-lg transition-all cursor-pointer"
                    >
                      <Trash className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 italic text-center py-10">No records found.</p>
            )}
          </div>
        )}

        {/* PLANTS PANEL */}
        {activeTab === 'plants' && (
          <div className="space-y-6">
            <h3 className="text-base font-extrabold text-slate-200">Manage Plants</h3>

            {/* Quick Add Plant */}
            <form onSubmit={handleAddPlant} className="p-4 bg-slate-900/50 border border-slate-800 rounded-2xl grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Plant Name</label>
                <input
                  type="text"
                  placeholder="Java Fern"
                  value={newPlantName}
                  onChange={(e) => setNewPlantName(e.target.value)}
                  className="w-full bg-slate-950/60 border border-slate-700/60 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-sky-400 font-semibold"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Scientific Name</label>
                <input
                  type="text"
                  placeholder="Microsorum pteropus"
                  value={newPlantSci}
                  onChange={(e) => setNewPlantSci(e.target.value)}
                  className="w-full bg-slate-950/60 border border-slate-700/60 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-sky-400 font-semibold"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Image URL (Optional)</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={newPlantImage}
                  onChange={(e) => setNewPlantImage(e.target.value)}
                  className="w-full bg-slate-950/60 border border-slate-700/60 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-sky-400 font-semibold text-slate-200"
                />
              </div>
              <button
                type="submit"
                className="py-2.5 bg-sky-500 hover:bg-sky-600 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-colors btn-glow-cyan flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>Add Plant</span>
              </button>
            </form>

            {isPlantsLoading ? (
              <p className="text-slate-500 text-center py-10">Loading plants...</p>
            ) : plants.length > 0 ? (
              <div className="divide-y divide-slate-800/60 space-y-3">
                {plants.map((p: any) => (
                  <div key={p._id} className="pt-3 flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-slate-200 text-sm">{p.name}</h4>
                      <p className="text-[10px] text-slate-500 italic mt-0.5">{p.scientificName}</p>
                    </div>
                    <button
                      onClick={() => deletePlantMutation.mutate(p._id)}
                      className="p-2 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500 hover:text-slate-950 text-rose-400 rounded-lg transition-all cursor-pointer"
                    >
                      <Trash className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 italic text-center py-10">No records found.</p>
            )}
          </div>
        )}

        {/* EQUIPMENT PANEL */}
        {activeTab === 'equipment' && (
          <div className="space-y-6">
            <h3 className="text-base font-extrabold text-slate-200">Manage Equipment</h3>
            {isEquipLoading ? (
              <p className="text-slate-500 text-center py-10">Loading catalog...</p>
            ) : equipment.length > 0 ? (
              <div className="divide-y divide-slate-800/60 space-y-3">
                {equipment.map((e: any) => (
                  <div key={e._id} className="pt-3 flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-slate-200 text-sm">{e.name}</h4>
                      <p className="text-[10px] text-slate-500 mt-0.5">Brand: {e.brand} &bull; Category: {e.category}</p>
                    </div>
                    <button
                      onClick={() => deleteEquipMutation.mutate(e._id)}
                      className="p-2 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500 hover:text-slate-950 text-rose-400 rounded-lg transition-all cursor-pointer"
                    >
                      <Trash className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 italic text-center py-10">No records found.</p>
            )}
          </div>
        )}

      </div>

    </div>
  );
};
export default AdminDashboard;
