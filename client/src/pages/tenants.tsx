import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Plus, Settings } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const createTenantSchema = z.object({
  name: z.string().min(2, "الاسم مطلوب"),
  slug: z.string()
    .min(3, "الرابط يجب أن يكون 3 أحرف على الأقل")
    .regex(/^[a-z0-9-]+$/, "الرابط يجب أن يحتوي على حروف صغيرة وأرقام فقط"),
  description: z.string().optional(),
});

type CreateTenantInput = z.infer<typeof createTenantSchema>;

export default function TenantsPage() {
  const [, navigate] = useLocation();

  // Fetch user's tenants
  const { data: tenants = [], isLoading } = useQuery({
    queryKey: ["/api/tenants"],
    queryFn: () =>
      apiRequest("GET", "/api/tenants").then((res) => res.json()),
  });

  // Create tenant mutation
  const createMutation = useMutation({
    mutationFn: (data: CreateTenantInput) =>
      apiRequest("POST", "/api/tenants", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tenants"] });
      form.reset();
      setShowForm(false);
    },
  });

  const form = useForm<CreateTenantInput>({
    resolver: zodResolver(createTenantSchema),
    defaultValues: { name: "", slug: "", description: "" },
  });

  const [showForm, setShowForm] = React.useState(false);

  return (
    <div className="p-6 max-w-6xl mx-auto" dir="rtl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">أماكن العمل</h1>
          <p className="text-gray-600">إدارة أماكن العمل والفريق</p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          مكان عمل جديد
        </Button>
      </div>

      {/* Create Tenant Form */}
      {showForm && (
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">إنشاء مكان عمل جديد</h2>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((data) =>
                createMutation.mutate(data)
              )}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>اسم مكان العمل</FormLabel>
                    <FormControl>
                      <Input placeholder="شركتي" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الرابط المختصر</FormLabel>
                    <FormControl>
                      <div className="flex gap-2">
                        <Input
                          placeholder="mycompany"
                          {...field}
                          dir="ltr"
                          className="flex-1"
                        />
                        <span className="py-2 text-gray-600 text-sm">
                          .qirox.com
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الوصف (اختياري)</FormLabel>
                    <FormControl>
                      <textarea
                        placeholder="وصف قصير لمكان العمل"
                        {...field}
                        className="w-full px-3 py-2 border rounded-md"
                        rows={3}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-2">
                <Button
                  type="submit"
                  disabled={createMutation.isPending}
                  className="flex-1"
                >
                  {createMutation.isPending ? (
                    <>
                      <Loader2 className="animate-spin w-4 h-4 ml-2" />
                      جاري الإنشاء...
                    </>
                  ) : (
                    "إنشاء"
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                  className="flex-1"
                >
                  إلغاء
                </Button>
              </div>
            </form>
          </Form>
        </Card>
      )}

      {/* Tenants Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="animate-spin w-8 h-8" />
        </div>
      ) : tenants.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-gray-600 mb-4">لا توجد أماكن عمل حالياً</p>
          <Button onClick={() => setShowForm(true)}>إنشاء الأول</Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tenants.map((tenant: any) => (
            <Card key={tenant.id} className="p-6 hover:shadow-lg transition">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold">{tenant.name}</h3>
                  <p className="text-sm text-gray-600">{tenant.slug}.qirox.com</p>
                </div>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                  {tenant.status}
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 text-sm"
                  onClick={() =>
                    navigate(`/tenants/${tenant.slug}`)
                  }
                >
                  فتح
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    navigate(`/tenants/${tenant.slug}/settings`)
                  }
                >
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
