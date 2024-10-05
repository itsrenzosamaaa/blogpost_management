'use client';

import { Box, Grid, Button, Modal, ModalClose, Typography, ModalOverflow, ModalDialog, Card, CardContent, Divider, DialogTitle, DialogContent } from '@mui/joy';
import { AppBar, Toolbar, CardHeader, CardMedia, Paper } from '@mui/material';
import { signOut, useSession } from 'next-auth/react';
import React, { useState } from 'react';
import BlogPostForm from '../component/AddPost';
import Loading from '../component/Loading';
import Image from 'next/image';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import parse from 'html-react-parser';

const initialPosts = [
    {
        title: 'Understanding React Hooks',
        excerpt: 'A deep dive into React Hooks, exploring useState and useEffect.',
        content: '<p>This is a detailed explanation about React Hooks, particularly focusing on useState and useEffect hooks...</p>',
        featuredImage: null,
        date: '2022-01-01',
        author: 'Izer Alindogan',
    }
];

const PostsPage = () => {
    const [viewDetails, setViewDetails] = useState(null);
    const [deleteModal, setDeleteModal] = useState(false);
    const [posts, setPosts] = useState(initialPosts);
    const [open, setOpen] = useState(false);
    const { data: session, status } = useSession();

    const handleAddPost = (newPost) => {
        setPosts((prevPosts) => [...prevPosts, newPost]);
    };

    if (status === 'loading') {
        return <Loading />;
    }

    const Header = () => {
        return (
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
        );
    };

    const onClose = () => {
        setOpen(false);
        setDeleteModal(false);
    };

    if (viewDetails !== null) {
        const post = posts[viewDetails];

        const handleDeletePost = () => {
            setPosts((prevPosts) => prevPosts.filter((_, index) => index !== viewDetails));
            setDeleteModal(false);
            setViewDetails(null);
            return alert('Post Deleted Successfully!');
        };

        return (
            <>
                <Header />
                <Grid container spacing={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Grid item xs={12} sm={10} md={8} lg={8}>
                        <Paper elevation={2} sx={{ padding: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Button onClick={() => setViewDetails(null)} variant="outlined" sx={{ mb: 2 }}>
                                    Back to Posts
                                </Button>
                                {post.author === session.firstName + " " + session.lastName ? (
                                    <>
                                        <Button color="danger" onClick={() => setDeleteModal(true)}>Delete Post</Button>
                                        <Modal open={deleteModal} onClose={onClose}>
                                            <ModalDialog>
                                                <ModalClose />
                                                <DialogTitle>Delete Post</DialogTitle>
                                                <DialogContent>
                                                    <Typography>Are you sure you want to delete &ldquo;{post.title}&rdquo;?</Typography>
                                                    <Divider sx={{ my: 1 }} />
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
                                                        <Button fullWidth variant="outlined" color="neutral" onClick={onClose}>
                                                            Cancel
                                                        </Button>
                                                        <Button fullWidth variant="solid" color="danger" onClick={handleDeletePost}>
                                                            Confirm Delete
                                                        </Button>
                                                    </Box>
                                                </DialogContent>
                                            </ModalDialog>
                                        </Modal>
                                    </>
                                ) : ""}
                            </Box>

                            <Box>
                                {post.featuredImage && (
                                    <Image
                                        src={typeof post.featuredImage === 'string' ? post.featuredImage : URL.createObjectURL(post.featuredImage)}
                                        alt={post.title}
                                        width={0}
                                        height={0}
                                        sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        style={{ width: '100%', height: 'auto', objectFit: 'cover', marginBottom: '1rem' }}
                                    />
                                )}
                            </Box>
                            <Box sx={{ mx: 1 }}>
                                <Typography level="h2" fontWeight="300" gutterBottom>{post.title}</Typography>
                                <Box sx={{ display: 'inline-flex', gap: 5 }}>
                                    <Typography gutterBottom>
                                        <CalendarTodayIcon fontSize='small' /> {new Date(post.date).toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </Typography>
                                    <Typography gutterBottom>
                                        <PersonIcon fontSize='small' /> {post.author}
                                    </Typography>
                                </Box>
                                <Divider sx={{ my: 2 }} />
                                <Typography>{parse(post.content)}</Typography>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </>
        );
    }

    return (
        <>
            <Header />
            <Grid container spacing={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Grid item xs={12} sm={10} md={8} lg={6}>
                    <Paper elevation={2} sx={{ padding: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 1 }}>
                            <Typography level="h4">Posts</Typography>
                            <Button onClick={() => setOpen(true)}>Add Post</Button>
                            <Modal open={open} onClose={onClose}>
                                <ModalOverflow>
                                    <ModalDialog>
                                        <ModalClose />
                                        <BlogPostForm 
                                            onAddPost={handleAddPost} 
                                            session={session} 
                                            onClose={onClose} 
                                        />
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
                                    subheader={`${post.author} - ${new Date(post.date).toLocaleDateString()}`}
                                />

                                <CardContent>
                                    <Typography variant="body2" color="text.secondary">
                                        {post.excerpt}
                                    </Typography>

                                    <Button variant="outlined" sx={{ mt: 2 }} onClick={() => setViewDetails(index)}>
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
