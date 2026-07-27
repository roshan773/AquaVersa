import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchFishBySlug, fetchComments, postComment } from '../services/api';
import { 
  Heart, Grid, Activity, BookOpen, AlertTriangle, HelpCircle, Layers,
  Compass, ArrowLeft, Send, Flame
} from 'lucide-react';

export const FishDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const queryClient = useQueryClient();
  const [commentName, setCommentName] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [commentSuccess, setCommentSuccess] = useState(false);

  // Fetch Fish Detail
  const { data: fishData, isLoading, error } = useQuery({
    queryKey: ['fish-detail', slug],
    queryFn: () => fetchFishBySlug(slug || '')
  });

  const fish = fishData?.fish;
  const related = fishData?.related || [];

  // Fetch comments
  const { data: comments = [] } = useQuery({
    queryKey: ['comments', fish?._id],
    queryFn: () => fetchComments({ targetType: 'fish', targetId: fish?._id, approvedOnly: 'true' }),
    enabled: !!fish?._id
  });

  // Submit comment mutation
  const submitCommentMutation = useMutation({
    mutationFn: postComment,
    onSuccess: () => {
      setCommentSuccess(true);
      setCommentContent('');
      setCommentName('');
      setTimeout(() => setCommentSuccess(false), 4000);
      queryClient.invalidateQueries({ queryKey: ['comments', fish?._id] });
    }
  });

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentName.trim() && commentContent.trim() && fish?._id) {
      submitCommentMutation.mutate({
        userName: commentName.trim(),
        content: commentContent.trim(),
        targetType: 'fish',
        targetId: fish._id
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-3 text-sky-400 font-bold">
        <Compass className="h-8 w-8 animate-spin" />
        <span>Loading species profile...</span>
      </div>
    );
  }

  if (error || !fish) {
    return (
      <div className="max-w-md mx-auto text-center py-20 space-y-4">
        <AlertTriangle className="h-12 w-12 text-rose-400 mx-auto animate-pulse" />
        <h3 className="text-xl font-extrabold text-slate-100">Species Profile Not Found</h3>
        <p className="text-xs text-slate-400 font-semibold">The species you are searching for does not exist in our encyclopedia.</p>
        <Link to="/fish" className="inline-block px-5 py-2.5 bg-sky-500 hover:bg-sky-600 text-slate-950 rounded-xl text-xs font-bold transition-colors">
          Back to Encyclopedia
        </Link>
      </div>
    );
  }

  const difficultyColors: Record<string, string> = {
    Beginner: 'border-emerald-500/20 text-emerald-400 bg-emerald-500/5',
    Intermediate: 'border-sky-500/20 text-sky-400 bg-sky-500/5',
    Advanced: 'border-amber-500/20 text-amber-400 bg-amber-500/5',
  };

  const temperamentColors: Record<string, string> = {
    Peaceful: 'border-sky-500/20 text-sky-400 bg-sky-500/5',
    'Semi-aggressive': 'border-orange-500/20 text-orange-400 bg-orange-500/5',
    Aggressive: 'border-rose-500/20 text-rose-400 bg-rose-500/5',
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Breadcrumb & Back */}
      <div className="flex items-center space-x-2 text-xs text-slate-500 font-bold uppercase tracking-wider">
        <Link to="/fish" className="hover:text-sky-400 transition-colors flex items-center space-x-1">
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Directory</span>
        </Link>
        <span>/</span>
        <span className="text-slate-400">{fish.commonName}</span>
      </div>

      {/* Main Header Banner Card */}
      <div className="glass rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-8">
        
        {/* Left: Image Container */}
        <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800/80">
          <img
            src={fish.images?.[0] || 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=600'}
            alt={fish.commonName}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Right: Info */}
        <div className="flex flex-col justify-between py-2 space-y-6">
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className={`text-[10px] font-extrabold px-3 py-1.5 rounded-lg border tracking-wider uppercase ${difficultyColors[fish.difficulty] || 'bg-slate-850 border-slate-700'}`}>
                {fish.difficulty} Care Level
              </span>
              <span className={`text-[10px] font-extrabold px-3 py-1.5 rounded-lg border tracking-wider uppercase ${temperamentColors[fish.temperament] || 'bg-slate-850 border-slate-700'}`}>
                {fish.temperament}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-100 leading-none">
              {fish.commonName}
            </h1>
            <p className="text-xs italic text-slate-400 font-semibold mt-2.5">
              {fish.scientificName} &bull; Family: {fish.family} &bull; Origin: {fish.origin}
            </p>
          </div>

          {/* Quick Facts Card */}
          <div className="grid grid-cols-2 gap-4 border-t border-b border-slate-800/80 py-4">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-400/20">
                <Grid className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Min Tank Size</p>
                <p className="text-sm font-extrabold text-slate-100">{fish.minTankSize?.gallons} Gal / {fish.minTankSize?.liters} L</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-400/20">
                <Heart className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Average Lifespan</p>
                <p className="text-sm font-extrabold text-slate-100">{fish.lifespan} Years</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-400/20">
                <Activity className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Adult Size</p>
                <p className="text-sm font-extrabold text-slate-100">{fish.adultSize?.inches}" / {fish.adultSize?.cm} cm</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-400/20">
                <Layers className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Swim Level</p>
                <p className="text-sm font-extrabold text-slate-100 capitalize">{fish.swimmingLevel?.join(', ')}</p>
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-400 font-semibold">
            <span className="font-bold text-slate-200">Activity Level:</span> {fish.activityLevel} &bull; <span className="font-bold text-slate-200">Water Type:</span> {fish.waterParams?.waterType}
          </div>

        </div>
      </div>

      {/* Overview, Tips and Breeding Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left columns - Care Detail */}
        <div className="lg:col-span-2 space-y-8">
          
          <section className="glass rounded-2xl p-6 space-y-4">
            <h2 className="text-xl font-bold flex items-center space-x-2 text-sky-400">
              <HelpCircle className="h-5 w-5 text-sky-400" />
              <span>Why is it Care Level: {fish.difficulty}?</span>
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed font-semibold">
              {fish.rationales}
            </p>
          </section>

          <section className="glass rounded-2xl p-6 space-y-4">
            <h2 className="text-xl font-bold flex items-center space-x-2 text-sky-400">
              <BookOpen className="h-5 w-5 text-sky-400" />
              <span>Care Instructions & Guidelines</span>
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed font-semibold whitespace-pre-line">
              {fish.careTips}
            </p>
          </section>

          <section className="glass rounded-2xl p-6 space-y-4">
            <h2 className="text-xl font-bold text-sky-400">Breeding System Guide</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-sm font-semibold">
                <span className="text-[10px] text-slate-500 uppercase block mb-1">Spawning Mode</span>
                <span className="text-slate-200">{fish.breedingNotes?.mechanism}</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-sm font-semibold">
                <span className="text-[10px] text-slate-500 uppercase block mb-1">Breeding Difficulty</span>
                <span className="text-slate-200">{fish.breedingNotes?.difficulty}</span>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed font-semibold pt-2">
              {fish.breedingNotes?.details}
            </p>
          </section>

          {/* Interesting Facts */}
          {fish.interestingFacts?.length > 0 && (
            <section className="glass rounded-2xl p-6 space-y-4">
              <h2 className="text-xl font-bold text-sky-400 flex items-center space-x-2">
                <Flame className="h-5 w-5 text-sky-400 animate-pulse" />
                <span>Did You Know?</span>
              </h2>
              <ul className="list-disc list-inside space-y-2 text-sm text-slate-300 font-semibold leading-relaxed">
                {fish.interestingFacts.map((fact: string, index: number) => (
                  <li key={index}>{fact}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Dynamic comments */}
          <section className="glass rounded-2xl p-6 space-y-6">
            <h3 className="text-xl font-bold text-slate-100">Discussion & Comments</h3>
            
            <form onSubmit={handleCommentSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={commentName}
                  onChange={(e) => setCommentName(e.target.value)}
                  className="bg-slate-950/60 border border-slate-700/60 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-sky-400 font-semibold"
                  required
                />
              </div>
              <textarea
                placeholder="Share your experience or ask a question about this species..."
                rows={4}
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                className="w-full bg-slate-950/60 border border-slate-700/60 rounded-xl px-4 py-3 text-xs text-slate-200 focus:outline-none focus:border-sky-400 font-semibold"
                required
              />
              <button
                type="submit"
                disabled={submitCommentMutation.isPending}
                className="px-6 py-2.5 bg-sky-500 hover:bg-sky-600 disabled:opacity-50 text-slate-950 font-bold rounded-xl text-xs flex items-center space-x-2 cursor-pointer transition-colors"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Submit Comment</span>
              </button>
            </form>

            {commentSuccess && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs font-bold">
                Comment submitted successfully! It will appear on the website once approved by the administrator.
              </div>
            )}

            {/* List comments */}
            <div className="space-y-4 pt-4 border-t border-slate-800/80">
              {comments.length > 0 ? (
                comments.map((comment: any) => (
                  <div key={comment._id} className="p-4 bg-slate-950/20 border border-slate-800/60 rounded-xl space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-sky-400">{comment.userName}</span>
                      <span className="text-[10px] text-slate-500 font-semibold">{new Date(comment.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-semibold">{comment.content}</p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-500 font-semibold italic text-center py-4">No comments posted yet. Be the first to share your thoughts!</p>
              )}
            </div>

          </section>

        </div>

        {/* Right columns - Gauges & Compatibility parameters */}
        <div className="space-y-8">
          
          {/* Water parameters gauges */}
          <section className="glass rounded-2xl p-6 space-y-6">
            <h3 className="text-lg font-extrabold border-b border-slate-800/80 pb-3 text-slate-100">Water Parameters</h3>
            
            {/* pH gauge */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span>Acidity (pH)</span>
                <span className="text-sky-400">{fish.waterParams?.phMin} - {fish.waterParams?.phMax}</span>
              </div>
              <div className="relative h-2.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="absolute h-full bg-gradient-to-r from-sky-400 to-emerald-400 rounded-full"
                  style={{ 
                    left: `${((fish.waterParams?.phMin || 6) / 14) * 100}%`,
                    width: `${(((fish.waterParams?.phMax || 8) - (fish.waterParams?.phMin || 6)) / 14) * 100}%` 
                  }}
                />
              </div>
              <div className="flex justify-between text-[9px] text-slate-500 font-bold uppercase tracking-wider">
                <span>0 (Acidic)</span>
                <span>7 (Neutral)</span>
                <span>14 (Alkaline)</span>
              </div>
            </div>

            {/* Temp gauge */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span>Temperature (°C)</span>
                <span className="text-sky-400">{fish.waterParams?.tempMin}°C - {fish.waterParams?.tempMax}°C</span>
              </div>
              <div className="relative h-2.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="absolute h-full bg-gradient-to-r from-sky-400 to-emerald-400 rounded-full"
                  style={{ 
                    left: `${(((fish.waterParams?.tempMin || 20) - 10) / 25) * 100}%`,
                    width: `${(((fish.waterParams?.tempMax || 28) - (fish.waterParams?.tempMin || 20)) / 25) * 100}%` 
                  }}
                />
              </div>
              <div className="flex justify-between text-[9px] text-slate-500 font-bold uppercase tracking-wider">
                <span>10°C</span>
                <span>22°C</span>
                <span>35°C</span>
              </div>
            </div>

            {/* Hardness */}
            <div className="flex justify-between text-sm font-semibold border-t border-slate-800/80 pt-4 text-slate-300">
              <span className="text-slate-400">Water Hardness</span>
              <span>{fish.waterParams?.dghMin} - {fish.waterParams?.dghMax} dGH</span>
            </div>

            {/* Diet type */}
            <div className="flex justify-between text-sm font-semibold border-t border-slate-800/80 pt-4 text-slate-300">
              <span className="text-slate-400">Dietary Classification</span>
              <span className="capitalize">{fish.dietType}</span>
            </div>

            <div className="space-y-2 text-xs font-semibold text-slate-400 pt-2">
              <span className="block text-slate-200 font-bold">Food Recommendations:</span>
              <ul className="list-disc list-inside space-y-1">
                {fish.foodRecommendations?.map((food: string, idx: number) => (
                  <li key={idx} className="capitalize">{food}</li>
                ))}
              </ul>
              <p className="text-[10px] text-slate-500 italic mt-2">Feeding Frequency: {fish.feedingFrequency}</p>
            </div>

          </section>

          {/* Compatible Mates */}
          <section className="glass rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-extrabold border-b border-slate-800/80 pb-3 text-slate-100">Compatible Mates</h3>
            {fish.compatibleMates?.length > 0 ? (
              <div className="flex flex-wrap gap-2 pt-2">
                {fish.compatibleMates.map((mate: any) => (
                  <Link
                    key={mate._id}
                    to={`/fish/${mate.slug}`}
                    className="text-xs font-bold px-3.5 py-2 rounded-xl border border-slate-700/60 bg-slate-900/30 hover:bg-sky-500/10 hover:text-sky-400 hover:border-sky-400/30 transition-all"
                  >
                    {mate.commonName}
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 font-semibold italic">Requires species-only community setup.</p>
            )}
          </section>

          {/* Incompatible Mates */}
          {fish.notCompatibleMates?.length > 0 && (
            <section className="glass rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-extrabold border-b border-slate-800/80 pb-3 text-slate-100">Incompatible Fish</h3>
              <div className="flex flex-wrap gap-2 pt-2">
                {fish.notCompatibleMates.map((mate: any) => (
                  <Link
                    key={mate._id}
                    to={`/fish/${mate.slug}`}
                    className="text-xs font-bold px-3.5 py-2 rounded-xl border border-rose-500/20 bg-rose-500/5 text-rose-400 hover:bg-rose-500/10 transition-all"
                  >
                    {mate.commonName}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Ideal Plants */}
          {fish.idealPlants?.length > 0 && (
            <section className="glass rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-extrabold border-b border-slate-800/80 pb-3 text-slate-100">Ideal Live Plants</h3>
              <div className="flex flex-wrap gap-2 pt-2">
                {fish.idealPlants.map((plant: any) => (
                  <Link
                    key={plant._id}
                    to={`/plants/${plant.slug}`}
                    className="text-xs font-bold px-3.5 py-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 hover:bg-emerald-500/10 transition-all"
                  >
                    {plant.name}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Prone Diseases */}
          <section className="glass rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-extrabold border-b border-slate-800/80 pb-3 flex items-center space-x-2 text-slate-100">
              <AlertTriangle className="h-5 w-5 text-rose-400" />
              <span>Susceptible Diseases</span>
            </h3>
            {fish.proneDiseases?.length > 0 ? (
              <div className="space-y-3">
                {fish.proneDiseases.map((dis: any) => (
                  <div key={dis._id} className="p-3 bg-slate-950/20 border border-slate-800/60 rounded-xl space-y-1 text-xs">
                    <Link to={`/diseases/${dis.slug}`} className="font-bold text-rose-400 hover:underline">
                      {dis.name}
                    </Link>
                    <p className="text-[10px] text-slate-400 leading-normal font-semibold">
                      <span className="font-bold text-slate-200">Treatment:</span> {dis.treatment}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 font-semibold italic">No recorded disease profiles available.</p>
            )}
          </section>

        </div>
      </div>

      {/* Vet Disclaimer */}
      <div className="p-5 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-start space-x-3 text-amber-500 font-semibold">
        <AlertTriangle className="h-6 w-6 flex-shrink-0 mt-0.5" />
        <div className="text-xs space-y-1 leading-relaxed">
          <h4 className="font-bold text-sm">Educational and Care Guide Disclaimer</h4>
          <p>
            The care information, chemical dosages, and treatment instructions provided on this site are for educational reference purposes only. They are not prescriptive diagnostic protocols. Always consult a veterinary professional before dosing.
          </p>
        </div>
      </div>

      {/* FAQs */}
      {fish.faq?.length > 0 && (
        <section className="space-y-6 pt-6">
          <h3 className="text-2xl font-black text-slate-100">Frequently Asked Questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fish.faq.map((item: any, idx: number) => (
              <div key={idx} className="glass rounded-xl p-5 space-y-2">
                <h4 className="font-bold text-sm text-sky-400 flex items-start space-x-2">
                  <span className="bg-sky-500/10 text-sky-400 px-2 py-0.5 rounded text-[10px]">Q</span>
                  <span>{item.question}</span>
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed font-semibold pl-6">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related Fish */}
      {related.length > 0 && (
        <section className="space-y-6 pt-6">
          <h3 className="text-2xl font-black text-slate-100">You Might Also Like</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map((item: any) => (
              <Link key={item._id} to={`/fish/${item.slug}`} className="group">
                <div className="glass rounded-2xl overflow-hidden block hover:scale-[1.03] transition-transform duration-300 flex flex-col h-full bg-slate-950/20">
                  <div className="relative h-28 overflow-hidden bg-slate-900 border-b border-slate-800/80">
                    <img
                      src={item.images?.[0] || 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&q=80&w=200'}
                      alt={item.commonName}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3.5 flex-grow flex flex-col justify-between">
                    <h4 className="font-bold text-xs text-slate-200 group-hover:text-sky-400 transition-colors line-clamp-2 leading-snug">
                      {item.commonName}
                    </h4>
                    <span className="text-[9px] font-extrabold uppercase text-sky-400 mt-2 block">
                      {item.difficulty}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
export default FishDetail;
