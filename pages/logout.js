import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { useSignOut } from '@/apollo/actions';
import BaseLayout from '@/components/layouts/BaseLayout.js';
const Logout = ({ apollo }) => {
  const [signOut] = useSignOut();
  const router = useRouter();

  useEffect(() => {
    signOut().then(() => {
      apollo.resetStore().then(() => router.push('/login'));
    });
  }, []);

  return (
    <BaseLayout>
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">Logout</h1>
            <p>Signing out...</p>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default Logout;
