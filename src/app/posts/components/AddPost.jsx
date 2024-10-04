'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input, Textarea, Button, FormControl, FormLabel, FormHelperText, Box, Select, Option } from '@mui/joy';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const BlogPostForm = ({ onAddPost }) => {
    const { register, setValue, handleSubmit, reset, formState: { errors }, watch } = useForm();
    const [content, setContent] = useState('');
    const [advancedOptions, setAdvancedOptions] = useState(false);
    const [featuredImage, setFeaturedImage] = useState(null);
    const [selectedTags, setSelectedTags] = useState([]);

    const categoryOptions = [
        { value: 'Technology', label: 'Technology' },
        { value: 'Lifestyle', label: 'Lifestyle' },
        { value: 'Travel', label: 'Travel' },
        { value: 'Food', label: 'Food' },
        { value: 'Business', label: 'Business' },
        { value: 'Education', label: 'Education' },
        { value: 'DIY', label: 'DIY' },
        { value: 'Fashion', label: 'Fashion' },
        { value: 'Parenting', label: 'Parenting' },
    ];

    const tagOptions = {
        Technology: [
            { value: 'React', label: 'React' },
            { value: 'Javascript', label: 'JavaScript' },
            { value: 'Cloud', label: 'Cloud' },
            { value: 'Python', label: 'Python' },
            { value: 'Web Development', label: 'Web Development' },
            { value: 'AI', label: 'AI' },
            { value: 'DevOps', label: 'DevOps' }
        ],
        Lifestyle: [
            { value: 'Self-Care', label: 'Self-Care' },
            { value: 'Minimalism', label: 'Minimalism' },
            { value: 'Meditation', label: 'Meditation' },
            { value: 'Time Management', label: 'Time Management' },
            { value: 'Vegan', label: 'Vegan' },
            { value: 'Skincare', label: 'Skincare' }
        ],
        Travel: [
            { value: 'Backpacking', label: 'Backpacking' },
            { value: 'Europe', label: 'Europe' },
            { value: 'Travel Gear', label: 'Travel Gear' },
            { value: 'Beaches', label: 'Beaches' },
            { value: 'Road Trips', label: 'Road Trips' },
            { value: 'Adventure', label: 'Adventure' }
        ],
        Food: [
            { value: 'Vegan', label: 'Vegan' },
            { value: 'Gluten-free', label: 'Gluten-Free' },
            { value: 'Quick Meals', label: 'Quick Meals' },
            { value: 'Baking', label: 'Baking' },
            { value: 'Paleo', label: 'Paleo' },
            { value: 'Smoothies', label: 'Smoothies' }
        ],
        Business: [
            { value: 'SEO', label: 'SEO' },
            { value: 'Digital Marketing', label: 'Digital Marketing' },
            { value: 'Startups', label: 'Startups' },
            { value: 'Side Hustle', label: 'Side Hustle' },
            { value: 'Budgeting', label: 'Budgeting' }
        ],
        Education: [
            { value: 'E-Learning', label: 'E-Learning' },
            { value: 'Study Hacks', label: 'Study Hacks' },
            { value: 'Coding', label: 'Coding' },
            { value: 'Online Degrees', label: 'Online Degrees' },
            { value: 'Learning Apps', label: 'Learning Apps' }
        ],
        DIY: [
            { value: 'Home Improvement', label: 'Home Improvement' },
            { value: 'Knitting', label: 'Knitting' },
            { value: 'Sustainable Living', label: 'Sustainable Living' },
            { value: 'Crafts', label: 'Crafts' }
        ],
        Fashion: [
            { value: 'Summer Outfits', label: 'Summer Outfits' },
            { value: 'Street Style', label: 'Street Style' },
            { value: 'Eco-Fashion', label: 'Eco-Fashion' },
            { value: 'Accessories', label: 'Accessories' }
        ],
        Parenting: [
            { value: 'Toddler Care', label: 'Toddler Care' },
            { value: 'Homeschooling', label: 'Homeschooling' },
            { value: 'Baby Products', label: 'Baby Products' },
            { value: 'Work-Life Balance', label: 'Work-Life Balance' }
        ]
    };

    const selectedCategory = watch('category');

    const onSubmit = (data) => {
        if (!content || content.trim() === '') {
            return alert('Content is required');
        }

        const formData = {
            ...data,
            content,
            featuredImage,
            tags: selectedTags,
            date: new Date().toISOString().split('T')[0],
        };
        console.log(formData);

        onAddPost(formData);

        reset();
        setContent('');
        setFeaturedImage(null);
        setSelectedTags([]);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="blog-post-form">
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

                <Box sx={{ mb: 3 }}>
                    <FormControl error={!!errors.excerpt}>
                        <FormLabel htmlFor="excerpt">Excerpt</FormLabel>
                        <Input
                            {...register('excerpt', { required: 'Excerpt is required' })}
                            type="text"
                            id="excerpt"
                            placeholder="Enter post excerpt"
                        />
                        {errors.excerpt && <FormHelperText>{errors.excerpt.message}</FormHelperText>}
                    </FormControl>
                </Box>

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
                    <FormControl sx={{ width: '100%' }}>
                        <FormLabel htmlFor="category">Categories</FormLabel>
                        <select
                            placeholder="Select category"
                            style={{ padding: '1rem' }}
                            {...register('category', { required: 'At least one category is required' })}
                        >
                            {categoryOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </FormControl>
                </Box>

                <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                    <FormControl sx={{ width: '100%' }}>
                        <FormLabel htmlFor="tags">Tags</FormLabel>
                        <Select
                            multiple
                            placeholder="Select tags"
                            value={selectedTags} 
                            onChange={(event, newValue) => {
                                setSelectedTags(newValue);
                                setValue('tags', newValue); 
                            }}
                        >
                            {tagOptions[selectedCategory]?.map((tag) => (
                                <Option key={tag.value} value={tag.value}>
                                    {tag.label}
                                </Option>
                            ))}
                        </Select>
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
                                const file = e.target.files[0]; 
                                if (file) {
                                    setFeaturedImage(file); 
                                } else {
                                    setFeaturedImage(null); 
                                }
                            }}
                        />
                        {featuredImage && <FormHelperText>Selected image: {featuredImage.name}</FormHelperText>}
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

                <Box sx={{ textAlign: 'center' }}>
                    <Button fullWidth type="submit">Publish Post</Button>
                </Box>
            </form>
        </>
    );
};

export default BlogPostForm;
