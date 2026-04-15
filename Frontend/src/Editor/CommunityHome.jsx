import React, { useEffect, useState } from 'react';
// import AnimationWrapper from '../Animation/AnimationWrapper';
import InPageNavigation from '../Components/Editor/InPageNavigation';
import Blogcard from '../Components/Editor/BlogCard.jsx';
import TrendingBlogcard from '../Components/Editor/TrendingBlogCard.jsx';
// import FilterPaginationData from '../Components/FliterPaginationData';

function CommunityHome() {
  const [blogs, setBlogs] = useState([]); // To store blogs
  const [specificBlogs, setSpecificBlogs] = useState([]); // For specific category blogs
  const [trendingBlogs, setTrendingBlogs] = useState([]); // For trending blogs
  const [selectedCategory, setSelectedCategory] = useState(""); // Selected category
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [totalDocs, setTotalDocs] = useState(0); // To track total document count for pagination
  const [page, setPage] = useState(1); // Pagination state for all blogs
  const [specificPage, setSpecificPage] = useState(1); // Pagination state for specific category blogs
  const [totalSpecificDocs, setTotalSpecificDocs] = useState(0); // Total document count for specific category blogs

const categories = [
  "Dog Breeds", 
  "Dog Training", 
  "Dog Health & Nutrition",
  "Dog Grooming",
  "Dog Behavior",
  "Dog Adoption & Rescue",
  "Service Dogs",
  "Dog Sports & Activities",
  "Dog Products & Gear",
  "Puppy Care",
  "Senior Dog Care",
  "Dog-Friendly Travel"
];

  // Fetching blogs with pagination
  const getBlog = async () => {
    try {
      setIsLoading(true); // Start loading
      const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/blog/getBlog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ page }) // Send the current page to the server
      });

      const resData = await response.json();
      console.log(resData);
      if (resData && resData.data) {
        setBlogs(resData.data); // Append new data to existing blogs
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  // Fetching blogs for a specific category
  const getSpecificBlog = async (category) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/blog/getSpecificTag`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category }) 
      });
      const resData = await response.json();
      if (resData.success && resData.data) {
        setSpecificBlogs(resData.data);
      }
    } catch (err) {
      console.error("Error fetching specific blogs:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetching trending blogs
  const getTrendingBlog = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/blog/trendingBlog`, {
        method: "GET",
      });
      const resData = await response.json();
      if (resData && resData.data) {
        setTrendingBlogs(resData.data); // Set the trending blogs
      }
    } catch (error) {
      console.error("Error fetching trending blogs:", error);
    }
  };

  useEffect(() => {
    if (selectedCategory) {
      setIsLoading(true);
      setSpecificBlogs([]); // Clear previous specific blogs when category changes
      setSpecificPage(1); // Reset specificPage when the category changes
      getSpecificBlog(selectedCategory).finally(() => setIsLoading(false));
    }
  }, [selectedCategory]);
  
  useEffect(()=>{
    getBlog();
    getTrendingBlog();
  },[])

  return (
    // <AnimationWrapper>
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-white to-orange-100">
        <div className="flex flex-col lg:flex-row max-w-7xl mx-auto">
            <section className="flex-1 lg:pr-8">
                <div className="px-6 py-8">
                    <InPageNavigation 
                        routes={selectedCategory ? [selectedCategory] : ["Home", "Trending Blogs"]} 
                        defaultHidden={["Trending Blogs"]}
                    >
                        {isLoading ? (
                            <div className="flex justify-center items-center h-96">
                                <div className="relative">
                                    <div className="w-20 h-20 border-4 border-orange-200 border-solid rounded-full animate-spin"></div>
                                    <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-orange-500 border-solid rounded-full animate-spin"></div>
                                </div>
                            </div>
                        ) : (
                            <>
                                {selectedCategory ? (
                                    <>
                                        {specificBlogs.length > 0 ? (
                                            <>
                                                <div className="mb-8">
                                                    <h1 className="text-4xl font-bold text-gray-800 mb-2 relative">
                                                        {selectedCategory}
                                                        <div className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
                                                    </h1>
                                                    <p className="text-gray-600 mt-4">Discover amazing stories in {selectedCategory.toLowerCase()}</p>
                                                </div>
                                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                                    {specificBlogs.map((blog, index) => (
                                                        // <AnimationWrapper key={index} transition={{ duration: 1, delay: index * 0.1 }}>
                                                            <Blogcard content={blog} author={blog.author} />
                                                        // </AnimationWrapper>
                                                    ))}
                                                </div>
                                            </>
                                        ) : (
                                            <div className="text-center py-16">
                                                <div className="w-24 h-24 mx-auto mb-6 bg-orange-100 rounded-full flex items-center justify-center">
                                                    <svg className="w-12 h-12 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                </div>
                                                <p className="text-xl text-gray-600">No blogs available in this category yet.</p>
                                                <p className="text-gray-500 mt-2">Be the first to share your story!</p>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <div className="mb-8">
                                            <h1 className="text-4xl font-bold text-gray-800 mb-2 relative">
                                                Latest Stories
                                                <div className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
                                            </h1>
                                            <p className="text-gray-600 mt-4">Fresh perspectives and inspiring stories from our community</p>
                                        </div>
                                        {blogs.length > 0 ? (
                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                                {blogs.map((blog, index) => (
                                                    // <AnimationWrapper key={index} transition={{ duration: 1, delay: index * 0.1 }}>
                                                        <Blogcard content={blog} author={blog.author} />
                                                    // </AnimationWrapper>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center py-16">
                                                <div className="w-24 h-24 mx-auto mb-6 bg-orange-100 rounded-full flex items-center justify-center">
                                                    <svg className="w-12 h-12 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                </div>
                                                <p className="text-xl text-gray-600">No blogs available at the moment.</p>
                                                <p className="text-gray-500 mt-2">Check back soon for new content!</p>
                                            </div>
                                        )}
                                    </>
                                )}
                            </>
                        )}
                        
                        {/* Trending Blogs */}
                        <div className="pt-8">
                            <div className="mb-8">
                                <h1 className="text-4xl font-bold text-gray-800 mb-2 relative">
                                    🔥 Trending Now
                                    <div className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
                                </h1>
                                <p className="text-gray-600 mt-4">Most popular stories this week</p>
                            </div>
                            {trendingBlogs.length > 0 ? (
                                <div className="space-y-6">
                                    {trendingBlogs.map((blog, index) => (
                                        // <AnimationWrapper key={index} transition={{ duration: 1, delay: index * 0.1 }}>
                                            <TrendingBlogcard content={blog} author={blog.author} index={index} />
                                        // </AnimationWrapper>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-16">
                                    <div className="w-24 h-24 mx-auto mb-6 bg-orange-100 rounded-full flex items-center justify-center">
                                        <svg className="w-12 h-12 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                        </svg>
                                    </div>
                                    <p className="text-xl text-gray-600">No trending blogs available at the moment.</p>
                                </div>
                            )}
                        </div>
                    </InPageNavigation>
                </div>
            </section>
            
            <aside className="lg:w-96 bg-white lg:border-l border-orange-200">
                <div className="sticky top-0 p-6">
                    <div className="hidden lg:block mb-8">
                        <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 rounded-2xl p-6 text-white mb-6">
                            <h2 className="text-2xl font-bold mb-2">Explore Topics</h2>
                            <p className="text-orange-100">Discover stories from all interests</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                            {categories.map((category, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setSelectedCategory(category);
                                        setSpecificBlogs([]);
                                    }}
                                    className={`p-3 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                                        selectedCategory === category
                                            ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                                            : 'bg-orange-50 text-orange-700 hover:bg-orange-100 border border-orange-200'
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                        
                        {selectedCategory && (
                            <button
                                onClick={() => {
                                    setSelectedCategory("");
                                    setSpecificBlogs([]);
                                }}
                                className="w-full mt-4 p-3 rounded-xl glass-solid/30 text-gray-700 hover:bg-gray-200 transition-all duration-300 font-medium"
                            >
                                ← Back to All Stories
                            </button>
                        )}
                    </div>
                    
                    <div className="bg-orange-50 rounded-2xl p-6 border border-orange-200">
                        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                            <span className="mr-2">🔥</span>
                            Hot This Week
                        </h3>
                        {trendingBlogs.slice(0, 3).length > 0 ? (
                            <div className="space-y-4">
                                {trendingBlogs.slice(0, 3).map((blog, index) => (
                                    <div 
                                        key={index}
                                        onClick={() => navigate(`/blog/${blog.blog_id}`)}
                                        className="cursor-pointer p-4 bg-white rounded-xl hover:shadow-md transition-all duration-300 border border-orange-100"
                                    >
                                        <div className="flex items-start gap-3">
                                            <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                                {index + 1}
                                            </span>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-semibold text-gray-800 text-sm line-clamp-2 mb-1">
                                                    {blog.title}
                                                </h4>
                                                <p className="text-xs text-gray-600 flex items-center">
                                                    <svg className="w-3 h-3 mr-1 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                                    </svg>
                                                    {blog.activity.total_likes}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-600 text-sm">No trending blogs yet.</p>
                        )}
                    </div>
                </div>
            </aside>
        </div>
    </div>
    // </AnimationWrapper>
  );
}

export default CommunityHome;
