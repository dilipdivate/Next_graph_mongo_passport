import withAuth from '@/hoc/withAuth';
import BaseLayout from '@/components/layouts/BaseLayout.js';
const Secret = withAuth(() => {
  return (
    <BaseLayout>
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">SECRET</h1>
            SECRET PAGE, ONLY AUTHENTICATED USERS ALLOWED!
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}, ['instructor', 'admin']);

export default Secret;
