import PortfolioCard from '../../components/portfolios/PortfolioCard';
import Link from 'next/link';
import { useGetPortfolios } from '@/apollo/actions';
import BaseLayout from '@/components/layouts/BaseLayout';
import client from '@/apollo/apollo-client.js';

import {
  GET_PORTFOLIOS,
  GET_PORTFOLIO,
  GET_USER_PORTFOLIOS,
  CREATE_PORTFOLIO,
  UPDATE_PORTFOLIO,
  DELETE_PORTFOLIO,
} from '@/apollo/queries/portfolios.js';

export async function getStaticProps() {
  const { data } = await client.query({
    query: GET_PORTFOLIOS,
  });
  console.log('Dilip data:', data);
  const portfolios = data.portfolios;
  return { props: { portfolios } };
}

const Portfolios = ({ portfolios }) => {
  // const { data } = useGetPortfolios();
  // const portfolios = (data && data.portfolios) || [];

  return (
    <BaseLayout>
      <section className="section-title">
        <div className="px-2">
          <div className="pt-5 pb-4">
            <h1>Portfolios</h1>
          </div>
        </div>
      </section>
      <section className="pb-5">
        <div className="row">
          {portfolios.map((portfolio) => (
            <div key={portfolio._id} className="col-md-4">
              <Link href="/portfolios/[id]" as={`/portfolios/${portfolio._id}`}>
                <a className="card-link mb-2">
                  <PortfolioCard portfolio={portfolio} />
                </a>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </BaseLayout>
  );
};

export default Portfolios;
