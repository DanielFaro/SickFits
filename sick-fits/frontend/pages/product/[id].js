import SingleProduct from '../../components/SingleProduct';

export default function SingleProductPage({ query }) {
  // somehow the query in props comes from the browser I think
  return <SingleProduct id={query.id} />;
}
