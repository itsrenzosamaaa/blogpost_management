"use client";

import {
  FormControl,
  FormLabel,
  Stack,
  Input,
  Button,
  Grid,
  CircularProgress,
  Box,
  FormHelperText,
  Typography,
} from "@mui/joy";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { Paper } from "@mui/material";
import Loading from "./component/Loading";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const { data: session, status } = useSession();
  console.log("Status:  ", status);
  console.log("Data: ", session);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/posts");
    }
  }, [status, router]);

  const onSubmit = async (data) => {
    const result = await signIn("credentials", {
      redirect: false,
      username: data.username,
      password: data.password,
    });

    if (result.ok) {
      router.push("/posts");
    } else {
      alert("Error");
    }
  };

  if (status !== "unauthenticated") {
    return <Loading />;
  }

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Grid item lg={3}>
          <Paper elevation={2} sx={{ padding: "1rem", mt: 5 }}>
            <Box textAlign="center" padding="2rem">
              <Typography level="h2">Login</Typography>
            </Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2}>
                <FormControl error={!!errors.username}>
                  <FormLabel>Username</FormLabel>
                  <Input
                    type="text"
                    {...register("username", { required: true })}
                  />
                  {errors.username && (
                    <FormHelperText>{errors.username.message}</FormHelperText>
                  )}
                </FormControl>
                <FormControl error={!!errors.password}>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    {...register("password", { required: true })}
                  />
                  {errors.password && (
                    <FormHelperText>{errors.password.message}</FormHelperText>
                  )}
                </FormControl>
                <Button type="submit" fullWidth>
                  Login
                </Button>
              </Stack>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
