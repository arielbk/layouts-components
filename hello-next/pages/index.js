import Layout from '../components/MyLayout.js';
import Link from 'next/link';

const PostLink = (props) => (
  <li>
    <Link as={`/p/${props.id}`} href={`/post?title=${props.title}`}>
      <a>{props.title}</a>
    </Link>
  </li>
)

export default () => (
  <Layout>
    <h1>My Blog</h1>
    <ul>
      <PostLink id="hello-nextjs" title="Hello Next.js" />
      <PostLink id="im-learning" title="I'm learning" />
      <PostLink id="brain-is-growing" title="My brain is actually growing" />
    </ul>
  </Layout>
)