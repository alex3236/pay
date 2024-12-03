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
    if (new RegExp(platforms[i].match).test(ua)) {
      platform = platforms[i];
      id = i;
      break;
    }
  }

  if (platform?.redirect !== undefined) {
    NextResponse.rewrite
    return NextResponse.redirect(platform.redirect, 301)
  }

  if (id !== undefined) {
    return NextResponse.rewrite(new URL(`viewport/${id}`, req.url))
  }

  if (platforms !== undefined) {
    return NextResponse.rewrite(new URL('viewport/unknown', req.url))
  }

  return NextResponse.next();
}
