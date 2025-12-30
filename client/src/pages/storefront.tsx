import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, ShoppingCart, Tag } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function Storefront() {
  const { slug } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: [`/api/tenants/store/${slug}`],
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
        <h1 className="text-2xl font-bold mb-2">عذراً، المتجر غير موجود</h1>
        <p className="text-muted-foreground mb-4">ربما تم تغيير الرابط أو أن المتجر غير متاح حالياً.</p>
        <Button onClick={() => window.location.href = "/"}>العودة للرئيسية</Button>
      </div>
    );
  }

  const { store, products, categories } = data as any;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">{store.name}</h1>
          {store.description && (
            <p className="text-muted-foreground max-w-2xl mx-auto">{store.description}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Tag className="h-5 w-5" />
                  التصنيفات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="cursor-pointer hover-elevate">الكل</Badge>
                  {categories.map((cat: any) => (
                    <Badge key={cat._id} variant="outline" className="cursor-pointer hover-elevate">
                      {cat.name}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="md:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product: any) => (
                <Card key={product._id} className="overflow-hidden hover-elevate transition-all">
                  <div className="aspect-square bg-muted relative">
                    {product.images?.[0] ? (
                      <img 
                        src={product.images[0]} 
                        alt={product.name}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-muted-foreground">
                        لا توجد صورة
                      </div>
                    )}
                    {product.comparePrice && (
                      <Badge className="absolute top-2 right-2 bg-destructive">خصم</Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex flex-col">
                        <span className="text-primary font-bold text-xl">
                          {product.price} ر.س
                        </span>
                        {product.comparePrice && (
                          <span className="text-muted-foreground line-through text-sm">
                            {product.comparePrice} ر.س
                          </span>
                        )}
                      </div>
                    </div>
                    <Button className="w-full flex items-center gap-2 active-elevate-2">
                      <ShoppingCart className="h-4 w-4" />
                      إضافة للسلة
                    </Button>
                  </CardContent>
                </Card>
              ))}
              {products.length === 0 && (
                <div className="col-span-full text-center py-12 text-muted-foreground">
                  لا توجد منتجات معروضة حالياً في هذا المتجر.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}