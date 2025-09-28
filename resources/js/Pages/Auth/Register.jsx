import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import { AppSidebar } from "@/Components/AdminComponents/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: "faculty",
    photo: null,
  });

  const [successMessage, setSuccessMessage] = useState("");

  // Submit registration form
  const submit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("password_confirmation", data.password_confirmation);
    formData.append("role", data.role);
    formData.append("photo", data.photo);

    post(route("admin.users.store"), {
      data: formData,
      forceFormData: true,
      onSuccess: () => {
        setSuccessMessage("User successfully registered!");
        reset();
      },
      onError: (err) => console.log("Registration error:", err),
    });
  };

  return (
    <SidebarProvider>
      <Head>
        <title>Register User</title>
      </Head>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 items-center gap-2 px-4 border-b bg-white">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-6 mx-3" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin/users">User Lists</BreadcrumbLink>
                <BreadcrumbSeparator />
                <BreadcrumbLink
                  href={`/admin/register`}
                  aria-current="page"
                  className="font-semibold text-foreground"
                >
                  Register User
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <main>
          <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-white shadow-lg rounded-lg overflow-hidden">
              {/* LEFT PANEL */}
              <div className="hidden md:flex flex-col items-center justify-center bg-green-500 text-white p-8">
                <div className="flex space-x-4 mb-6">
                  <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white bg-white shadow-md">
                    <img src="logo.png" alt="Logo 1" className="w-full h-full object-contain" />
                  </div>
                  <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white bg-white shadow-md">
                    <img src="ict.png" alt="Logo 2" className="w-full h-full object-contain" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-center">
                  ICT INVENTORY SYSTEM MANAGEMENT
                </h2>
                <p className="mt-3 text-sm opacity-90 text-center">Secure • Fast • Organized</p>
              </div>

              {/* RIGHT PANEL */}
              <div className="p-8 flex flex-col justify-center">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
                  <CardDescription>Fill in your details to register</CardDescription>
                </CardHeader>

                {successMessage && (
                  <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
                    {successMessage}
                  </div>
                )}

                <form onSubmit={submit} className="space-y-4">
                  {/* Name */}
                  <div className="space-y-1">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      value={data.name}
                      onChange={(e) => setData("name", e.target.value)}
                      required
                    />
                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={data.email}
                      onChange={(e) => setData("email", e.target.value)}
                      required
                    />
                    {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                  </div>

                  {/* Password */}
                  <div className="space-y-1">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={data.password}
                      onChange={(e) => setData("password", e.target.value)}
                      required
                    />
                    {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-1">
                    <Label htmlFor="password_confirmation">Confirm Password</Label>
                    <Input
                      id="password_confirmation"
                      type="password"
                      value={data.password_confirmation}
                      onChange={(e) => setData("password_confirmation", e.target.value)}
                      required
                    />
                    {errors.password_confirmation && (
                      <p className="text-sm text-red-500">{errors.password_confirmation}</p>
                    )}
                  </div>

                  {/* Role */}
                  <div className="space-y-1">
                    <Label htmlFor="role">Select Role</Label>
                    <select
                      id="role"
                      value={data.role}
                      onChange={(e) => setData("role", e.target.value)}
                      className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      required
                    >
                      <option value="admin">Admin</option>
                      <option value="faculty">Faculty</option>
                      <option value="technician">Technician</option>
                      <option value="guest">Guest</option>
                    </select>
                    {errors.role && <p className="text-sm text-red-500">{errors.role}</p>}
                  </div>

                  {/* Photo Upload */}
                  <div className="space-y-1">
                    <Label htmlFor="photo">Profile Photo (for display)</Label>
                    <Input
                      id="photo"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setData("photo", e.target.files[0])}
                    />
                    {errors.photo && <p className="text-sm text-red-500">{errors.photo}</p>}
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    className="w-full mt-2 bg-green-500 hover:bg-green-600 text-white"
                    disabled={processing}
                  >
                    Register
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
