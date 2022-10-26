import withRevalidate from '/lib/dato/webhook/withRevalidate'

export default withRevalidate(async (record, revalidate) => {
  
  const { api_key } = record.model;
  const { slug } = record
  const paths = []
  
  if(api_key === 'start')
    paths.push('/')
  else if(api_key === 'partner')
    paths.push('/skabholmen-group')
  else if(api_key === 'sponsor')
    paths.push('/corporate-social-responsibility')
  else if(slug)
    paths.push(`/${slug}`)
  else
    throw new Error(`No paths to revalidate for "${api_key}"`)
  
  revalidate(paths)
})

