const prefix = 'app_'

const envVariables = Object.keys(process.env)
    .filter((key) => key.startsWith(prefix))
    .reduce((acc, key) => {
        acc[key.substring(prefix.length)] = process.env[key]
        return acc
    }, {})

/** @type {import('next').NextConfig} */
const nextConfig = {
    swcMinify: false,
    env: {
        prefix: prefix,
        exposed: JSON.stringify(envVariables)
    },
    images: {
      remotePatterns: [
        // https://q1.qlogo.cn/g?b=qq&nk=2706992599&s=640
        {
          protocol: 'https',
          hostname: 'q1.qlogo.cn',
          pathname: '/g'
        },
        // https://avatars.githubusercontent.com/alex3236
        {
          protocol: 'https',
          hostname: 'avatars.githubusercontent.com',
          pathname: '/*'
        }
      ]
    }
}

export default nextConfig
