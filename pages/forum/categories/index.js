import BaseLayout from '@/components/layouts/BaseLayout.js';
import { useGetForumCategories } from '@/apollo/actions';
import client from '@/apollo/apollo-client.js';

import Link from 'next/link';
import { FORUM_CATEGORIES } from '@/apollo/queries/forum.js';

export async function getStaticProps() {
  const { data } = await client.query({
    query: FORUM_CATEGORIES,
  });
  // console.log('Dilip data:', data);
  const forumCategories = data.forumCategories;
  return { props: { forumCategories } };
}

const ForumCategories = ({ forumCategories }) => {
  // const { data } = useGetForumCategories();
  // const forumCategories = (data && data.forumCategories) || [];

  return (
    <BaseLayout>
      <section className="section-title">
        <div className="px-2">
          <div className="pt-5 pb-4">
            <h1>Categories</h1>
          </div>
        </div>
      </section>
      <section className="fj-category-list">
        <div className="row">
          {forumCategories.map((fc) => (
            <div key={fc.slug} className="col-md-4">
              <div className="fj-category-container">
                <Link
                  href="/forum/categories/[slug]"
                  as={`/forum/categories/${fc.slug}`}
                >
                  <a className="fj-category subtle-shadow no-border">
                    <div className="category-information">
                      <div className="heading gray-90">{fc.title}</div>
                      <div className="description">{fc.subTitle}</div>
                    </div>
                  </a>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </BaseLayout>
  );
};

export default ForumCategories;
