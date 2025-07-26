import React from "react";

export default function NewsShimmer() {
  return (
    <div className="flex space-x-4 overflow-hidden">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex-shrink-0 w-80">
          <div className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-xl p-4 h-48">
            {/* Category badge placeholder */}
            <div className="flex items-center justify-between mb-3">
              <div className="h-5 w-16 bg-gray-200 dark:bg-slate-700 rounded animate-pulse" />
              <div className="h-5 w-12 bg-gray-200 dark:bg-slate-700 rounded animate-pulse" />
            </div>
            
            {/* Title placeholder */}
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded animate-pulse" />
              <div className="h-4 w-4/5 bg-gray-200 dark:bg-slate-700 rounded animate-pulse" />
            </div>
            
            {/* Content placeholder */}
            <div className="space-y-2 mb-4 flex-grow">
              <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded animate-pulse" />
              <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded animate-pulse" />
              <div className="h-3 w-3/4 bg-gray-200 dark:bg-slate-700 rounded animate-pulse" />
            </div>
            
            {/* Footer placeholder */}
            <div className="flex items-center justify-between mb-3">
              <div className="h-3 w-20 bg-gray-200 dark:bg-slate-700 rounded animate-pulse" />
              <div className="h-3 w-16 bg-gray-200 dark:bg-slate-700 rounded animate-pulse" />
            </div>
            
            {/* Button placeholder */}
            <div className="h-8 bg-gray-200 dark:bg-slate-700 rounded animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}