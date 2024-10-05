'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input, Textarea, Button, FormControl, FormLabel, FormHelperText, Box, Snackbar } from '@mui/joy';
import 'react-quill/dist/quill.snow.css';
import '../globals.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const BlogPostForm = ({ onAddPost, session, onClose }) => {
    const { register, setValue, handleSubmit, reset, formState: { errors }, watch } = useForm();
    const [content, setContent] = useState('');
    const [featuredImage, setFeaturedImage] = useState(null);

    const onSubmit = (data) => {
        if (!content || content.trim() === '') {
            alert('Content is required.');
            return null;
        }

        const formData = {
            ...data,
            content,
            featuredImage,
            author: `${session.firstName} ${session.lastName}`,
            date: new Date().toISOString().split('T')[0],
        };
        console.log(formData);

        onAddPost(formData);

        reset();
        setContent('');
        setFeaturedImage(null);
        onClose();
        alert('Post Published Successfully!')
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
                                [{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6, false] }, { font: ['serif', 'sans-serif', 'monospace', 'Roboto', 'Times New Roman', 'Courier New', 'Georgia', 'Verdana'] }],
                                [{ list: 'ordered' }, { list: 'bullet' }],
                                ['bold', 'italic', 'underline', 'strike'],
                                ['link'],
                                ['clean'],
                            ],
                        }}
                    />
                    {!content.trim() && <FormHelperText error>Content is required</FormHelperText>}
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
                                    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
                                    if (validImageTypes.includes(file.type)) {
                                        setFeaturedImage(file);
                                    } else {
                                        alert('Please upload a valid image file (JPEG, PNG, GIF)');
                                        setFeaturedImage(null);
                                    }
                                } else {
                                    setFeaturedImage(null);
                                }
                            }}
                        />
                        {featuredImage && <FormHelperText>Selected image: {featuredImage.name}</FormHelperText>}
                    </FormControl>
                </Box>

                <Box sx={{ textAlign: 'center' }}>
                    <Button fullWidth type="submit">Publish Post</Button>
                </Box>
            </form>
        </>
    );
};

export default BlogPostForm;
