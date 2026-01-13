import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AdminSidebar } from "@/components/admin-sidebar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Plus, Edit, Trash2, Eye } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequestJson, queryClient } from "@/lib/queryClient";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Store {
  id: string;
  name: string;
  slug: string;
  siteMode: string;
  externalDomain?: string;
  plan: string;
}

export default function AdminStores() {
  const { toast } = useToast();
  const [newStoreName, setNewStoreName] = useState("");
  const [newStoreSlug, setNewStoreSlug] = useState("");

  const { data: stores = [], isLoading } = useQuery<Store[]>({
    queryKey: ["/api/sites"],
  });

  const createMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/sites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newStoreName,
          slug: newStoreSlug,
          siteMode: "managed",
          plan: "basic"
        }),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/sites"] });
      setNewStoreName("");
      setNewStoreSlug("");
      toast({ description: "تم إضافة الموقع بنجاح" });
    },
  });

  const updateModeMutation = useMutation({
    mutationFn: async ({ id, mode }: { id: string, mode: string }) => {
      const res = await fetch(`/api/sites/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ siteMode: mode }),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/sites"] });
      toast({ description: "تم تحديث نمط التشغيل" });
    }
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filterMode, setFilterMode] = useState("all");

  const filteredStores = stores.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         s.slug.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterMode === "all" || s.siteMode === filterMode;
    return matchesSearch && matchesFilter;
  });

  const activeCount = filteredStores.length;

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1 overflow-auto p-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">إدارة المتاجر</h1>
              <p className="text-muted-foreground">إدارة متاجر النظام</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">إجمالي المتاجر</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold" data-testid="stat-total-stores">{stores.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">متاجر نشطة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600" data-testid="stat-active-stores">{activeCount}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">معطلة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600" data-testid="stat-inactive-stores">
                  {stores.length - activeCount}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">إجمالي المبيعات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold" data-testid="stat-total-sales">N/A</div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-lg">إضافة موقع جديد</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  placeholder="اسم الموقع"
                  value={newStoreName}
                  onChange={(e) => setNewStoreName(e.target.value)}
                  data-testid="input-store-name"
                />
                <Input
                  placeholder="الرابط (Slug)"
                  value={newStoreSlug}
                  onChange={(e) => setNewStoreSlug(e.target.value)}
                  data-testid="input-store-slug"
                />
                <Button
                  onClick={() => createMutation.mutate()}
                  disabled={createMutation.isPending || !newStoreName}
                  data-testid="button-add-store"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  إضافة
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute right-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="ابحث عن موقع بالاسم أو الرابط..." 
                    className="pr-10 rounded-xl border-primary/10 bg-muted/30 focus:bg-background focus:ring-primary/20 transition-all shadow-inner" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    data-testid="input-search-stores" 
                  />
                </div>
                <select 
                  className="bg-background border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  value={filterMode}
                  onChange={(e) => setFilterMode(e.target.value)}
                >
                  <option value="all">جميع الأنماط</option>
                  <option value="managed">Managed</option>
                  <option value="external">External</option>
                  <option value="headless">Headless</option>
                </select>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <p className="text-center text-muted-foreground">جاري التحميل...</p>
              ) : filteredStores.length === 0 ? (
                <p className="text-center text-muted-foreground">لا توجد مواقع تطابق البحث</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-right p-3 font-medium">اسم الموقع</th>
                        <th className="text-right p-3 font-medium">الرابط</th>
                        <th className="text-right p-3 font-medium">النمط (Mode)</th>
                        <th className="text-right p-3 font-medium">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStores.map((store) => (
                        <tr key={store.id} className="border-b hover:bg-muted/50 transition-colors">
                          <td className="p-3 font-medium">{store.name}</td>
                          <td className="p-3">{store.slug}</td>
                          <td className="p-3">
                            <Badge variant={store.siteMode === "managed" ? "default" : store.siteMode === "external" ? "secondary" : "outline"}>
                              {store.siteMode}
                            </Badge>
                          </td>
                          <td className="p-3">
                            <select 
                              className="bg-background border rounded p-1 text-xs"
                              value={store.siteMode}
                              onChange={(e) => updateModeMutation.mutate({ id: store.id, mode: e.target.value })}
                            >
                              <option value="managed">Managed</option>
                              <option value="external">External</option>
                              <option value="headless">Headless</option>
                            </select>
                          </td>
                          <td className="p-3 flex gap-2">
                            <Button size="icon" variant="ghost">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="icon" variant="ghost">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="icon" variant="ghost">
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
