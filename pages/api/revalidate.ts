import { withRevalidate } from 'dato-nextjs-utils/hoc';


export default withRevalidate(async (record, revalidate) => {

  const { api_key } = record.model;
  const { slug } = record
  const paths = []

  switch (api_key) {
    case 'start':
      paths.push('/')
      break;
    case 'partner': case 'partner_category':
      paths.push('/skabholmen-group')
      break;
    case 'person':
      paths.push('/team')
      break
    case 'sponsor': case 'project':
      paths.push('/corporate-social-responsibility')
      break;
    case 'contact':
      paths.push('/')
      break;
    default:
      slug && paths.push(`/${slug}`)
      break
  }

  await revalidate(paths)
})

