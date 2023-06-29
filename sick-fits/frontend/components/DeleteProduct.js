import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

const DELET_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;

function update(cache, payload) {
  cache.evict(cache.identify(payload.data.deleteProduct));
} // payload is what gets returned from the update of the mutation

export default function DeleteProduct({ id, children }) {
  const [deleteProduct, { loading }] = useMutation(DELET_PRODUCT_MUTATION, {
    variables: { id },
    update,
  });
  return (
    <button
      type="button"
      disabled={loading}
      onClick={() => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Are you sure you want to delet this item?')) {
          // goa ahead and delete it
          deleteProduct().catch((err) => alert(err.message));
        }
      }}
    >
      {children}
    </button>
  );
}
