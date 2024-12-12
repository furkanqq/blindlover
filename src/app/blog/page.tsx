'use client';

import React, { useState } from 'react';

import AppLayout from '@/components/AppLayout';
import { BlogCard } from '@/components/BlogCard';
import { Container } from '@/components/Container';

const blogs = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: `Blog Title ${i + 1}`,
  description: `This is a description for Blog ${i + 1}.`,
  littleDescription: `Quick insight about Blog ${i + 1}.`,
  link: `/blog/${i + 1}`,
  image: `https://via.placeholder.com/300x200.png?text=Blog+${i + 1}`,
}));

const ITEMS_PER_PAGE = 12;

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(blogs.length / ITEMS_PER_PAGE);
  const currentBlogs = blogs.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <AppLayout type="landing" className="">
      <div className="">
        {/* Banner */}
        <div className="bg-[url(/heartPattern.png)] bg-cover flex flex-col justify-center items-center bg-transparent text-foreground text-center h-[400px] w-full">
          <h1 className="text-4xl font-bold">
            Welcome <span className="text-primaryColor">to</span> the <span className="text-primaryColor">Blog</span>
          </h1>
          <p className="text-md text-gray-500 mt-4">Explore the latest updates and insights</p>
        </div>

        {/* Blog Cards */}
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentBlogs.map((blog, index) => (
              <BlogCard
                key={index}
                title={blog.title}
                desc={blog.littleDescription}
                image={'/blog.png'}
                link={blog.link}
              />
            ))}
          </div>
        </Container>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-8 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded-md border transition duration-300 ${
                page === currentPage ? 'bg-primaryColor text-white' : 'bg-white text-primaryColor border-primaryColor'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
