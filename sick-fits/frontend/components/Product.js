import Link from 'next/link';
import ItemStyles from './styles/ItemStyles';
import Title from './styles/Title';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';
import DeleteProduct from './DeleteProduct';

// eslint-disable-next-line react/prop-types
export default function Product({ product }) {
  // eslint-disable-next-line react/prop-types
  return (
    <ItemStyles>
      <img
        // eslint-disable-next-line react/prop-types
        src={product?.photo?.image?.publicUrlTransformed}
        // eslint-disable-next-line react/prop-types
        alt={product.name}
      />
      <Title>
        <Link href={`/product/${product.id}`}>{product.name}</Link>
      </Title>
      <PriceTag>{formatMoney(product.price)}</PriceTag>
      <p>{product.description}</p>
      <div className="buttonList">
        <Link
          href={{
            pathname: 'update',
            query: {
              id: product.id,
            },
          }}
        >
          Edit
        </Link>
        <DeleteProduct id={product.id}>Delete</DeleteProduct>
      </div>
    </ItemStyles>
  );
}
