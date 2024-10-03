'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input, Grid, Textarea, Button, FormControl, FormLabel, FormHelperText, Box } from '@mui/joy';
import { Paper } from '@mui/material';
import 'react-quill/dist/quill.snow.css';

// Dynamically import ReactQuill without SSR
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const BlogPostForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [content, setContent] = useState('');
  const [advancedOptions, setAdvancedOptions] = useState(false);
  const [featuredImage, setFeaturedImage] = useState(null);

  const categoryOptions = [
    { value: 'tech', label: 'Tech' },
    { value: 'lifestyle', label: 'Lifestyle' },
    { value: 'health', label: 'Health' },
  ];

  const tagOptions = [
    { value: 'react', label: 'React' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'css', label: 'CSS' },
  ];

  const onSubmit = (data) => {
    if (!content || content.trim() === '') {
      return alert('Content is required');
    }

    const formData = {
      ...data,
      content,
      featuredImage,
    };
    console.log(formData);
    reset();
    setContent('');
    setFeaturedImage(null);
  };

  return (
    <>
      <Grid container spacing={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Paper elevation={2} sx={{ padding: '1rem', marginTop: '1rem' }}>
          <form onSubmit={handleSubmit(onSubmit)} className="blog-post-form">
            {/* Title Input */}
            <Box sx={{ mb: 3 }}>
              <FormControl error={!!errors.title}>
                <FormLabel htmlFor="title">Title</FormLabel>
                <Input
                  {...register('title', { required: 'Title is required' })}
                  type="text"
                  id="title"
                  placeholder="Enter post title"
                />
                {errors.title && <FormHelperText>{errors.title.message}</FormHelperText>}
              </FormControl>
            </Box>

            {/* ReactQuill Editor */}
            <Box sx={{ mb: 3 }}>
              <FormLabel htmlFor="content">Content</FormLabel>
              <ReactQuill
                value={content}
                onChange={setContent}
                modules={{
                  toolbar: [
                    [{ header: '1' }, { header: '2' }, { font: [] }],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    ['bold', 'italic', 'underline'],
                    ['link'],
                    ['clean'],
                  ],
                }}
              />
              {!content.trim() && <FormHelperText error>Content is required</FormHelperText>}
            </Box>
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
              <FormControl sx={{ width: '100%' }} error={!!errors.categories}>
                <FormLabel htmlFor="categories">Categories</FormLabel>
                <select
                  style={{ padding: '1rem' }}
                  {...register('categories', { required: 'At least one category is required' })}
                >
                  {tagOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                {errors.categories && <FormHelperText>{errors.categories.message}</FormHelperText>}
              </FormControl>
              <FormControl sx={{ width: '100%' }}>
                <FormLabel htmlFor="tags">Tags</FormLabel>
                <select
                  style={{ padding: '1rem' }}
                  {...register('tags')}
                >
                  {categoryOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </FormControl>
            </Box>

            <Box sx={{ mb: 3 }}>
              <FormControl>
                <FormLabel htmlFor="featuredImage">Featured Image</FormLabel>
                <Input
                  type="file"
                  accept="image/*"
                  {...register('featuredImage')}
                  onChange={(e) => {
                    const file = e.target.files[0]; // Get the selected file
                    if (file) {
                      setFeaturedImage(file); // Set the featured image state
                    } else {
                      setFeaturedImage(null); // Reset if no file is selected
                    }
                  }}
                />
                {featuredImage && <FormHelperText>Selected Image: {featuredImage.name}</FormHelperText>}
              </FormControl>
            </Box>

            <Box sx={{ mb: 3 }}>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <label>
                  <input
                    type="radio"
                    value="draft"
                    {...register('status')}
                  />
                  Draft
                </label>
                <label>
                  <input
                    type="radio"
                    value="publish"
                    {...register('status')}
                  />
                  Publish
                </label>
              </FormControl>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Button variant="outlined" onClick={() => setAdvancedOptions(!advancedOptions)}>
                {advancedOptions ? 'Hide Advanced Options' : 'Show Advanced Options'}
              </Button>
              {advancedOptions && (
                <Box sx={{ mt: 2 }}>
                  <FormControl>
                    <FormLabel htmlFor="slug">Slug</FormLabel>
                    <Input {...register('slug')} id="slug" placeholder="Enter slug" />
                  </FormControl>

                  <FormControl sx={{ mt: 2 }}>
                    <FormLabel htmlFor="metaDescription">Meta Description</FormLabel>
                    <Textarea {...register('metaDescription')} id="metaDescription" placeholder="Enter meta description" />
                  </FormControl>

                  <FormControl sx={{ mt: 2 }}>
                    <FormLabel htmlFor="keywords">Keywords</FormLabel>
                    <Input {...register('keywords')} id="keywords" placeholder="Enter keywords" />
                  </FormControl>
                </Box>
              )}
            </Box>
            <Button type="submit" color="primary">Submit</Button>
          </form>
        </Paper>
      </Grid>
    </>
  );
};

export default BlogPostForm;
