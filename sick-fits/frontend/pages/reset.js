import RequestReset from '../components/RequestReset';
import Reset from '../components/Reset';

export default function ResetPage({ query }) {
  // query comes from url which we added when request reset was completed
  console.log('## props in Reset Page', props);
  if (!query.token) {
    return (
      <div>
        <p>Sorry you must supply a token</p>
        <RequestReset />
      </div>
    );
  }
  return (
    <div>
      <p>Reset Your Password {query.token}</p>
      <Reset token={query.token} />
    </div>
  );
}
