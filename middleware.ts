import { NextRequest, NextResponse, userAgent } from 'next/server'
import { getEnv } from './app/components/utils'

const platforms = getEnv('platforms', undefined);


export const config = {
  matcher: '/',
}

export default function middleware(req: NextRequest) {
  const { ua } = userAgent(req)
  var platform;
  var id;

  for (const i in platforms) {
    if (ua.includes(platforms[i].match)) {
      platform = platforms[i];
      id = i;
      break;
    }
  }

  if (platform?.redirect !== undefined) {
    return NextResponse.redirect(platform.redirect)
  }

  if (id !== undefined) {
    return NextResponse.rewrite(new URL(`viewport/${id}`, req.url))
  }

  if (platforms !== undefined) {
    return NextResponse.rewrite(new URL('viewport/unknown', req.url))
  }

  return NextResponse.next();
}
