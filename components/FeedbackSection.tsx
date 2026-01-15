
import React, { useState, useEffect } from 'react';
import { Feedback } from '../types';
import { StarRating } from './StarRating';
import { MessageSquare, User } from 'lucide-react';

interface FeedbackSectionProps {
  targetId: string;
}

export const FeedbackSection: React.FC<FeedbackSectionProps> = ({ targetId }) => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('portfolio_feedback');
    if (saved) {
      const all: Feedback[] = JSON.parse(saved);
      setFeedbacks(all.filter(f => f.targetId === targetId));
    }
  }, [targetId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    setIsSubmitting(true);
    
    // Simulate API delay
    setTimeout(() => {
      const newFeedback: Feedback = {
        id: Date.now().toString(),
        targetId,
        author: name,
        rating,
        comment,
        date: new Date().toLocaleDateString('zh-CN'),
      };

      const saved = localStorage.getItem('portfolio_feedback');
      const all: Feedback[] = saved ? JSON.parse(saved) : [];
      const updatedAll = [newFeedback, ...all];
      localStorage.setItem('portfolio_feedback', JSON.stringify(updatedAll));

      setFeedbacks([newFeedback, ...feedbacks]);
      setName('');
      setComment('');
      setRating(5);
      setIsSubmitting(false);
    }, 600);
  };

  const averageRating = feedbacks.length 
    ? (feedbacks.reduce((acc, curr) => acc + curr.rating, 0) / feedbacks.length).toFixed(1)
    : '5.0';

  return (
    <div className="mt-20 border-t border-gray-100 pt-16">
      <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-8">
        <div className="space-y-4">
          <h3 className="text-3xl font-bold flex items-center gap-3">
            <MessageSquare className="text-purple-brand" />
            用户评价与反馈
          </h3>
          <p className="text-gray-500">您的反馈是我不断进步的动力，欢迎留下真实的建议。</p>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6">
          <div className="text-center">
            <div className="text-4xl font-black text-purple-brand">{averageRating}</div>
            <div className="text-[10px] uppercase font-bold text-gray-400 tracking-tighter">平均得分</div>
          </div>
          <div className="h-10 w-px bg-gray-100"></div>
          <div>
            <StarRating rating={Math.round(Number(averageRating))} />
            <div className="text-xs text-gray-400 mt-1 font-bold">共 {feedbacks.length} 条评价</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Feedback Form */}
        <div className="lg:col-span-1">
          <form onSubmit={handleSubmit} className="bg-cream p-8 rounded-[2rem] space-y-6 sticky top-28">
            <h4 className="text-xl font-bold mb-4">留下您的评价</h4>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">评分</label>
              <StarRating rating={rating} interactive onRatingChange={setRating} size={24} />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">您的称呼</label>
              <input 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="例如：张先生" 
                className="w-full px-5 py-3 rounded-xl border-none bg-white shadow-sm focus:ring-2 focus:ring-purple-brand outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">评价内容</label>
              <textarea 
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                placeholder="这个设计非常精致..." 
                className="w-full px-5 py-3 rounded-xl border-none bg-white shadow-sm focus:ring-2 focus:ring-purple-brand outline-none resize-none"
                required
              />
            </div>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-purple-brand text-white py-4 rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-50"
            >
              {isSubmitting ? '正在提交...' : '提交评价'}
            </button>
          </form>
        </div>

        {/* Feedback List */}
        <div className="lg:col-span-2 space-y-6">
          {feedbacks.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center bg-gray-50 rounded-[2.5rem] border-2 border-dashed border-gray-200">
               <p className="text-gray-400 font-medium italic">暂无评价，快来成为第一个留下足迹的人吧！</p>
            </div>
          ) : (
            feedbacks.map((f) => (
              <div key={f.id} className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-50 hover:shadow-md transition-shadow animate-in slide-in-from-bottom-4 duration-500">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-brand/10 rounded-full flex items-center justify-center text-purple-brand">
                      <User size={24} />
                    </div>
                    <div>
                      <h5 className="font-bold text-gray-900">{f.author}</h5>
                      <p className="text-xs text-gray-400 font-medium">{f.date}</p>
                    </div>
                  </div>
                  <StarRating rating={f.rating} />
                </div>
                <p className="text-gray-600 leading-relaxed pl-16">
                  {f.comment}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
