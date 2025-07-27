# DDD Quick Start Guide

This guide provides a quick reference for implementing new features using our Domain-Driven Design architecture.

## Architecture Overview

Our application follows a layered architecture:

```
src/
├── domain/           # Domain layer - business logic, entities, core rules
├── infrastructure/   # Infrastructure layer - technical concerns, external services
├── application/      # Application layer - orchestrates domain and infrastructure
└── presentation/     # Presentation layer - UI components and pages
```

## Implementing a New Feature

Follow these steps to implement a new feature end-to-end:

### 1. Define Domain Entities

Start by defining domain entities and value objects in `src/domain/entities/`:

```typescript
// src/domain/entities/product.ts
export class Product {
  readonly id: string;
  readonly name: string;
  readonly price: number;

  constructor(props: { id: string; name: string; price: number }) {
    // Validation can go here
    if (props.price < 0) throw new Error("Price cannot be negative");

    this.id = props.id;
    this.name = props.name;
    this.price = props.price;
  }

  // Methods that contain business logic
  applyDiscount(percentage: number): Product {
    const discountedPrice = this.price * (1 - percentage / 100);
    return new Product({ ...this, price: discountedPrice });
  }

  // Factory method
  static fromDatabase(data: any): Product {
    return new Product({
      id: data.id,
      name: data.name,
      price: data.price,
    });
  }
}
```

### 2. Create Domain Services (If Needed)

If you need logic that doesn't fit in an entity:

```typescript
// src/domain/services/pricing-service.ts
import { Product } from "../entities/product";

export class PricingService {
  calculateTax(product: Product, taxRate: number): number {
    return product.price * (taxRate / 100);
  }

  calculateShipping(products: Product[], destination: string): number {
    // Complex shipping calculation
    return products.reduce((total, product) => total + product.price * 0.1, 10);
  }
}
```

### 3. Implement Repository

Create a repository in the infrastructure layer:

```typescript
// src/infrastructure/repositories/product-repository.ts
import { BaseRepository } from "./base-repository";
import { Product } from "@/domain/entities/product";

export class ProductRepository extends BaseRepository<Product> {
  constructor() {
    super("products");
  }

  // Custom data access methods
  async getByCategory(categoryId: string): Promise<Product[]> {
    const client = await this.getClient();
    const { data, error } = await client
      .from(this.tableName)
      .select("*")
      .eq("category_id", categoryId);

    if (error) throw error;

    // Map database results to domain entities
    return data.map((item) => Product.fromDatabase(item));
  }
}
```

Register your repository with the factory:

```typescript
// src/infrastructure/repositories/index.ts
import { ProductRepository } from "./product-repository";

const productRepository = new ProductRepository();

repositoryRegistry["product"] = productRepository;

export { productRepository, ProductRepository };
```

### 4. Create Application Service

Connect domain and infrastructure in the application layer:

```typescript
// src/application/product-application-service.ts
import { Product } from "@/domain/entities/product";
import { PricingService } from "@/domain/services/pricing-service";
import { productRepository } from "@/infrastructure/repositories";

export class ProductApplicationService {
  private repository = productRepository;
  private pricingService = new PricingService();

  async getProductById(id: string): Promise<Product | null> {
    const data = await this.repository.getById(id);
    return data ? Product.fromDatabase(data) : null;
  }

  async getProductsWithTax(
    categoryId: string,
    taxRate: number
  ): Promise<
    Array<{
      product: Product;
      taxAmount: number;
    }>
  > {
    const products = await this.repository.getByCategory(categoryId);

    return products.map((product) => ({
      product,
      taxAmount: this.pricingService.calculateTax(product, taxRate),
    }));
  }
}
```

### 5. Implement API Routes

Create API routes using Hono:

```typescript
// src/infrastructure/api/routes/product-routes.ts
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { ProductApplicationService } from "@/application/product-application-service";
import { getValidatedData } from "../validators";

const productAppService = new ProductApplicationService();
const productRouter = new Hono();

// Get product by ID
productRouter.get("/:id", async (c) => {
  const id = c.req.param("id");

  try {
    const product = await productAppService.getProductById(id);

    if (!product) {
      return c.json({ success: false, error: "Product not found" }, 404);
    }

    return c.json({ success: true, data: product });
  } catch (error) {
    return c.json(
      {
        success: false,
        error: "Failed to retrieve product",
      },
      500
    );
  }
});

export default productRouter;
```

Register your routes:

```typescript
// src/infrastructure/api/index.ts
import productRouter from "./routes/product-routes";

// Mount routers
api.route("/products", productRouter);
```

### 6. Create UI Components (Presentation Layer)

Implement UI components following Atomic Design:

```typescript
// src/presentation/components/ui/molecules/product-card/index.tsx
import React from "react";
import { Card, CardContent } from "@/presentation/components/ui/atoms/card";
import { Button } from "@/presentation/components/ui/atoms/button";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  onAddToCart: (id: string) => void;
}

export function ProductCard({
  id,
  name,
  price,
  onAddToCart,
}: ProductCardProps) {
  return (
    <Card>
      <CardContent>
        <h3>{name}</h3>
        <p>${price.toFixed(2)}</p>
        <Button onClick={() => onAddToCart(id)}>Add to Cart</Button>
      </CardContent>
    </Card>
  );
}
```

### 7. Create Page Component

Use the components and application services in your page:

```typescript
// src/app/products/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { ProductApplicationService } from "@/application/product-application-service";
import { ProductDetails } from "@/presentation/components/ui/organisms/product-details";

const productService = new ProductApplicationService();

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await productService.getProductById(params.id);
        setProduct(data);
      } catch (error) {
        console.error("Failed to load product:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [params.id]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return <ProductDetails product={product} />;
}
```

## Best Practices

1. **Keep the Domain Layer Pure** - Domain layer should have no dependencies on infrastructure or frameworks
2. **Use Value Objects** - Create value objects for complex properties (e.g., Address, Money)
3. **Follow Single Responsibility** - Each class should have one reason to change
4. **Use Factory Methods** - Create static factory methods on entities to instantiate them from various sources
5. **Domain Services for Multi-Entity Logic** - Use domain services when logic spans multiple entities
6. **Immutable Entities** - Make domain entities immutable for consistency
7. **Use TypeScript** - Leverage TypeScript for type safety across all layers

## Folder Structure Example

```
src/
├── domain/
│   ├── entities/
│   │   ├── product.ts
│   │   └── user.ts
│   └── services/
│       └── pricing-service.ts
├── infrastructure/
│   ├── api/
│   │   ├── routes/
│   │   │   ├── product-routes.ts
│   │   │   └── user-routes.ts
│   │   └── validators/
│   │       └── index.ts
│   ├── repositories/
│   │   ├── product-repository.ts
│   │   └── user-repository.ts
│   └── supabase/
│       └── client.ts
├── application/
│   ├── product-application-service.ts
│   └── user-application-service.ts
└── presentation/
    ├── components/
    │   └── ui/
    │       ├── atoms/
    │       ├── molecules/
    │       └── organisms/
    └── templates/
```
