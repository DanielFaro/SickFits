import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Product from './Product';
import { perPage } from '../config';
// graphql-tag parses GraphQL query strings into the standard GraphQL AST
// Abstract Syntax Tree, which is a heavily nested object

export const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY($skip: Int = 0, $first: Int) {
    allProducts(first: $first, skip: $skip) {
      id
      name
      price
      description
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const ProductsListStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

export default function Products({ page }) {
  const skip = page * perPage - perPage;

  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY, {
    variables: {
      skip,
      first: perPage,
    },
  });
  console.log('##inside Products comp ==', data, error, loading);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      <div>
        <ProductsListStyles>
          {data.allProducts.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </ProductsListStyles>
      </div>
    </div>
  );
}
