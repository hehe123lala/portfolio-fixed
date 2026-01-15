import React from 'react';

export interface WatchFace {
  id: number;
  name: string;
  style: string;
  imageUrl: string;
}

export interface HealthMetric {
  title: string;
  value: string;
  unit: string;
  color: string;
  icon: React.ReactNode;
  data: number[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  thumbnail: string;
}

export interface Feedback {
  id: string;
  targetId: string; // 'general' or project id
  author: string;
  rating: number;
  comment: string;
  date: string;
}