import {useLoaderData, Link} from '@remix-run/react';
import {Image, Money} from '@shopify/hydrogen';
import {json, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {ShoppingCart, Search} from 'lucide-react';

export async function loader({context}: LoaderFunctionArgs) {
  const {storefront} = context;
  const {products} = await storefront.query(FEATURED_PRODUCTS_QUERY);

  return json({
    products: products.nodes,
  });
}

export default function Homepage() {
  const {products} = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="stars"></div>
      <header className="flex justify-between items-center p-4 relative z-10">
        <nav>
          <div className="flex justify-between items-center w-full ">
            <h2>
              <Link to="/" className="hover:text-gray-300">
                Shop
              </Link>
            </h2>
            <h2>
              <Link to="/contact" className="hover:text-gray-300">
                Contact
              </Link>
            </h2>
          </div>
        </nav>
        <div className="flex-grow flex justify-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
            <div className="w-12 h-12 bg-black rounded-full flex flex-col items-center justify-center">
              <div className="flex space-x-2 mb-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
              <div className="w-6 h-2 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Search className="w-6 h-6" />
          <Link to="/cart" className="flex items-center">
            <ShoppingCart className="w-6 h-6" />
            <span className="ml-2">Cart (0)</span>
          </Link>
        </div>
      </header>
      <div className="flex mt-8 relative z-10">
        <aside className="w-48 p-4">
          <nav>
            <ul className="space-y-2">
              <li>
                <Link to="/new" className="hover:text-gray-300">
                  New
                </Link>
              </li>
              <li>
                <Link to="/hoodies" className="hover:text-gray-300">
                  Hoodies
                </Link>
              </li>
              <li>
                <Link to="/tees" className="hover:text-gray-300">
                  Tees
                </Link>
              </li>
              <li>
                <Link to="/jackets" className="hover:text-gray-300">
                  Jackets
                </Link>
              </li>
              <li>
                <Link to="/pants" className="hover:text-gray-300">
                  Pants
                </Link>
              </li>
              <li>
                <Link to="/skate" className="hover:text-gray-300">
                  Skate
                </Link>
              </li>
            </ul>
          </nav>
        </aside>
        <main className="flex-grow p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product: any) => (
              <div key={product.id} className="product-card">
                <Image
                  data={product.featuredImage}
                  alt={product.title}
                  className="w-full h-auto"
                />
                <h3 className="mt-2 text-lg">{product.title}</h3>
                <div className="flex justify-between items-center mt-2">
                  <Money data={product.priceRange.minVariantPrice} />
                  {product.availableForSale ? (
                    <span className="text-green-500">In stock</span>
                  ) : (
                    <span className="text-red-500">Sold out</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

const FEATURED_PRODUCTS_QUERY = `#graphql
  query FeaturedProducts {
    products(first: 8) {
      nodes {
        id
        title
        handle
        featuredImage {
          url
          altText
          width
          height
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        availableForSale
      }
    }
  }
`;
