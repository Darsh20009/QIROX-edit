import { useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import React from "react";

const inviteMemberSchema = z.object({
  email: z.string().email("صيغة بريد غير صحيحة"),
  role: z.enum(["editor", "viewer"]),
});

interface TenantMember {
  userId: string;
  role: string;
  status: string;
  joinedAt: string;
}

export default function TenantDashboard() {
  const [location] = useLocation();
  const slug = location.split("/").pop();

  // Fetch tenant data
  const { data: tenant, isLoading: tenantLoading } = useQuery({
    queryKey: ["/api/tenants", slug],
    queryFn: () =>
      apiRequest("GET", `/api/tenants/${slug}`).then((res) => res.json()),
  });

  // Fetch members
  const { data: members = [], isLoading: membersLoading } = useQuery({
    queryKey: ["/api/tenants", slug, "members"],
    queryFn: () =>
      apiRequest("GET", `/api/tenants/${slug}/members`).then((res) =>
        res.json()
      ),
  });

  // Invite member mutation
  const inviteMutation = useMutation({
    mutationFn: (data) =>
      apiRequest("POST", `/api/tenants/${slug}/members/invite`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["/api/tenants", slug, "members"],
      });
      form.reset();
    },
  });

  const form = useForm<z.infer<typeof inviteMemberSchema>>({
    resolver: zodResolver(inviteMemberSchema),
    defaultValues: { email: "", role: "editor" },
  });

  if (tenantLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6" dir="rtl">
      <div>
        <h1 className="text-3xl font-bold mb-2">{tenant?.name}</h1>
        <p className="text-gray-600">
          رابط الموقع: <code className="bg-gray-100 px-2 py-1">{slug}.qirox.com</code>
        </p>
      </div>

      {/* Members Section */}
      <Card>
        <CardHeader>
          <CardTitle>أعضاء الفريق</CardTitle>
        </CardHeader>
        <CardContent>
          {membersLoading ? (
            <Loader2 className="animate-spin w-6 h-6" />
          ) : (
            <div className="space-y-4">
              {members.map((member: TenantMember) => (
                <div
                  key={member.userId}
                  className="flex justify-between items-center p-4 border rounded"
                >
                  <div>
                    <p className="font-medium">{member.userId}</p>
                    <p className="text-sm text-gray-600">{member.role}</p>
                  </div>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                    {member.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Invite Member Form */}
      <Card>
        <CardHeader>
          <CardTitle>إضافة عضو جديد</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((data: z.infer<typeof inviteMemberSchema>) =>
                inviteMutation.mutate(data as any)
              )}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>البريد الإلكتروني</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="user@example.com"
                        {...field}
                        dir="ltr"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الدور</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="w-full px-3 py-2 border rounded-md"
                      >
                        <option value="editor">محرر</option>
                        <option value="viewer">عارض</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={inviteMutation.isPending}
                className="w-full"
              >
                {inviteMutation.isPending ? (
                  <>
                    <Loader2 className="animate-spin w-4 h-4 ml-2" />
                    جاري...
                  </>
                ) : (
                  "إضافة عضو"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
