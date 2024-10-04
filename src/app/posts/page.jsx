'use client';

import { Box, Grid, Button, Modal, ModalClose, Typography, ModalOverflow, ModalDialog, Card, CardContent, Divider, Chip } from '@mui/joy';
import { AppBar, Toolbar, CardHeader, CardMedia, Paper } from '@mui/material';
import { signOut } from 'next-auth/react';
import React, { useState } from 'react';
import BlogPostForm from './components/AddPost';

const initialPosts = [
    {
        title: 'Understanding React Hooks',
        excerpt: 'A deep dive into React Hooks, exploring useState and useEffect.',
        content: 'SHIKANIOHSAIDHADHASDLKHSADHSALDHSALDUHSADJSAD',
        category: 'Technology',
        tags: ['React'],
        featuredImage: null, 
        status: 'publish',
        date: '2022-01-01',
    }
];

const PostsPage = () => {
    const [posts, setPosts] = useState(initialPosts); 
    const [open, setOpen] = useState(false);

    const handleAddPost = (newPost) => {
        setPosts((prevPosts) => [...prevPosts, newPost]); 
    };

    return (
        <>
            <AppBar position="static" sx={{ mb: 2 }}>
                <Toolbar>
                    <Typography level="h4" sx={{ flexGrow: 1, color: 'inherit' }}>
                        Blog Post Management
                    </Typography>
                    <Button variant="outlined" color="neutral" onClick={() => signOut({ callbackUrl: '/' })} sx={{ color: 'inherit' }}>
                        Sign Out
                    </Button>
                </Toolbar>
            </AppBar>

            <Grid container spacing={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Grid item xs={12} sm={10} md={8} lg={6}>
                    <Paper elevation={2} sx={{ padding: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 1 }}>
                            <Typography level="h4">Posts</Typography>
                            <Button onClick={() => setOpen(true)}>Add Post</Button>
                            <Modal open={open} onClose={() => setOpen(false)}>
                                <ModalOverflow>
                                    <ModalDialog>
                                        <ModalClose />
                                        <BlogPostForm onAddPost={handleAddPost} />
                                    </ModalDialog>
                                </ModalOverflow>
                            </Modal>
                        </Box>
                        <Divider sx={{ my: 2 }} />
                        {posts.map((post, index) => (
                            <Card key={index} sx={{ width: { lg: "95.5%", xs: "92.5%" }, marginBottom: '1rem' }}>
                                {post.featuredImage && (
                                    <CardMedia
                                        component="img"
                                        src={typeof post.featuredImage === 'string' ? post.featuredImage : URL.createObjectURL(post.featuredImage)}
                                        alt={post.title}
                                        sx={{ height: 140, objectFit: 'cover' }}
                                    />
                                )}

                                <CardHeader
                                    title={post.title}
                                    subheader={`${new Date(post.date).toLocaleDateString()}`}
                                />

                                <CardContent>
                                    <Typography variant="body2" color="text.secondary">
                                        {post.excerpt}
                                    </Typography>

                                    <Typography variant="body2" color="text.primary" sx={{ my: 1 }}>
                                        Category: {post.category} 
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        {
                                            Array.isArray(post.tags) && post.tags.length > 0 ? post.tags.map((tag, index) => (
                                                <Chip key={index} variant="soft" color="primary" sx={{ mr: 1 }}>
                                                    {tag}
                                                </Chip>
                                            )) : 'No tags'
                                        }
                                    </Box>

                                    <Button variant="outlined" sx={{ mt: 2 }} onClick={() => console.log(`Read more about ${post.title}`)}>
                                        Read More
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
};

export default PostsPage;
